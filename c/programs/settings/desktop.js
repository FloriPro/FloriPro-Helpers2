class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.editors = [];
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Edit Desktop | Settings",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/editDesktop.html"));
                await this.window.size.setSize(520, 400);
                this.window.size.userCanResize(true);

                await this.update();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async update() {
        this.window.removeAllEventListeners();

        await this.window.addHtmlEventListener("click", "addDElement", async () => {
            var file = await SystemHtml.WindowHandler.presets.createFileSelect("File to run");
            if (file == undefined) {
                return;
            }
            var icon = await SystemHtml.WindowHandler.presets.createFileSelect("File to display as image (cancel for default image)");
            var name = await SystemHtml.WindowHandler.presets.createStringSelect("Name", "Name of the link");
            if (name == "" || name == undefined) {
                name = "unnamed";
            }

            var d = (await System.options.get("desktop")).all;
            d.push({
                name: name,
                icon: icon,
                run: file,
                position: [100, 100]
            })
            await System.options.addValue("desktop", "all", d, true);

            this.loadStatus();
            await SystemHtml.desktop.buildDesktop()
        }, this)

        await this.loadStatus()
    }

    async loadStatus() {
        (await this.window.getHtmlElement("dElements")).innerHTML = "";
        var all = (await System.options.get("desktop")).all
        var dElements = await this.window.getHtmlElement("dElements");

        var i = 0;

        for (var x of all) {
            var b = document.createElement("button");
            b.innerText = x.name;
            b.setAttribute("element", i + "_el")

            dElements.append(b);
            i++;
        }
        await this.window.parseNewHtml();

        //add events
        var i = 0;
        for (var x of all) {
            await this.window.addHtmlEventListener("click", i + "_el", (i) => {
                var e = new editDesktopElement(i[1], this.PATH);
                e.remove = () => {
                    //close all other windows
                    for (var x of this.editors) {
                        x.window.remove();
                    }

                    this.editors = [];

                    SystemHtml.desktop.buildDesktop()
                    this.update();
                }
                e.update = () => {
                    SystemHtml.desktop.buildDesktop()
                    this.update();
                }
                e.close = () => {
                    //remove from array
                    delete this.editors[e];
                }
                this.editors.push(e);
            }, this, i);
            i++;
        }
    }
}
class editDesktopElement {
    constructor(id, PATH) {
        this.PATH = PATH;
        this.id = id;
        console.log(this.id);
        this.init();

        this.close = () => { };
        this.remove = () => { };
        this.update = () => { };
    }
    async init() {
        this.el = (await System.options.get("desktop")).all[this.id];
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow(this.el.name + " | Edit Desktop | Settings",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/editDesktopElement.html"));
                await this.window.size.setSize(520, 400);
                this.window.size.userCanResize(true);

                await this.createEvents();
            });
        this.window.close = () => {
            this.close();
            return true
        }
    }

    async createEvents() {
        this.window.addHtmlEventListener("click", "remove", async () => {
            console.log("remove")
            var d = (await System.options.get("desktop")).all;
            d.splice(this.id, 1);
            await System.options.addValue("desktop", "all", d, true);
            this.remove();
            await this.window.close();
        }, this);
        this.window.addHtmlEventListener("click", "changeName", async () => {
            console.log("changeName")
            this.el.name = await SystemHtml.WindowHandler.presets.createStringSelect("new name", "new name for desktop element");
            this.save();
        }, this);
        this.window.addHtmlEventListener("click", "changeImage", async () => {
            console.log("changeImage")
            this.el.icon = await SystemHtml.WindowHandler.presets.createFileSelect("new icon");
            this.save();
        }, this);
        this.window.addHtmlEventListener("click", "changeRun", async () => {
            console.log("changeRun")
            this.el.run = await SystemHtml.WindowHandler.presets.createFileSelect("new run");
            this.save();
        }, this);
        this.window.addHtmlEventListener("click", "resetPosition", async () => {
            console.log("resetPosition")
            this.el.position = [100, 100];
            this.save();
        }, this);
    }

    async save() {
        var d = (await System.options.get("desktop")).all;
        d[this.id] = this.el;
        await System.options.addValue("desktop", "all", d, true);
        this.update();
    }
}

new program();