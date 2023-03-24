class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.packages = ["programs/_.json"];

        /**
         * @type HtmlWindow
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Store",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                this.window.addHtmlEventListener("click", "import", async () => {
                    var i = await SystemHtml.WindowHandler.presets.createStringSelect("import", "Put url for programs here");
                    if (i != undefined) {
                        this.packages.push(i);
                        this.loadStore();
                    }
                }, this);
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
        var data = {}
        for (var x of this.packages) {
            var p = await (await System.network.fetch(x)).json();
            for (var y of Object.keys(p)) {
                if (p[y].hidden) continue;
                data[y] = p[y];
                data[y]["name"] = y
            }
        }

        var programdiv = await this.window.getHtmlElement("programs");
        programdiv.innerHTML = "";

        for (var x of Object.keys(data)) {
            var but = document.createElement("button");
            but.setAttribute("element", "button_" + x);
            but.innerText = data[x]["displayname"];
            programdiv.append(but)
            this.window.parseNewHtml();
            this.window.addHtmlEventListener("click", "button_" + x, this.installProgram, this, data[x]);
        }
    }
    async installProgram(_, __, program) {
        var l = await SystemHtml.WindowHandler.presets.createLoading("Installing", "Downloading " + program["name"]);

        //check if allready installed
        if (await System.program.installed(program["name"])) {
            var r = await SystemHtml.WindowHandler.presets.createConfirm("Allready installed", "This is already installed do you want to continue?");
            if (!r) {
                l.stop();
                return;
            }
        }
        var pdata = await (await System.network.fetch(program["path"])).text();
        System.program.installPackage(pdata, true, l, undefined, program["name"], false, program["version"]);
    }
}
new program();