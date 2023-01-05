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
                
                this.loadOldCharts();

                //set random id for container
                this.anychartContainerId = System.makeid(10);
                (await this.window.getHtmlElement("container")).id = this.anychartContainerId;

                /////////Load libs/////////////////////
                //load anychart js lib
                await System.getLib("anychart") // returns the global anychart object, so i dont need it, because i can use the global one :)
                this.anyReady();

                //load qr code js
                await System.getLib("qrious");

                //load chart js
                await System.getLib("chartjs");
                ///////////////////////////////////////

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
                        },
                        "vote url": async () => {
                            console.log(this);
                            //SystemHtml.WindowHandler.presets.createInformation("Vote link", "https://vote.flulu.eu/" + this.voteId);
                            new qrCode("https://vote.flulu.eu/" + this.voteId, this.PATH);
                        }
                    }
                };

                //add event listener to createButton
                this.window.addHtmlEventListener("click", "createButton", async () => {
                    //new window create
                    new create(this.PATH, this);
                }, this);

                this.window.addHtmlEventListener("click", "createCloudButton", async () => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "https://vote.flulu.eu/api/createCloud", true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    var title = await SystemHtml.WindowHandler.presets.createStringSelect("Title", "enter the title of the wordcloud")
                    xhr.send(JSON.stringify({
                        "title": title,
                        "description": await SystemHtml.WindowHandler.presets.createStringSelect("Description", "enter the description of the wordcloud"),
                    }));
                    xhr.thi = this;
                    xhr.onload = function () {
                        var data = this.responseText;
                        //SystemHtml.WindowHandler.presets.createInformation("WordCloud link", "https://vote.flulu.eu/" + data);
                        new qrCode("https://vote.flulu.eu/" + data, this.thi.PATH);

                        this.thi.addChart(data, title, "", "wordcloud")
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
                    var passw = "";

                    var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + id + "#" + System.makeid(100))).text();
                    if (data == "passw") {
                        passw = await SystemHtml.WindowHandler.presets.createStringSelect("Password", "to access this data you need to enter a password");
                        var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + id + "/" + passw + "#" + System.makeid(100))).text();
                        if (data == "passw wrong") {
                            SystemHtml.WindowHandler.presets.createInformation("Password wrong", "the password you entered is wrong");
                            return;
                        }
                        this.passw = passw;
                    }
                    this.voteId = id;

                    data = JSON.parse(data);

                    //add to old votes
                    this.addChart(id, data.title, passw, data.type)

                    this.loadData(data);
                }, this);

                //add event listener to add a vote to the latest votes
                this.window.addHtmlEventListener("click", "addVote", async () => {
                    var id;
                    var url = await SystemHtml.WindowHandler.presets.createStringSelect("Vote url", "enter the url of the vote you want to add to the latest votes");
                    if (url.split("/").length == 1) {
                        id = url;
                    }
                    else if (url.split("/")[3] == "") {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "the url you entered is not valid");
                        return;
                    } else {
                        id = url.split("/")[3];
                    }

                    var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + id + "#" + System.makeid(5))).text();
                    if (data == "passw") {
                        var passw = await SystemHtml.WindowHandler.presets.createStringSelect("Password", "to access this data you need to enter a password");
                        var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + id + "/" + passw + "#" + System.makeid(5))).text();
                        if (data == "passw wrong") {
                            SystemHtml.WindowHandler.presets.createInformation("Password wrong", "the password you entered is wrong");
                            return;
                        }
                    }

                    data = JSON.parse(data);
                    this.addChart(id, data["title"], data["prpassword"], data["type"]);
                }, this);

                //open a recent vote
                //gets calld two times, because the event listener is to the elmennt oldCharts, which contains another element oldCharts
                //check if it is the second call
                var first = true;
                this.window.addHtmlEventListener("click", "oldCharts", async (_, __, ___, e) => {
                    var id = e.target.getAttribute("voteId");
                    if (id == null) return;

                    if (first) {
                        first = false;
                        return;
                    }
                    first = true;

                    //get data from file
                    var d = await SystemFileSystem.getFileJson("c/user/vote/polls.json");
                    var i = d.findIndex((e) => e.id == id);
                    d = d[i];

                    if (d.password == "" || d.password == undefined) {
                        var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + id + "#" + System.makeid(5))).text();
                        this.passw = undefined;
                    } else {
                        var data = await (await System.network.fetch("https://vote.flulu.eu/api/endpoint/getVote/" + id + "/" + d.password + "#" + System.makeid(5))).text();
                        this.passw = d.password;
                    }
                    this.voteId = id;

                    this.network.setPoll(id);

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
        this.anychart = anychart.tagCloud();
        this.anychart.title("Loading...");
        this.anychart.angles([0])
        this.anychart.textSpacing(3);
        this.anychart.mode("spiral");
        this.anychart.container(this.anychartContainerId);
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
                var indexToUpdate = this.currentChart.data.labels.indexOf(data["option"]);
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

    async loadOldCharts() {
        if (await SystemFileSystem.fileExists("c/user/vote/polls.json")) {
            // example: [{id: "Ajxlkcv12A", title: "test"}, {id: "aAskfl213s", title: "test2", password: "1234"}]
            var oldVotes = await SystemFileSystem.getFileJson("c/user/vote/polls.json");
        } else {
            var oldVotes = []
            await SystemFileSystem.setFileString("c/user/vote/polls.json", "[]");
        }

        var el = await this.window.getHtmlElements("oldCharts");
        for (var x of el) {
            if (x.getAttribute("special") == "isOg") {
                el = x;
                break;
            }
        }

        el.innerHTML = "";

        for (var i = 0; i < oldVotes.length; i++) {
            if (i == 10) { break; }

            var vote = oldVotes[i];
            var button = document.createElement("button");
            button.innerText = vote.title + " (" + vote.id + " | " + vote.type + ")";
            button.setAttribute("element", "oldCharts");
            button.setAttribute("voteId", vote.id);

            el.appendChild(button);
        }

        await this.window.parseNewHtml();
    }

    async addChart(voteId, title, password, type) {
        var oldVotes = await SystemFileSystem.getFileJson("c/user/vote/polls.json");

        //check if allready exists
        for (var i = 0; i < oldVotes.length; i++) {
            if (oldVotes[i].id == voteId) {
                //put it on top
                oldVotes.splice(i, 1);
                break;
            }
        }

        if (password == undefined) { password = ""; }
        oldVotes = [{ id: voteId, title: title, password: password, type: type }].concat(oldVotes);
        //oldVotes.push({ id: voteId, title: title, password: password, type: type });
        SystemFileSystem.setFileString("c/user/vote/polls.json", JSON.stringify(oldVotes));

        this.loadOldCharts();
    }
}

