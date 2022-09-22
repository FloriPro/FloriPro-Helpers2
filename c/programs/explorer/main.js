class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.path = "c";
        this.button1Clicks = 0;
        this.windowUserCanResize = true;
        this.windowShowTitle = false;

        console.log("started as id " + this.id);
        this.window = await SystemHtml.WindowHandler.createWindow("Explorer",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(250, 300)
                await this.window.size.userCanResize(true)

                //create buttons/events
                this.create();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async create() {
        await this.window.removeAllEventListeners();
        await this.window.addHtmlEventListener("click", "back", this.back, this)



        var folderStuff = await this.window.getHtmlElement("folderList")
        folderStuff.innerHTML = "";
        var fileStuff = await this.window.getHtmlElement("fileList")
        fileStuff.innerHTML = "";

        var i = 0
        for (var x of await SystemFileSystem.getFolders(this.path)) {
            var b = document.createElement("button")
            b.innerText = x + "/";
            b.setAttribute("element", i + "_el")
            folderStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button1, this, [x, i])
            i++;
        }
        for (var x of await SystemFileSystem.getFiles(this.path)) {
            var b = document.createElement("button")
            b.innerText = x;
            b.setAttribute("element", i + "_el")
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
}
new program();