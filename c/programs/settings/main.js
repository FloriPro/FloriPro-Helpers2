class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.button1Clicks = 0;
        this.windowUserCanResize = true;
        this.windowShowTitle = false;

        console.log("started as id " + this.id);
        this.window = await SystemHtml.WindowHandler.createWindow("Settings",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(500, 300)
                await this.window.size.userCanResize(true)

                await this.loadSettings();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async loadSettings() {
        await this.window.removeAllEventListeners();

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
            o = await SystemHtml.WindowHandler.presets.createNumSelect()
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