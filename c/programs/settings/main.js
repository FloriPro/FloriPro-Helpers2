class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Settings",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")
                
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(520, 400);
                this.window.size.userCanResize(true);

                System.network.fetch("version", { cache: "no-store" }).then(async (response) => {
                    var v = await response.text()
                    if (v == VERSION) {
                        (await this.window.getHtmlElement("checkForUpdate")).innerText = "Newest version! ";
                        (await this.window.getHtmlElement("updateVersions")).innerText = VERSION;
                    } else {
                        (await this.window.getHtmlElement("checkForUpdate")).innerText = "Update available! ";
                        (await this.window.getHtmlElement("updateVersions")).innerText = VERSION + " -> " + v;
                    }
                })

                await this.loadSettings();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async createEvents() {
        await this.window.addHtmlEventListener("click", "updates", async () => {
            await await System.run("c/programs/settings/update.js");
            
            (await this.window.getHtmlElement("checkForUpdate")).innerText = "Newest version!";
            (await this.window.getHtmlElement("updateVersions")).innerText = "";
            await delay(1000);
        }, this)

        await this.window.addHtmlEventListener("click", "editDesktop", async () => {
            await System.program.runProgram(this.PATH.folder() + "/desktop.js")
        }, this);
    }


    async loadSettings() {
        await this.window.removeAllEventListeners();
        await this.createEvents();

        //load settings
        var s = await System.options.get("settings")
        var l = await this.window.getHtmlElement("settingsList")
        l.innerHTML = "";

        var i = 0;
        for (var x of Object.keys(s)) {
            var b = document.createElement("button")
            b.innerText = x + ": " + s[x][0];
            b.setAttribute("element", i + "")
            l.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "", this.changeSetting, this, [x, i])

            i++;
        }
    }
    async changeSetting(_, __, vars) {
        var setting = vars[0]
        var s = await System.options.get("settings")


        var o = "";
        if (s[setting][1] == "file")
            o = await SystemHtml.WindowHandler.presets.createFileSelect("Select File")
        if (s[setting][1] == "number")
            o = parseInt(await SystemHtml.WindowHandler.presets.createNumSelect());
        if (s[setting][1] == "string")
            o = await SystemHtml.WindowHandler.presets.createStringSelect()
        if (s[setting][1] == "bool") {
            o = !s[setting][0];
        }

        if (o == undefined) {
            await this.loadSettings();
            return;
        }

        await System.options.addValue("settings", setting, [o, s[setting][1]], true);
        System.settings.settingUpdated(setting);
        await this.loadSettings();
    }
}
new program();