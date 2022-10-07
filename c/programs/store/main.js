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
        var l = await SystemHtml.WindowHandler.presets.createLoading("Downloading Program", "Downloading " + programName);
        var pdata = await (await System.network.fetch("programs/" + programName + ".json")).text();
        await l.setNum(25);

        await SystemFileSystem.loadPackage(pdata);
        await l.setNum(50);

        var location = await SystemFileSystem.getFileString("c/_temp/installLocation.dat");
        await SystemFileSystem.moveInFolder("c/_temp", location);
        await l.setNum(75);
        await System.run(location + "/install.js");
        await l.setNum(100);

        setTimeout(() => { l.stop(); }, 250);
    }
}
new program();