class create {
    constructor(path, parent) {
        this.parent = parent;
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
                var prpassword = (await this.window.getHtmlElement("prpassword")).value;
                var publicResults = prpassword == "";
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
                    //SystemHtml.WindowHandler.presets.createInformation("Vote link", "https://vote.flulu.eu/" + data);
                    new qrCode("https://vote.flulu.eu/" + data, this.thi.PATH);

                    //add to old charts
                    this.thi.parent.addChart(data, title, prpassword, "chart");

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

class qrCode {
    constructor(url, path) {
        this.url = url;
        this.PATH = path;
        this.load();
    }
    async load() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("QR Code", async () => {
            await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")
            await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/qr.html"));
            await this.window.size.setInnerSize(400, 430);
            this.window.size.userCanResize(true);

            (await this.window.getHtmlElement("url")).innerText = this.url;
            (await this.window.getHtmlElement("url")).href = this.url;

            var qr = new QRious({
                element: await this.window.getHtmlElement("qr"),
                value: this.url
            });
            qr.size = 1000;

            //right click qrcode to get url
            (await this.window.getHtmlElement("all")).contextscript = () => {
                return {
                    "Get URL": () => {
                        SystemHtml.WindowHandler.presets.createInformation("URL", this.url);
                    },
                    "Copy URL": async () => {
                        await navigator.clipboard.writeText(this.url);
                    }
                }
            }
        });
    }
}

new program();