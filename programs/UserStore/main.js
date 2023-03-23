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

                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setInnerSize(960, 640);
                this.window.size.userCanResize(true);

                this.getApps();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async getApps() {
        try {
            dat = await System.network.fetch("https://flulu-app-gen.floriprolohner.repl.co/api/list")
            dat = await dat.json();
        } catch {
            (await this.window.getHtmlElement("status")).innerText = "Error while loading apps"
        }

        for (let i = 0; i < dat.length; i++) {
            const app = dat[i];

            var button = document.createElement("button")
            button.innerText = app.title + " by " + app.user

            button.setAttribute("appName", app.title)
            button.setAttribute("appAuthor", app.user)

            button.onclick = async () => {
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

                var window = await SystemHtml.WindowHandler.createWindow("App Information", async () => {
                    await window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/appinfo.html"));

                    await window.size.setInnerSize(960, 640);
                    window.size.userCanResize(true);

                    (await window.getHtmlElement("title")).innerText = name;
                    (await window.getHtmlElement("author")).innerText = author;
                    (await window.getHtmlElement("version")).innerText = version;
                    (await window.getHtmlElement("description")).innerText = description;

                    (await window.getHtmlElement("install")).onclick = async () => {
                        System.program.easyPackageUrlInstall(url, name, true, version);
                    }
                });
            }

            (await this.window.getHtmlElement("apps")).appendChild(button)
        }
    }
}
new program();