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
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(410, 400);
                this.window.size.userCanResize(true);

                //add contextScript
                (await this.window.getHtmlElement("allInFolder")).contextscript = (att) => {
                    return {}
                }

                //create buttons/events
                this.create();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async events() {
        await this.window.addHtmlEventListener("click", "back", this.back, this);
        await this.window.addHtmlEventListener("click", "newFile", this.newFile, this);
        await this.window.addHtmlEventListener("click", "newFolder", this.newFolder, this);
        await this.window.addHtmlEventListener("click", "reload", this.create, this);
        await this.window.addHtmlEventListener("click", "uploadFile", this.uploadFile, this);
        await this.window.addHtmlEventListener("change", "file-selector", this.fileSelected, this);

    }
    async create() {
        (await this.window.getHtmlElement("path")).innerText = this.path;

        await this.window.removeAllEventListeners();
        await this.events();


        this.odFiles = [];
        var folderStuff = await this.window.getHtmlElement("folderList")
        folderStuff.innerHTML = "";
        var fileStuff = await this.window.getHtmlElement("fileList")
        fileStuff.innerHTML = "";

        var i = 0
        for (var x of await SystemFileSystem.getFolders(this.path)) {
            var b = document.createElement("button")
            b.innerText = x + "/";
            b.setAttribute("element", i + "_el")
            b.setAttribute("path", this.path + "/" + x);
            b.setAttribute("program", this.id)
            b.contextscript = () => { return { "remove Folder": this.removeF, "rename Folder": this.renameF } };
            folderStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button1, this, [x, i])
            i++;
        }
        for (var x of await SystemFileSystem.getFiles(this.path)) {
            var b = document.createElement("button")
            b.innerText = x;
            this.odFiles[x] = await (await SystemFileSystem.getFile(this.path + "/" + x)).getOnlineDataLink()
            b.setAttribute("path", this.path + "/" + x);
            b.setAttribute("element", i + "_el")
            b.setAttribute("program", this.id)
            b.contextscript = (target) => {
                var r = {
                    "remove File": this.removeFi, "rename File": this.renameFi, "run": async (event) => {
                        var response = await System.run(event.target.getAttribute("path"));
                        if (response != undefined) {
                            SystemHtml.WindowHandler.presets.createInformation("run responded:", response);
                        }
                    }, "run as Program": (event) => {
                        System.program.runProgram(event.target.getAttribute("path"));
                    }
                };
                if (this.odFiles[target.getAttribute("path").split("/")[target.getAttribute("path").split("/").length - 1]] != undefined) {
                    r["get Link"] = async (event) => {
                        SystemHtml.WindowHandler.presets.createInformation("Link", await (await SystemFileSystem.getFile(event.target.getAttribute("path"))).getOnlineDataLink());
                    }
                }
                return r;
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
        await SystemFileSystem.setFileString(this.path + "/" + fileName, "")
        await this.create();
    }
    async newFolder() {
        var folderName = await SystemHtml.WindowHandler.presets.createStringSelect("Folder Name", "Please put in the new Folder name");
        if (folderName == undefined) { return }
        SystemFileSystem.createFolder(this.path, folderName)
        await this.create();
    }
    async removeF(event) {
        SystemFileSystem.removeFolder(event.target.getAttribute("path"))
        System.program.get(parseInt(event.target.getAttribute("program"))).create();
    }
    async renameF(event) {
        console.warn("todo: renameF");
        System.program.get(parseInt(event.target.getAttribute("program"))).create();
    }
    async removeFi(event) {
        await SystemFileSystem.removeFile(event.target.getAttribute("path"))
        System.program.get(parseInt(event.target.getAttribute("program"))).create();
    }
    async renameFi(event) {
        var p = new System.path(event.target.getAttribute("path"));
        await SystemFileSystem.setFileString(p.folder() + "/" + await SystemHtml.WindowHandler.presets.createStringSelect("File Name", "New File Name for " + p.file() + " Here"), await SystemFileSystem.getFileString(event.target.getAttribute("path")));
        await SystemFileSystem.removeFile(event.target.getAttribute("path"))

        System.program.get(parseInt(event.target.getAttribute("program"))).create();
    }
    async uploadFile(event) {
        var path = this.path;
        var t = this;
        var fileSelector = await this.window.getHtmlElement("file-selector");
        fileSelector.onchange = (event) => {
            const fileList = event.target.files;
            var reader = new FileReader();
            reader.readAsArrayBuffer(fileList[0], "UTF-8");
            reader.onload = async function (evt) {
                await SystemFileSystem.setFileString(path + "/" + event.target.value.split('\\')[event.target.value.split('\\').length - 1], await SystemFileSystem.bufferToString(evt.target.result));
                t.create();
            }
            reader.onerror = function (evt) {
                SystemHtml.WindowHandler.presets.createInformation("could not load file!");
            }
        };
        fileSelector.click();
    }
}
new program();