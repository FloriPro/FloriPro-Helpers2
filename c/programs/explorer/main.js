class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.path = "c";


        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Explorer",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(260, 300)
                await this.window.size.userCanResize(true)

                //create buttons/events
                this.create();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async events() {
        await this.window.addHtmlEventListener("click", "back", this.back, this)
        await this.window.addHtmlEventListener("click", "newFile", this.newFile, this)
        await this.window.addHtmlEventListener("click", "newFolder", this.newFolder, this)
        await this.window.addHtmlEventListener("click", "reload", this.create, this)

    }
    async create() {
        (await this.window.getHtmlElement("path")).innerText = this.path;

        await this.window.removeAllEventListeners();
        await this.events();


        var folderStuff = await this.window.getHtmlElement("folderList")
        folderStuff.innerHTML = "";
        var fileStuff = await this.window.getHtmlElement("fileList")
        fileStuff.innerHTML = "";

        var i = 0
        for (var x of await SystemFileSystem.getFolders(this.path)) {
            var b = document.createElement("button")
            b.innerText = x + "/";
            b.setAttribute("element", i + "_el")
            b.contextscript = () => { return { "remove Folder": this.removeF, "rename Folder": this.renameF } };
            folderStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button1, this, [x, i])
            i++;
        }
        for (var x of await SystemFileSystem.getFiles(this.path)) {
            var b = document.createElement("button")
            b.innerText = x;
            b.setAttribute("path", this.path + "/" + x);
            b.setAttribute("element", i + "_el")
            b.contextscript = () => {
                return {
                    "remove File": this.removeFi, "rename File": this.renameFi, "run": async (event) => {
                        var response = await System.run(event.target.getAttribute("path"));
                        if (response != undefined) {
                            SystemHtml.WindowHandler.presets.createInformation("run responded:", response);
                        }
                    }, "run as Program": (event) => {
                        System.program.runProgram(event.target.getAttribute("path"));
                    }
                }
            };
            fileStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button2, this, [x, i])
            i++;
        }
    }

    async button1(_, __, vars) {
        this.path += "/" + vars[0];
        this.create()
    }
    async button2(_, __, vars) {
        System.open(this.path + "/" + vars[0])
    }
    async back() {
        var p = this.path.split("/")
        var p = p.slice(0, -1);
        if (p.length == 0) {
            p = ["c"];
        }
        this.path = p.join("/");
        this.create()
    }
    async newFile() {
        var fileName = await SystemHtml.WindowHandler.presets.createStringSelect("File Name", "Please put in the new File name");
        if (fileName == undefined) { return }
        SystemFileSystem.createFile(this.path + "/" + fileName)
        await this.create();
    }
    async newFolder() {
        var folderName = await SystemHtml.WindowHandler.presets.createStringSelect("Folder Name", "Please put in the new Folder name");
        if (folderName == undefined) { return }
        SystemFileSystem.createFolder(this.path, folderName)
        await this.create();
    }
    async removeF() {
        console.warn("todo: removeF");
    }
    async renameF() {
        console.warn("todo: renameF");
    }
    async removeFi() {
        console.warn("todo: removeFi");
    }
    async renameFi() {
        console.warn("todo: renameFi");
    }
}
new program();