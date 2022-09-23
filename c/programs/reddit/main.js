class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
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

                await this.window.addHtmlEventListener("click", "selectSubreddits", async () => {
                    this.redditApi.setSubreddits((await this.window.getHtmlElement("subredditSelect")).value.split(","));
                    this.post.style.display = "";
                    this.settings.style.display = "none";
                    this.next();
                }, this);
                await this.window.addHtmlEventListener("click", "next", this.next, this);
                await this.window.addHtmlEventListener("click", "openSettings", () => {
                    this.post.style.display = "none";
                    this.settings.style.display = "";
                }, this);


            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async next() {
        this.allreadyLoading = true;

        this.title.innerText = "...";
        this.text.innerText = "";
        this.link.innerText = "";
        this.img.innerHTML = "";

        var n = { data: { permalink: "_" } };
        while (this.allreadyRead.includes(n.data.permalink)) {
            n = await this.redditApi.next();
        }

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
new program();