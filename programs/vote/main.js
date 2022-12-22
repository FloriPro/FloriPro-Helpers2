class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Vote",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setInnerSize(410, 410);
                this.window.size.userCanResize(true);

                //set random id for container
                this.anychartContainerId = System.makeid(10);
                (await this.window.getHtmlElement("container")).id = this.anychartContainerId;

                //load chart.js if not allready loaded
                if (window.chartAllreadyInitialized == undefined) {
                    await System.run("c/programs/vote/chart.js");
                    eval(await SystemFileSystem.getFileString("c/programs/vote/wordcloud.js")); //DEPRECATED

                    //load anychart js
                    eval((await System.network.fetch("https://cdn.anychart.com/releases/8.11.0/js/anychart-base.min.js").then((res) => res.text())).replaceAll("contextmenu", "context_menu")) // load it and remove the contextmenu eventlisteners
                    eval(await System.network.fetch("https://cdn.anychart.com/releases/8.11.0/js/anychart-tag-cloud.min.js").then((res) => res.text()));
                    //load anychart css
                    var css = document.createElement("style");
                    css.innerHTML = await System.network.fetch("https://cdn.anychart.com/releases/8.11.0/css/anychart-ui.min.css").then((res) => res.text());
                    document.head.appendChild(css);
                    anychart.onDocumentReady(this.anyReady.bind(this));
                    
                    window.chartAllreadyInitialized = true;
                }

                //relaod chart rightclick button
                (await this.window.getHtmlElement("out")).contextscript = (att) => {
                    return {
                        "reload": () => {
                            this.reload();
                        },
                        "back": async () => {
                            (await this.window.getHtmlElement("myChart")).style.display = "none";
                            (await this.window.getHtmlElement("container")).style.display = "none";
                            (await this.window.getHtmlElement("out")).style.display = "none";
                            (await this.window.getHtmlElement("loader")).style.display = "";
                        }
                    }
                };

                //add event listener to createButton
                this.window.addHtmlEventListener("click", "createButton", async () => {
                    //new window create
                    new create(this.PATH);
                }, this);

                this.window.addHtmlEventListener("click", "createCloudButton", async () => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "https://vote.flulu.eu/api/createCloud", true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({
                        "title": await SystemHtml.WindowHandler.presets.createStringSelect("Title", "enter the title of the wordcloud"),
                        "description": await SystemHtml.WindowHandler.presets.createStringSelect("Description", "enter the description of the wordcloud"),
                    }));
                    xhr.thi = this;
                    xhr.onload = function () {
                        var data = this.responseText;
                        SystemHtml.WindowHandler.presets.createInformation("WordCloud link", "https://vote.flulu.eu/" + data);
                    }

                    xhr.onabort = function () {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "something went wrong");
                    }
                    xhr.onerror = function () {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "something went wrong");
                    }
                }, this);

                //add event listener to load
                this.window.addHtmlEventListener("click", "load", async () => {
                    //parse the input
                    var id;
                    var url = (await this.window.getHtmlElement("url")).value;
                    if (url.split("/").length == 1) {
                        id = url;
                    }
                    else if (url.split("/")[3] == "") {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "the url you entered is not valid");
                        return;
                    } else {
                        id = url.split("/")[3];
                    }

                    this.network.setPoll(id);

                    //get data from api
                    this.passw = undefined;
                    this.voteId = undefined;
                    var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + id + "#" + System.makeid(100))).text();
                    if (data == "passw") {
                        var passw = await SystemHtml.WindowHandler.presets.createStringSelect("Password", "to access this data you need to enter a password");
                        var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + id + "/" + passw + "#" + System.makeid(100))).text();
                        if (data == "passw wrong") {
                            SystemHtml.WindowHandler.presets.createInformation("Password wrong", "the password you entered is wrong");
                            return;
                        }
                        this.passw = passw;
                    }
                    this.voteId = id;

                    data = JSON.parse(data);
                    this.loadData(data);
                }, this);
            });
        this.window.close = () => {
            this.stop()
            return true
        }

        //use network.js file for wsconnection
        /**
         * @type {n}
         */
        this.network = new (await System.run(this.PATH.folder() + "/network.js"))();
        this.network.onupdate = this.update.bind(this);
    }

    anyReady() {
        console.warn("ready")
        this.anychart = anychart.tagCloud();
        //this.anychart.title("Loading...");
        this.anychart.angles([0])
        this.anychart.textSpacing(3);
        this.anychart.mode("spiral");
        this.anychart.container(this.anychartContainerId);
        //this.anychart.textSpacing(0);
        //this.anychart.mode("spiral");
        //this.anychart.angles([0]);
    }

    //reload the chart
    async reload() {
        //get data from api
        if (this.passw == undefined) {
            var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + this.voteId + "#" + System.makeid(100))).text();
            if (data == "passw") {
                await SystemHtml.WindowHandler.presets.createInformation("Password needed", "to access this data you need to enter a password");
            }
        } else {
            var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + this.voteId + "/" + this.passw + "#" + System.makeid(100))).text();
        }
        data = JSON.parse(data);
        this.loadData(data);
    }
    async loadData(data) {
        var showType = data.type;//wordcloud/chart
        this.currentType = showType;
        if (showType == "wordcloud") {
            var taglist = data.taglist;

            var taglist2 = [];
            for (var i in taglist) {
                taglist2.push({ x: i, value: taglist[i] });
            }
            this.anychart.data(taglist2);

            //update title
            this.anychart.title(data.title + " | " + data.description);

            //show anychart container
            (await this.window.getHtmlElement("container")).style.display = "";
            (await this.window.getHtmlElement("loader")).style.display = "none";
            (await this.window.getHtmlElement("out")).style.display = "";
            this.anychart.draw();
        } else {
            var type = data.showType;
            var label = data.title;
            var labels = data.options;
            var d = [];
            for (var i = 0; i < labels.length; i++) {
                d.push(data.votes[labels[i]]);
            }
            var beginAtZero = data.zero;

            //remove the old chart
            if (this.currentChart != undefined)
                this.currentChart.destroy();

            //load chart
            await this.load(type, label, labels, d, beginAtZero);
        }
    }

    /**
     * gets called when the data of the current chart gets changed
     */
    async update(data) {
        if (data["pollType"] == "wordcloud") {
            var taglist = data["taglist"];

            var taglist2 = []
            for (var i in taglist) {
                taglist2.push({ x: i, value: taglist[i] });
            }
            this.anychart.data(taglist2);
            this.anychart.draw();
        } else if (data["pollType"] == "chart") {
            if (data["type"] == "add") {
                var indexToUpdate = System.program.get(0).currentChart.data.labels.indexOf(data["option"]);
                this.currentChart.data.datasets[0].data[indexToUpdate] += 1;
                this.currentChart.update();
            } else {
                console.warn("got update but type is not add")
            }
        }
    }


    /**
     * @param {string} type bar
     * @param {string} label "# of Votes"
     * @param {string[]} labels ["red", "blue"]
     * @param {number[]} data [1, 2]
     * @param {boolean} beginAtZero false
     */
    async load(type, label, labels, data, beginAtZero) {
        const ctx = await this.window.getHtmlElement("myChart");
        ctx.style.display = "";
        (await this.window.getHtmlElement("out")).style.display = "";
        (await this.window.getHtmlElement("loader")).style.display = "none";

        this.currentChart = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: beginAtZero
                    }
                }
            }
        });
    }
}

