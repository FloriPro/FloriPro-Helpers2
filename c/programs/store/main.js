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
        /**
         * @type HtmlWindow
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Store",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(500, 300)
                await this.window.size.userCanResize(true)

                await this.loadStore();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async loadStore() {
        var data = await (await System.network.fetch("programs/programs.json")).json();
        var programdiv = await this.window.getHtmlElement("programs");

        for (var x of data) {
            var but = document.createElement("button");
            but.setAttribute("element", "button_" + x);
            but.innerText = x;
            programdiv.append(but)
            this.window.parseNewHtml();
            this.window.addHtmlEventListener("click", "button_" + x, this.installProgram, this, x);
        }
    }
    async installProgram(_, __, programName) {
        var l = await SystemHtml.WindowHandler.presets.createLoading("Installing", "Downloading " + programName);

        //check if allready installed
        if (await System.program.installed(programName)) {
            var r = await SystemHtml.WindowHandler.presets.createConfirm("Allready installed", "This is already installed do you want to continue?");
            if (!r) {
                l.stop();
                return;
            }
        }

        var pdata = await (await System.network.fetch("programs/" + programName + ".json")).text();
        System.program.installPackage(pdata, true, l, undefined, programName);
    }
}
new program();