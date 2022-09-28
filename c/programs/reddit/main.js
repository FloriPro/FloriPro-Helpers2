class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.past = []
        this.pastId = -1;

        this.permalink = ""
        this.allreadyRead = await SystemFileSystem.getFileJson(this.PATH.folder() + "/old.json")

        this.allreadyLoading = false;
        this.maxWidth = "500px";

        this.redditApi = new (await System.run(this.PATH.folder() + "/api.js"))(["memes"])
        this.redditApi.vars = {
            "limit": "10",
            "sort_time": "all",
            "sort_by": "hot",
            "only_images": false,
            "save_data": false,
            "no_nsfw": false,
            "needs_bool_argument": ""
        };

        console.log("started as id " + this.id);
        this.window = await SystemHtml.WindowHandler.createWindow("Reddit",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(500, 500);
                await this.window.size.userCanResize(true)

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


        this.post.style.display = "";
        this.settings.style.display = "none";
        this.next();
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
        while (this.allreadyRead.includes(n.data.permalink)) {
            n = await this.redditApi.next();
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
new program();