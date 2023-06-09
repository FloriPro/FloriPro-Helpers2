class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        await System.getLib("md5");

        this.previousMax = undefined;

        this.currentPost = undefined;
        this.past = []
        this.pastId = -1;

        this.permalink = ""
        await this.loadAllreadyRead();

        this.allreadyLoading = false;
        this.maxWidth = "500px";

        /**
         * @type {reddit}
         */
        this.redditApi = new (await System.run(this.PATH.folder() + "/api.js"))();//new (await System.getLib("redditApi")) //new (await System.run(this.PATH.folder() + "/api.js"))(["memes"]);
        this.redditApi.vars = await SystemFileSystem.getFileJson("c/user/reddit/settings.json")


        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Reddit",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

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
                this.openVid = await this.window.getHtmlElement("openVid");

                this.post.style.display = "none";

                this.currentEditSetting = undefined;
                await this.window.addHtmlEventListener("click", "addSetting", this.addSetting, this);
                await this.window.addHtmlEventListener("click", "selectSubreddits", this.saveEditSetting, this);
                await this.window.addHtmlEventListener("click", "next", this.next, this);
                await this.window.addHtmlEventListener("click", "back", this.back, this);
                await this.window.addHtmlEventListener("click", "img", this.imgFullscreen, this);

                await this.window.addHtmlEventListener("click", "setWindownormal", this.sizeNormal, this);
                await this.window.addHtmlEventListener("click", "setWindowmax", this.sizeMax, this);
                await this.window.addHtmlEventListener("click", "setWindownormal2", this.sizeNormal, this);
                await this.window.addHtmlEventListener("click", "setWindowmax2", this.sizeMax, this);
                //await this.window.addHtmlEventListener("click", "postDebug", this.postDebug, this);
                await this.window.addHtmlEventListener("click", "openVid", this.openVideo, this);
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

    sizeNormal() {
        if (this.previousMax) {
            this.window.size.setMax();
            return
        }
        if (this.previousMax != undefined) {
            this.window.size.notMax()
        }
    }
    sizeMax() {
        if (!this.window.size.fullMax) {
            this.previousMax = this.window.size.max;
        }
        this.window.size.setfullMax();
    }

    async addSetting() {
        (await this.window.getHtmlElement("editSetting")).style.display = "";
        (await this.window.getHtmlElement("listSettings")).style.display = "none";
        (await this.window.getHtmlElement("addSetting")).style.display = "none";

        var settigns = await SystemFileSystem.getFileJson("c/user/reddit/settings.json");
        this.currentEditSetting = settigns.length;
        settigns.push({ "name": "new setting", "subreddits": "", "limit": "10", "sort_time": "all", "sort_by": "hot", "only_images": false, "save_data": false, "no_nsfw": false, "needs_bool_argument": "" });
        await SystemFileSystem.setFileString("c/user/reddit/settings.json", JSON.stringify(settigns));

        await this.loadSettingIntoEdit(this.currentEditSetting);
    }

    async loadSettingIntoEdit(id) {
        var settings = await SystemFileSystem.getFileJson("c/user/reddit/settings.json");
        var setting = settings[id];

        for (var x of await this.window.getHtmlElements("variable")) {
            var optionValue = "";
            var optionName = x.name;

            if (x.type == 'checkbox') {
                x.checked = setting[optionName];
            } else {
                x.value = setting[optionName];
            }

            if (this.redditApi.boolVars.includes(optionName)) {
                if (setting[optionName] == true)
                    x.checked = true;
                else
                    x.checked = false;
            } else {
                x.value = setting[optionName];
            }
        }

        (await this.window.getHtmlElement("subredditSelect")).value = setting.subreddits;
    }

    async saveEditSetting() {
        //{"limit": "10","sort_time": "all","sort_by": "hot","only_images": false,"save_data": false,"no_nsfw": false,"needs_bool_argument": "","subreddits": "memes", "name": "memes"}
        var out = {}
        //this.redditApi.setSubreddits((await this.window.getHtmlElement("subredditSelect")).value.split(","));

        for (var x of await this.window.getHtmlElements("variable")) {
            var optionValue = "";
            var optionName = x.name;

            if (x.type == 'checkbox') {
                optionValue = "" + x.checked;
            } else {
                optionValue = x.value;
            }

            if (optionValue == undefined || optionValue == null) {
                optionValue = "";
            }

            if (this.redditApi.boolVars.includes(optionName)) {
                if (optionValue == "true")
                    out[optionName] = true;
                else
                    out[optionName] = false;
            } else {
                out[optionName] = optionValue;
            }
        }

        var settings = await SystemFileSystem.getFileJson("c/user/reddit/settings.json");

        out["subreddits"] = (await this.window.getHtmlElement("subredditSelect")).value;
        settings[this.currentEditSetting] = out;


        await SystemFileSystem.setFileString("c/user/reddit/settings.json", JSON.stringify(settings));

        (await this.window.getHtmlElement("editSetting")).style.display = "none";
        (await this.window.getHtmlElement("listSettings")).style.display = "";
        (await this.window.getHtmlElement("addSetting")).style.display = "";

        await this.displaySettings();
    }

    async loadSetting(id) {
        console.log("loadSetting", id);
        var settings = await SystemFileSystem.getFileJson("c/user/reddit/settings.json");
        this.redditApi.vars = settings[id];
        this.redditApi.setSubreddits(settings[id].subreddits.split(","));

        this.post.style.display = "";
        this.settings.style.display = "none";
        this.next();
    }
    async displaySettings() {
        //load edit settings
        var esf = await SystemFileSystem.getFileString(this.PATH.folder() + "/settings.html");
        (await this.window.getHtmlElement("dynamicEditSetting")).innerHTML = esf;
        await this.window.parseNewHtml();

        (await this.window.getHtmlElement("listSettings")).innerHTML = "";

        //load different setting presets
        var settings = await SystemFileSystem.getFileJson("c/user/reddit/settings.json");
        var i = 0;
        for (var x of settings) {
            var div = document.createElement("div");
            div.className = "oneSetting";

            var button = document.createElement("button");
            button.className = "settingButton";
            button.innerText = x.name;
            button.onclick = ((i) => {
                this.loadSetting(i);
            }).bind(this, i);
            div.appendChild(button);


            var editButton = document.createElement("button");
            editButton.innerText = "edit";
            editButton.className = "settinEditButton";
            editButton.onclick = (async (i) => {
                (await this.window.getHtmlElement("editSetting")).style.display = "";
                (await this.window.getHtmlElement("listSettings")).style.display = "none";
                (await this.window.getHtmlElement("addSetting")).style.display = "none";

                this.currentEditSetting = i;

                await this.loadSettingIntoEdit(this.currentEditSetting);
            }).bind(this, i);
            div.appendChild(editButton);

            var deleteButton = document.createElement("button");
            deleteButton.innerText = "delete";
            deleteButton.className = "settinDeleteButton";
            deleteButton.onclick = (async (i) => {
                var settings = await SystemFileSystem.getFileJson("c/user/reddit/settings.json");
                settings.splice(i, 1);
                await SystemFileSystem.setFileString("c/user/reddit/settings.json", JSON.stringify(settings));
                this.displaySettings();
            }).bind(this, i);
            div.appendChild(deleteButton);

            (await this.window.getHtmlElement("listSettings")).appendChild(div);
            i++;
        }
    }

    async editSettings() {
        (await this.window.getHtmlElement("subredditSelect")).value = this.redditApi.vars["subreddits"];
        for (var x of await this.window.getHtmlElements("variable")) {
            var optionValue = "";
            var optionName = x.name;

            if (x.type == 'checkbox') {
                x.checked = this.redditApi.vars[optionName]
            } else {
                x.value = this.redditApi.vars[optionName]
            }
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
        this.openVid.style.display = "none";

        var n = { data: { permalink: "_" } };

        var maxIt = 50;
        var i = 0;
        while (this.sawAllready(md5(n.data.permalink)) || n.data.permalink == "_") {
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
                } else {
                    i = 0;
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

    /**
     * 
     * @param {post} n 
     */
    load(n) {
        this.currentPost = n;

        this.openVid.style.display = "none";
        this.title.innerText = "...";
        this.text.innerText = "";
        this.link.innerText = "";
        this.img.innerHTML = "";

        this.permalink = n.data.permalink;
        if (!this.sawAllready(md5(n.data.permalink))) {
            this.addToAllreadySaw(md5(n.data.permalink))
        }
        this.updateAllreadyRead();

        this.title.innerText = n.Title();
        this.text.innerHTML = n.HtmlText();

        this.link.innerText = "reddit.com";
        this.link.href = "https://www.reddit.com" + n.data.permalink;

        for (var x of n.composedImage()) {
            var div = document.createElement("div");

            var i = document.createElement("img");
            i.src = x["compressed"];
            i.style.maxWidth = this.maxWidth;
            i.style.width = "100%";
            i.setAttribute("element", "oneImg")
            i.classList.add("im1");

            if (x["highquality"] && x["highquality"] != x["compressed"]) {
                var i1 = document.createElement("img");
                i1.src = x["highquality"];
                i1.style.maxWidth = this.maxWidth;
                i1.style.width = "100%";
                i1.setAttribute("element", "oneImg")
                i1.style.display = "none";
                i1.classList.add("im0");
                i1.onload = ((i1, i2, i) => {
                    //check if i1 and i are still in the dom
                    if (i1.parentElement != null) {
                        i1.style.display = "";
                    }
                    if (i.parentElement != null) {
                        i.remove();
                    }
                }).bind(this, i1, i2, i)
            }

            var i2 = document.createElement("img");
            i2.src = x["full"];
            i2.style.display = "none";

            i2.style.maxWidth = this.maxWidth;
            i2.style.width = "100%";
            i2.setAttribute("element", "oneImg")

            i2.onload = (event) => {
                event.composedPath()[0].style.display = "";
                event.composedPath()[1].querySelector("p").remove();
                if (event.composedPath()[1].querySelector(".im1") != null) {
                    event.composedPath()[1].querySelector(".im1").remove();
                }
                if (event.composedPath()[1].querySelector(".im0") != null) {
                    event.composedPath()[1].querySelector(".im0").remove();
                }
            }

            var p = document.createElement("p");
            p.innerText = "loading Image";
            p.style.color = "gray";

            div.append(p);
            div.append(i);
            if (x["highquality"]) {
                div.append(i1);
            }
            div.append(i2);


            this.img.append(div);
        }
        if (n.nsfw()) {
            this.img.style.filter = "blur(20px)";
        } else {
            this.img.style.filter = "";
        }
        this.window.parseNewHtml();

        var media = n.media();
        if (media != null) {
            if (media["type"] == "youtube") {
                this.text.innerHTML += media["dat"]
            } else if (media["type"] == "redditVideo") {
                this.text.innerHTML += "<p><a href='" + media["dat"][0] + "'>Video</a></p>"
                this.text.innerHTML += "<p><a href='" + media["dat"][1] + "'>Audio</a></p>"
                this.openVid.style.display = "";
            }
        }
        this.allreadyLoading = false;
    }
    openVideo() {
        var media = this.currentPost.media();
        new videoWindow(media["dat"][0], media["dat"][1]);
    }
    postDebug() {
        console.log(this.currentPost)
    }
    imgFullscreen() {
        new ImgWindow(this.currentPost.ImageFull());
    }

    async loadAllreadyRead() {
        this.allreadyRead = [];
        var f = await SystemFileSystem.getFiles("c/user/reddit/old")
        if (f.length == 0) {
            console.warn("Install failed");
            await SystemFileSystem.setFileString("c/user/reddit/old/0.json", "[]");
            f = await SystemFileSystem.getFiles("c/user/reddit/old");
        }

        for (var x of f) {
            var d = await SystemFileSystem.getFileString("c/user/reddit/old/" + x);
            this.allreadyRead = this.allreadyRead.concat(JSON.parse(d));
        }

        if (await SystemFileSystem.fileExists("c/user/reddit/old.json")) {
            var d = await SystemFileSystem.getFileString("c/user/reddit/old.json");
            this.allreadyRead = this.allreadyRead.concat(JSON.parse(d));
        }
    }
    sawAllready(hash) {
        return this.allreadyRead.includes(hash);
    }
    async addToAllreadySaw(hash) {
        const perfile = 20;

        this.allreadyRead.push(hash);
        if (await SystemFileSystem.fileExists("c/user/reddit/old/" + Math.floor(this.allreadyRead.length / perfile) + ".json") == false) {
            await SystemFileSystem.setFileString("c/user/reddit/old/" + Math.floor(this.allreadyRead.length / perfile) + ".json", "[]");
        }
        var v = await SystemFileSystem.getFileJson("c/user/reddit/old/" + Math.floor(this.allreadyRead.length / perfile) + ".json");
        v.push(hash);
        await SystemFileSystem.setFileString("c/user/reddit/old/" + Math.floor(this.allreadyRead.length / perfile) + ".json", JSON.stringify(v));
    }
    async updateAllreadyRead() {
        //await SystemFileSystem.setFileString("c/user/reddit/old.json", JSON.stringify(this.allreadyRead));
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
class ImgWindow {
    constructor(imgs) {
        this.load(imgs);
    }
    async load(imgs) {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Reddit Image",
            //onready:
            async () => {
                //set html
                await this.window.setContent(`<div element="img" style="min-height:100%"></div>`);
                await this.window.size.setSize(300, 500);

                this.img = await this.window.getHtmlElement("img");

                for (var x of imgs) {
                    var i = document.createElement("img");
                    var iLoader = document.createElement("p");
                    iLoader.style.position = "absoulute"
                    iLoader.innerText = "loading Image:";
                    iLoader.style.color = "gray";

                    i.loader = iLoader;
                    i.onload = (event) => {
                        event.composedPath()[0].loader.remove();
                    }

                    i.src = x;
                    i.style.maxWidth = this.maxWidth;
                    i.style.width = "100%";
                    this.img.append(iLoader);
                    this.img.append(i);
                }

                setTimeout(this.window.size.setfullMax.bind(this.window.size), 100);
                await this.window.addHtmlEventListener("onclick", "img", () => {
                    this.window.makeClose();
                }, this);
            });
        this.window.close = () => {
            return true
        }
    }
}
class commentWindow {
    constructor(post) {
        /**
         * @type {post}
         */
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
                var i = 0;
                for (var x of comments) {
                    var comment = this.loadComment(x);
                    if (comment == undefined) {
                        continue;
                    }
                    if (i == 0) {
                        comment.querySelector(".redditCommentAuthor").style.marginTop = "-20px";
                    }
                    c.append(comment);
                    i++;
                }
            });
        this.window.close = () => {
            return true
        }
    }

    loadComment(dat, isReply = false) {
        if (dat["body_html"] == undefined && dat["author"] == undefined) {
            return
        }
        var mainDiv = document.createElement("div");
        if (!isReply) {
            mainDiv.className = "redditCommentFirst";
        }

        var textDiv = document.createElement("div")
        textDiv.className = "redditCommentText";


        var author = document.createElement("div");
        author.className = "redditCommentAuthor";
        author.contextscript = ((author_data) => {
            return {
                "Open Profile": ((author_data) => {
                    window.open("https://www.reddit.com/user/" + author_data.name);
                }).bind(this, author_data),
            }
        }).bind(this, dat.author_data)

        var authorImg = document.createElement("img");
        authorImg.src = "https://www.redditstatic.com/avatars/avatar_default_02_0079D3.png";
        dat.author_data.getIcon().then((v) => {
            authorImg.src = v;
        });
        authorImg.className = "redditCommentAuthorImg";
        author.append(authorImg);

        var authorP = document.createElement("p");
        authorP.innerText = dat["author"]
        author.append(authorP);

        var body = document.createElement("p");
        body.innerHTML = dat["body_html"]
        body.className = "redditCommentBody";
        body.contextscript = ((body) => {
            return {
                "message": ((body) => {
                    SystemHtml.WindowHandler.presets.createInformation("Message", body);
                }).bind(this, body),
            }
        }).bind(this, dat["body"])

        textDiv.append(author);
        textDiv.append(body);

        mainDiv.append(textDiv)

        if (dat["replies"].length > 0) {
            var repliesDiv = document.createElement("div");
            repliesDiv.className = "redditCommentReplies redditComment redditCommentIndentLine";

            //only if not last
            body.classList.add("redditCommentIndentLine");

            for (var x of dat["replies"]) {
                var v = this.loadComment(x, true)
                if (v != undefined)
                    repliesDiv.append(v);
            }

            mainDiv.append(repliesDiv)
        } else {
            body.classList.add("redditCommentNOLine");
        }
        //mainDiv.append(document.createElement("hr"))

        return mainDiv;
    }
}
class videoWindow {
    constructor(video, audio) {
        this.video = video;
        this.audio = audio;
        this.load();
        this.loadeds = 0;
    }
    async load() {
        this.window = await SystemHtml.WindowHandler.createWindow("Video",
            //onready:
            async () => {
                //set html
                await this.window.setContent(`
                <h1 element="loading">Loading... please wait</h1>
                <div element="vid">
                    <video element="video" controls width="100%" height="100%" alt="loading...">
                        <source element="video_src">
                    </video>
                    <audio element="video_audio" controls alt="loading...">
                        <source element="video_audio_src">
                    </audio>
                </div>`);
                await this.window.size.setSize(300, 500);
                await this.window.size.userCanResize(true)

                this.video_video = await this.window.getHtmlElement("video");
                this.video_audio = await this.window.getHtmlElement("video_audio");

                this.video_video.src = this.video;
                this.video_audio.src = this.audio;

                this.window.addHtmlEventListener("onloadeddata", "video", this.loadedVideo, this);
                this.window.addHtmlEventListener("onloadeddata", "video_audio", this.loadedAudio, this);

                var c = await this.window.getHtmlElement("video");

            });
        this.window.close = () => {
            return true
        }
    }
    loadedAudio() {
        this.loadeds++;
        if (this.loadeds == 2) {
            this.addEvents();
        }
    }
    loadedVideo() {
        this.loadeds++;
        if (this.loadeds == 2) {
            this.addEvents();
        }
    }
    async addEvents() {
        (await this.window.getHtmlElement("loading")).style.display = "none";

        console.log("loaded!");
        this.window.addHtmlEventListener("onpause", "video", this.videoEvents, this);
        this.window.addHtmlEventListener("onplay", "video", this.videoEvents, this);
        this.window.addHtmlEventListener("onseeking", "video", this.videoEvents, this);
        this.window.addHtmlEventListener("onwaiting", "video", this.videoEvents, this);
        this.window.addHtmlEventListener("oncanplay", "video", this.videoEvents, this);
    }
    async videoEvents(_, __, ___, event) {
        this.video_audio.currentTime = this.video_video.currentTime;
        if (event.type == 'play') {
            this.video_audio.play();
        } else if (event.type == 'pause') {
            this.video_audio.pause();
        } else if (event.type == 'waiting') {
            this.video_audio.pause();
        } else if (event.type == 'canplay') {
            if (!this.video_video.paused) { this.video_audio.play(); }
        }
    }
}
new program();