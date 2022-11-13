class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.packages = ["programs/programs.json"];

        /**
         * @type HtmlWindow
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Store",
            //onready:
            async () => {
                //set html
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
                data[y] = p[y];
            }
        }

        var programdiv = await this.window.getHtmlElement("programs");
        programdiv.innerHTML = "";

        for (var x of Object.keys(data)) {
            var but = document.createElement("button");
            but.setAttribute("element", "button_" + x);
            but.innerText = x;
            programdiv.append(but)
            this.window.parseNewHtml();
            this.window.addHtmlEventListener("click", "button_" + x, this.installProgram, this, data[x]);
        }
    }
    async installProgram(_, __, programUrl) {
        var ps = programUrl.split("/");
        var programName = "";
        if (ps[ps.length - 1] != "") {
            programName = ps[ps.length - 1];
        } else if (ps[ps.length - 2] != "") {
            programName = ps[ps.length - 2];
        } else {
            SystemHtml.WindowHandler.presets.createInformation("could not find program name for installation");
            return;
        }

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