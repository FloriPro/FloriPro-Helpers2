class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("User Store",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                if (this.window.darkmode != true) {
                    var style = await SystemFileSystem.getFileString(this.PATH.folder() + "/styleLight.css")
                } else {
                    var style = await SystemFileSystem.getFileString(this.PATH.folder() + "/styleDark.css")
                }

                style = "<style>" + style + "</style>";

                await this.window.setContent((await SystemFileSystem.getFileString(this.PATH.folder() + "/newLayout.html")).replace("{{style}}", style).replaceAll("{{windowId}}", this.window.getId()));
                await this.window.size.setInnerSize(960, 640);
                this.window.size.userCanResize(true);

                this.getHomeApps();

                //set events
                this.window.addHtmlEventListener("onclick", "HomeTab", async () => {
                    this.openTab("Home");
                }, this)
                this.window.addHtmlEventListener("onclick", "ListTab", async () => {
                    await this.openTab("List");
                    if (this.getList == true) return;
                    this.getList = true;
                    await this.loadList();
                }, this)

                this.fastSearchEnabled = false;
                this.searchOpen = false;
                this.updateSearch();
                this.window.addHtmlEventListener("onkeyup", "searchInput", async (_, __, ___, e) => {
                    this.search = (await this.window.getHtmlElement("searchInput")).value;
                    if (e.key == "Enter") {
                        this.searchOpen = false;
                        this.updateSearch();

                        await this.openTab("Search");
                        this.loadSearch();

                        //clear search
                        (await this.window.getHtmlElement("searchInput")).value = "";
                        (await this.window.getHtmlElement("searchInput")).blur();
                    } else {
                        if (this.fastSearchEnabled) {
                            if (this.search == "")
                                this.searchOpen = false;
                            else
                                this.searchOpen = true;
                            this.updateSearch();

                            this.fastSearch();
                        }
                    }
                }, this);
                this.window.addHtmlEventListener("onclick", "searchButton", async () => {
                    this.searchOpen = false;
                    this.updateSearch();

                    await this.openTab("Search");
                    this.loadSearch();

                    //clear search
                    (await this.window.getHtmlElement("searchInput")).value = "";
                    (await this.window.getHtmlElement("searchInput")).blur();
                }, this);

                this.openTab("Home");
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async updateSearch() {
        if (this.searchOpen) {
            (await this.window.getHtmlElement("fastSearchOut")).style.display = "";
        } else {
            (await this.window.getHtmlElement("fastSearchOut")).style.display = "none";
        }
    }

    async openTab(tab) {
        (await this.window.getHtmlElement("statusText")).innerText = "OK";
        (await this.window.getHtmlElement("status")).style.display = "none";

        var tabs = ["Home", "List", "Search"];
        for (let i = 0; i < tabs.length; i++) {
            const t = tabs[i];
            (await this.window.getHtmlElement(t + "Tab")).classList.remove("selected");
            (await this.window.getHtmlElement(t + "TabContent")).style.display = "none";
        }
        (await this.window.getHtmlElement(tab + "Tab")).classList.add("selected");
        (await this.window.getHtmlElement(tab + "TabContent")).style.display = "";
        (await this.window.getHtmlElement("statusText")).innerText = "OK";
        (await this.window.getHtmlElement("store")).style.display = "";
        (await this.window.getHtmlElement("status")).style.display = "none";
    }

    async fastSearch() {
        if (this.search == undefined) return;
        if (this.search == "") return;
        (await this.window.getHtmlElement("fastSearchOut")).innerText = "...";
        try {
            var dat = await System.network.fetch("https://flulu-app-gen.floriprolohner.repl.co/api/fastSearch/" + this.search);
            dat = await dat.json();
        } catch {
            (await this.window.getHtmlElement("fastSearchOut")).innerText = "Error while fast searching";
            return;
        }

        (await this.window.getHtmlElement("fastSearchOut")).innerHTML = "";
        for (let i = 0; i < dat.length; i++) {
            const app = dat[i];

            var div = this.makeAppButton(app);
            div.setAttribute("appName", app.title)
            div.setAttribute("appAuthor", app.user)

            div.onclick = this.appInfoWindow.bind(this, app);

            (await this.window.getHtmlElement("fastSearchOut")).appendChild(div)
        }
        if (dat.length == 0) {
            (await this.window.getHtmlElement("fastSearchOut")).innerText = "No results";
        }
    }

    async loadList() {
        var list = (await this.window.getHtmlElement("list"));
        list.innerHTML = "";
        (await this.window.getHtmlElement("statusText")).innerText = "Loading App List...";
        (await this.window.getHtmlElement("errorX")).style.display = "none";
        (await this.window.getHtmlElement("loadingSpinner")).style.display = "";
        (await this.window.getHtmlElement("status")).style.display = "flex";
        try {
            var dat = await System.network.fetch("https://flulu-app-gen.floriprolohner.repl.co/api/list?r" + Math.round(Math.random() * 1000000))
            dat = await dat.json();
        } catch {
            (await this.window.getHtmlElement("statusText")).innerText = "Error while loading apps";
            (await this.window.getHtmlElement("errorX")).style.display = "";
            (await this.window.getHtmlElement("loadingSpinner")).style.display = "none";
            return;
        }
        (await this.window.getHtmlElement("statusText")).innerText = "IDK Man";
        (await this.window.getHtmlElement("list")).style.display = "";
        (await this.window.getHtmlElement("status")).style.display = "none";

        for (let i = 0; i < dat.length; i++) {
            const app = dat[i];

            var div = this.makeAppButton(app, false);
            div.setAttribute("appName", app.title)
            div.setAttribute("appAuthor", app.user)

            div.onclick = this.appInfoWindow.bind(this, app);

            list.appendChild(div)
        }
    }

    async loadSearch() {
        var list = (await this.window.getHtmlElement("search"));
        list.innerHTML = "";

        (await this.window.getHtmlElement("statusText")).innerText = "Searching for \"" + this.search + "\"...";
        (await this.window.getHtmlElement("errorX")).style.display = "none";
        (await this.window.getHtmlElement("loadingSpinner")).style.display = "";
        (await this.window.getHtmlElement("status")).style.display = "flex";
        try {
            if (this.search != undefined && this.search != "") {
                var dat = await System.network.fetch("https://flulu-app-gen.floriprolohner.repl.co/api/search/" + this.search);
                dat = await dat.json();
            } else {
                var dat = await System.network.fetch("https://flulu-app-gen.floriprolohner.repl.co/api/list?r" + Math.round(Math.random() * 1000000))
                dat = await dat.json();
            }
        } catch {
            (await this.window.getHtmlElement("statusText")).innerText = "Error while loading apps";
            (await this.window.getHtmlElement("errorX")).style.display = "";
            (await this.window.getHtmlElement("loadingSpinner")).style.display = "none";
            return;
        }
        (await this.window.getHtmlElement("statusText")).innerText = "IDK Man";
        (await this.window.getHtmlElement("search")).style.display = "";
        (await this.window.getHtmlElement("status")).style.display = "none";


        var p = document.createElement("p");
        p.style.fontSize = "30px";
        p.style.paddingTop = "20px";
        p.innerText = "Search for '" + this.search + "'";
        list.appendChild(p);

        var d = document.createElement("div");
        d.style.height = "10px";
        d.style.width = "100%";
        d.style.backgroundColor = "transparent";
        d.style.borderBottom = "1px solid #000000";
        list.appendChild(d);


        for (let i = 0; i < dat.length; i++) {
            const app = dat[i];

            var div = this.makeAppButton(app, false);
            div.setAttribute("appName", app.title)
            div.setAttribute("appAuthor", app.user)

            div.onclick = this.appInfoWindow.bind(this, app);

            list.appendChild(div)
        }
        if (dat.length == 0) {
            (await this.window.getHtmlElement("search")).innerText = "'" + this.search + "' gave no results!";
        }
    }

    async getHomeApps() {
        try {
            var dat = await System.network.fetch("https://flulu-app-gen.floriprolohner.repl.co/api/home")
            dat = await dat.json();
        } catch {
            (await this.window.getHtmlElement("statusText")).innerText = "Error while loading apps";
            (await this.window.getHtmlElement("errorX")).style.display = "";
            (await this.window.getHtmlElement("loadingSpinner")).style.display = "none";
            return;
        }
        (await this.window.getHtmlElement("statusText")).innerText = "OK";
        (await this.window.getHtmlElement("store")).style.display = "";
        (await this.window.getHtmlElement("status")).style.display = "none";

        //load featured
        for (let i = 0; i < dat["Featured"].length; i++) {
            const app = dat["Featured"][i];

            var div = this.makeAppButton(app, true);
            div.setAttribute("appName", app.title)
            div.setAttribute("appAuthor", app.user)

            div.onclick = this.appInfoWindow.bind(this, app);

            (await this.window.getHtmlElement("featuredProjects")).appendChild(div)
        }
        (await this.window.getHtmlElement("featuredProjects")).style.width = "calc(100% * " + dat["Featured"].length + ")";

        var scrollId = 0;
        var wait = false;
        this.setInterval(async () => {
            if (wait) {
                wait = false;
                return;
            }
            var div = (await this.window.getHtmlElement("featuredWrapper"));
            var fp = (await this.window.getHtmlElement("featuredProjects"));
            scrollId++;
            if (scrollId >= dat["Featured"].length) {
                scrollId = 0;
            }
            div.scrollTo({
                left: scrollId * div.offsetWidth,
                behavior: 'smooth'
            })
        }, 2000)
        this.window.onResize = async () => {
            var div = (await this.window.getHtmlElement("featuredWrapper"));

            div.scrollTo({
                left: scrollId * div.offsetWidth
            })
        }

        (await this.window.getHtmlElement("featuredWrapper")).onmouseup = async () => {
            var div = (await this.window.getHtmlElement("featuredWrapper"));
            var fp = (await this.window.getHtmlElement("featuredProjects"));
            scrollId = Math.round(div.scrollLeft / div.offsetWidth);
            div.scrollTo({
                left: scrollId * div.offsetWidth,
                behavior: 'smooth'
            });
        }

        (await this.window.getHtmlElement("featuredWrapper")).onscroll = async () => {
            wait = true;
        }



        //load new
        for (let i = 0; i < dat["New"].length; i++) {
            const app = dat["New"][i];

            var div = this.makeAppButton(app);
            div.setAttribute("appName", app.title)
            div.setAttribute("appAuthor", app.user)

            div.onclick = this.appInfoWindow.bind(this, app);

            (await this.window.getHtmlElement("newProjects")).appendChild(div)
        }
    }

    async appInfoWindow(app) {

        /**
         * @type {HtmlWindow}
         */
        var window = await SystemHtml.WindowHandler.createWindow("App Information", async () => {
            await window.setContent((await SystemFileSystem.getFileString(this.PATH.folder() + "/appinfo.html")).replaceAll("{{windowId}}", window.getId()));

            await window.size.setInnerSize(960, 640);
            window.size.userCanResize(true);

            (await window.getHtmlElement("loadedInformation")).style.display = "none";

            try {
                var dat = await System.network.fetch("https://flulu-app-gen.floriprolohner.repl.co/api/program/" + app.title);
                dat = await dat.json();
            } catch {
                SystemHtml.WindowHandler.presets.createInformation("Error", "Error while checking App Information");
            }

            var url = dat["path"];
            var name = dat["title"];
            var author = dat["user"];
            var version = dat["version"];
            var description = dat["description"];

            (await window.getHtmlElement("loader")).style.display = "none";
            (await window.getHtmlElement("loadedInformation")).style.display = "";

            (await window.getHtmlElement("title")).innerText = name;
            (await window.getHtmlElement("author")).innerText = author;
            (await window.getHtmlElement("version")).innerText = version;
            (await window.getHtmlElement("description")).innerText = description;

            (await window.getHtmlElement("install")).onclick = async () => {
                System.program.easyPackageUrlInstall(url, name, true, version);
            }

            //backgroundImg
            //logoImg

            if (dat["imgBanner"] != null && dat["imgBanner"] != "") {
                (await window.getHtmlElement("backgroundImg")).setAttribute("src", dat["imgBanner"]);
            } else {
                SystemFileSystem.getFileString("c/user/backgrounds/background2.jpg").then(async (res) => {
                    (await window.getHtmlElement("backgroundImg")).setAttribute("src", SystemFileSystem.toImg(res));
                })
            }


            var img = (await window.getHtmlElement("logoImg"));
            var imgWrapper = (await window.getHtmlElement("imgWrapper"));
            img.width = "100";
            img.height = "100";
            if (app.imgLogo != null && app.imgLogo != "") {
                var loaderImg = document.createElement("img");
                loaderImg.setAttribute("imgsrc", this.PATH.folder() + "/loader2.svg");
                loaderImg.setAttribute("width", "100px");
                loaderImg.setAttribute("height", "100px");
                loaderImg.setAttribute("element", "loaderImg")

                var div6 = document.createElement("div")
                div6.className = "projectImageOverlay"
                imgWrapper.appendChild(div6)

                window.parseNewHtml();
                imgWrapper.appendChild(loaderImg);

                img.style.display = "none";

                System.network.fetch(app.imgLogo + "?r=" + Math.round(Math.random() * 1000000)).then(async (res) => {
                    img.setAttribute("src", await res.text())
                    img.style.display = "";
                    loaderImg.remove();
                    div6.remove();
                })
            } else {
                img.setAttribute("imgsrc", "c/programs/store/red-x-line-icon.svg")
            }
        });
    }



    makeAppButton(app, featured = false) {
        var div = document.createElement("div")
        div.className = "project"

        var div2 = document.createElement("div")
        div2.className = "projectImage"
        div.appendChild(div2)

        var img = document.createElement("img")
        div2.appendChild(img)
        if (featured) {
            img.style.width = "100%";
            img.style.maxHeight = "none";
            img.style.maxWidth = "none";

            if (app.imgBanner != null && app.imgBanner != "") {
                img.setAttribute("src", app.imgBanner)
            } else {
                if (app.imgLogo != null && app.imgLogo != "") {
                    img.setAttribute("imgsrc", "c/programs/store/loader2.svg")
                    var div6 = document.createElement("div")
                    div6.className = "projectImageOverlay"
                    div2.appendChild(div6)

                    System.network.fetch(app.imgLogo + "?r=" + Math.round(Math.random() * 1000000)).then(async (res) => {
                        img.setAttribute("src", await res.text())
                        img.style.width = "";
                        img.style.height = "100%";
                        div6.remove();
                    })
                } else {
                    img.setAttribute("imgsrc", "c/user/backgrounds/background2.jpg")
                }
            }
        } else {
            if (app.imgLogo != null && app.imgLogo != "") {
                img.setAttribute("imgsrc", "c/programs/store/loader2.svg")
                var div6 = document.createElement("div")
                div6.className = "projectImageOverlay"
                div2.appendChild(div6)

                System.network.fetch(app.imgLogo + "?r=" + Math.round(Math.random() * 1000000)).then(async (res) => {
                    img.setAttribute("src", await res.text())
                    div6.remove();
                })
            } else {
                img.setAttribute("imgsrc", "c/programs/store/red-x-line-icon.svg")
            }
        }

        var div3 = document.createElement("div")
        div3.className = "projectInfo"
        div.appendChild(div3)

        var h3 = document.createElement("h3")
        h3.className = "projectTitle"
        h3.innerText = app.title
        div3.appendChild(h3)

        var div4 = document.createElement("div")
        div4.className = "projectDescription"
        div4.innerText = "No description"
        div4.style.color = "gray";
        div3.appendChild(div4)

        var div5 = document.createElement("div")
        div5.className = "projectAuthor"
        div5.innerText = app.user
        div3.appendChild(div5)

        if (featured) {
            //make width 100%
            div.style.width = "100%";
        }

        return div;
    }
}
new program();