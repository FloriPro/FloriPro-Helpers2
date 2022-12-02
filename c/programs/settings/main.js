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
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(520, 400);
                this.window.size.userCanResize(true);

                System.network.fetch("version").then(async (response) => {
                    var v = await response.text()
                    if (v == VERSION) {
                        (await this.window.getHtmlElement("checkForUpdate")).innerText = "Newest version!";
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
            var information = await SystemHtml.WindowHandler.presets.createLoading("Updating", "Verifying...");

            var nv = await (await System.network.fetch("version")).text();
            if (nv == VERSION) {
                if (await SystemHtml.WindowHandler.presets.createConfirm("Error", "You currently have the latest version! (NO to update nevertheless)")) {
                    information.stop();
                    return;
                }
            }

            if (!await SystemHtml.WindowHandler.presets.createConfirm("Update?", "all files in c/sys and c/programs that are shipped with this website will be replaced. This includes your changes you made to them!")) {
                information.stop();
                return;
            }

            information.setNum(5);
            information.setText("Connecting...");

            var con = await System.network.fetch("filesys.json");
            information.setNum(10);
            information.setText("Downloading...");
            var txt = await con.text();

            information.setNum(50);
            information.setText("Applying changes");

            var dat = JSON.parse(txt);
            var pf = await SystemFileSystem.getFileJson("c/persistandFiles.json");
            await this.asyncUpdateFiles(dat["sys"], "c/sys", pf)
            await this.asyncUpdateFiles(dat["programs"], "c/programs", pf)

            VERSION = nv;

            var r = async () => {
                if (await SystemHtml.WindowHandler.presets.createConfirm("Reload?", "A reload is suggested. Would you like to reload?")) {
                    location.reload();
                }
            }; r();

            information.setNum(100);
            information.setText("Updated!");
            (await this.window.getHtmlElement("checkForUpdate")).innerText = "Newest version!";
            (await this.window.getHtmlElement("updateVersions")).innerText = "";
            await delay(1000);
            information.stop();
        }, this)
    }

    /**
     * 
     * @param {*} dat 
     * @param {string} path 
     * @param {*} persistandFiles 
     */
    async asyncUpdateFiles(dat, path, persistandFiles) {
        for (var x of Object.keys(dat)) {
            if (x.includes(".")) {
                if (!persistandFiles.includes(path + "/" + x) && !path.startsWith("c/sys/options")) {
                    console.log("update " + path + "/" + x);
                    await SystemFileSystem.setFileString(path + "/" + x, this.b64_to_utf8(dat[x]));
                }
            } else {
                this.asyncUpdateFiles(dat[x], path + "/" + x, persistandFiles);
            }
        }
    }
    b64_to_utf8(str) {
        try {
            str = str.replace(/\s/g, '');
            return decodeURIComponent(escape(window.atob(str)));
        } catch {
            return window.atob(str);
        }
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