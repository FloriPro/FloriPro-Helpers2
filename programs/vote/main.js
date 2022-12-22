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
                    eval(await SystemFileSystem.getFileString("c/programs/vote/wordcloud.js")); //deprecated

                    //load anychart
                    await System.run("c/programs/vote/anychart/js/anychart-base.min.js");
                    await System.run("c/programs/vote/anychart/js/anychart-exports.min.js");
                    await System.run("c/programs/vote/anychart/js/anychart-tag-cloud.min.js");
                    await System.run("c/programs/vote/anychart/js/anychart-ui.min.js");

                    anychart.onDocumentReady(this.anyReady.bind(this));

                    //load anychart css
                    var css = document.createElement("style");
                    css.innerHTML = await SystemFileSystem.getFileString("c/programs/vote/anychart/css/anychart-ui.min.css");
                    document.head.appendChild(css);

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
    }

    anyReady() {
        console.warn("ready")
        this.anychart = anychart.tagCloud();
        this.anychart.title("Loading...");
        this.anychart.container(this.anychartContainerId);
        this.anychart.textSpacing(3);
        this.anychart.mode("spiral");
        this.anychart.angles([0]);
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

    async update() {

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
            }, this);
        });
    }
}

new program();