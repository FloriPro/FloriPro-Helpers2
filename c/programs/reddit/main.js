class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {

        this.currentPost = undefined;
        this.past = []
        this.pastId = -1;

        this.permalink = ""
        this.allreadyRead = await SystemFileSystem.getFileJson(this.PATH.folder() + "/old.json")

        this.allreadyLoading = false;
        this.maxWidth = "500px";

        this.redditApi = new (await System.run(this.PATH.folder() + "/api.js"))(["memes"])
        this.redditApi.vars = await SystemFileSystem.getFileJson(this.PATH.folder() + "/settings.json")

        console.log("started as id " + this.id);
        this.window = await SystemHtml.WindowHandler.createWindow("Reddit",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(500, 500);
                await this.window.size.userCanResize(true)

                this.displaySettings();

                this.settings = await this.window.getHtmlElement("settings");
                this.post = await this.window.getHtmlElement("post");

                this.title = await this.window.getHtmlElement("title");
                this.text = await this.window.getHtmlElement("text");
                this.img = await this.window.getHtmlElement("img");
                this.link = await this.window.getHtmlElement("link");

                this.post.style.display = "none";

                await this.window.addHtmlEventListener("click", "selectSubreddits", this.loadSettings, this);
                await this.window.addHtmlEventListener("click", "next", this.next, this);
                await this.window.addHtmlEventListener("click", "back", this.back, this);
                await this.window.addHtmlEventListener("click", "openSettings", () => {
                    this.post.style.display = "none";
                    this.settings.style.display = "";
                }, this);

                await this.window.addHtmlEventListener("click", "openReddit", () => {
                    var link = "https://js4.red" + this.permalink
                    new redjsWindow(link);
                }, this);
                await this.window.addHtmlEventListener("click", "comments", () => {
                    new commentWindow(this.currentPost);
                }, this);
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async loadSettings() {
        this.redditApi.setSubreddits((await this.window.getHtmlElement("subredditSelect")).value.split(","));

        for (var x of await this.window.getHtmlElements("variable")) {
            var optionValue = "";
            var optionName = x.name;

            if (x.type == 'checkbox') {
                optionValue = "" + x.checked;
            } else {
                optionValue = x.value;
            }

            if (this.redditApi.boolVars.includes(optionName)) {
                if (optionValue == "true")
                    this.redditApi.vars[optionName] = true;
                else
                    this.redditApi.vars[optionName] = false;
            } else {
                this.redditApi.vars[optionName] = optionValue;
            }
        }

        var v = this.redditApi.vars;
        v["subreddits"] = (await this.window.getHtmlElement("subredditSelect")).value;
        var v = JSON.stringify(v)
        await SystemFileSystem.setFileString(this.PATH.folder() + "/settings.json", v)

        this.post.style.display = "";
        this.settings.style.display = "none";
        this.next();
    }
    async displaySettings() {
        (await this.window.getHtmlElement("subredditSelect")).value = this.redditApi.vars["subreddits"];
        for (var x of await this.window.getHtmlElements("variable")) {
            var optionValue = "";
            var optionName = x.name;

            if (x.type == 'checkbox') {
                x.checked = this.redditApi.vars[optionName]
            } else {
                x.value = this.redditApi.vars[optionName]
            }
            /*
            if (this.redditApi.boolVars.includes(optionName)) {
                if (optionValue == "true")
                    this.redditApi.vars[optionName] = true;
                else
                    this.redditApi.vars[optionName] = false;
            } else {
                this.redditApi.vars[optionName] = optionValue;
            }*/
        }
    }
    async next() {
        if (this.pastId < this.past.length - 1) {
            this.pastId++;
            this.load(this.past[this.pastId]);
            return;
        }

        this.allreadyLoading = true;

        this.title.innerText = "...";
        this.text.innerText = "";
        this.link.innerText = "";
        this.img.innerHTML = "";

        var n = { data: { permalink: "_" } };

        var maxIt = 50;
        var i = 0;
        while (this.allreadyRead.includes(n.data.permalink)) {
            n = await this.redditApi.next();
            i++;
            if (i >= maxIt) {
                var r = await SystemHtml.WindowHandler.presets.createConfirm("Load more?", "We could not find any new Posts in the last " + maxIt + ". Do you want so search more?")
                if (!r) {
                    this.title.innerText = "No new posts";
                    this.text.innerText = "";
                    this.link.innerText = "";
                    this.img.innerHTML = "";
                    return;
                }
            }
        }

        this.pastId++;
        if (this.pastId >= 15) {
            this.pastId = 14;
            this.past.shift();
        }
        this.past.push(n);

        this.load(n);
    }
    back() {
        if (this.pastId > 0) {
            this.pastId--;
            this.load(this.past[this.pastId]);
        }
    }

    load(n) {
        this.currentPost = n;

        this.title.innerText = "...";
        this.text.innerText = "";
        this.link.innerText = "";
        this.img.innerHTML = "";

        this.permalink = n.data.permalink;
        this.allreadyRead.push(n.data.permalink)
        this.updateAllreadyRead();

        this.title.innerText = n.Title();
        this.text.innerHTML = n.HtmlText();

        this.link.innerText = "reddit.com";
        this.link.href = "https://www.reddit.com" + n.data.permalink;

        for (var x of n.Image()) {
            var i = document.createElement("img");
            i.src = x;
            i.style.maxWidth = this.maxWidth;
            i.style.width = "100%";
            this.img.append(i)
        }
        this.allreadyLoading = false;
    }
    async updateAllreadyRead() {
        await SystemFileSystem.setFileString(this.PATH.folder() + "/old.json", JSON.stringify(this.allreadyRead));
    }
}

class redjsWindow {
    constructor(link) {
        this.load(link);
    }
    async load(link) {
        this.window = await SystemHtml.WindowHandler.createWindow("Full (redditjs)",
            //onready:
            async () => {
                //set html
                await this.window.setContent(`<iframe src="` + link + `" style="width: calc(100% - 4px); height: calc(100% - 10px);">Could not load</iframe>`);
                await this.window.size.setSize(300, 500);
                await this.window.size.userCanResize(true)
            });
        this.window.close = () => {
            return true
        }
    }
}
class commentWindow {
    constructor(post) {
        this.post = post;
        this.load();
    }
    async load() {
        this.window = await SystemHtml.WindowHandler.createWindow("Comments",
            //onready:
            async () => {
                //set html
                await this.window.setContent(`<div element="comment"><p>Loading</p></div>`);
                await this.window.size.setSize(300, 500);
                await this.window.size.userCanResize(true)
                var comments = await this.post.comments();

                var c = await this.window.getHtmlElement("comment");
                c.innerHTML = "";
                for (var x of comments) {
                    c.append(this.loadComment(x));
                }
            });
        this.window.close = () => {
            return true
        }
    }

    loadComment(dat) {
        if (dat["body_html"] == undefined && dat["author"] == undefined) {
            return
        }
        var mainDiv = document.createElement("div");

        var textDiv = document.createElement("div")

        var author = document.createElement("p");
        var body = document.createElement("p");
        author.innerText = dat["author"]
        author.style.fontWeight = "700";
        body.innerHTML = dat["body_html"]

        textDiv.append(author);
        textDiv.append(body);

        mainDiv.append(textDiv)

        if (dat["replies"].length != 0) {
            var repliesDiv = document.createElement("div");
            repliesDiv.className = "redditComment";
            repliesDiv.style.marginLeft = "5px";

            for (var x of dat["replies"]) {
                var v = this.loadComment(x)
                if (v != undefined)
                    repliesDiv.append(v);
            }

            mainDiv.append(repliesDiv)
        }
        mainDiv.append(document.createElement("hr"))

        return mainDiv;
    }
}
new program();