class create {
    constructor(path) {
        this.PATH = path;
        this.load();
    }
    async load() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Create Vote", async () => {
            await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")
            await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/create.html"));
            await this.window.size.setInnerSize(400, 400);
            this.window.size.userCanResize(true);

            this.window.addHtmlEventListener("click", "create", async () => {
                //hide element all
                (await this.window.getHtmlElement("all")).style.display = "none";

                //send data to server
                var title = (await this.window.getHtmlElement("title")).value;
                var description = (await this.window.getHtmlElement("description")).value;
                var options = (await this.window.getHtmlElement("options")).value;
                var publicResults = (await this.window.getHtmlElement("publicResults")).checked;
                var prpassword = (await this.window.getHtmlElement("prpassword")).value;
                var showType = (await this.window.getHtmlElement("showType")).value;
                var zero = (await this.window.getHtmlElement("zero")).checked;

                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://vote.flulu.eu/api/create", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    title: title,
                    description: description,
                    options: options,
                    publicResults: publicResults,
                    prpassword: prpassword,
                    showType: showType,
                    zero: zero
                }));
                xhr.thi = this;
                xhr.onload = function () {
                    var data = this.responseText;
                    SystemHtml.WindowHandler.presets.createInformation("Vote link", "https://vote.flulu.eu/" + data);

                    this.thi.window.makeClose();
                }
                xhr.onabort = async function () {
                    SystemHtml.WindowHandler.presets.createInformation("Error", "Something went wrong");
                    (await this.thi.window.getHtmlElement("all")).style.display = "";
                }
                xhr.onerror = async function () {
                    SystemHtml.WindowHandler.presets.createInformation("Error", "Something went wrong");
                    (await this.thi.window.getHtmlElement("all")).style.display = "";
                }
            }, this);
        });
    }
}

new program();