class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init(file) {

        this.window = await SystemHtml.WindowHandler.createWindow("Image Viewer",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                //await this.window.size.htmlSizing();
                await this.window.size.setSize(400, 300)
                await this.window.size.userCanResize(true)

                //add event listeners
                await this.window.addHtmlEventListener("click", "button1", this.button1, this)
                await this.window.addHtmlEventListener("click", "minimal", this.minimal, this)
                await this.window.addHtmlEventListener("click", "img", this.imgClick, this)
                //await this.window.addHtmlEventListener("click", "button2", this.button2, this)

                if (file != undefined) {
                    var ig = await this.window.getHtmlElement("img");
                    var str = SystemFileSystem.toImg(await SystemFileSystem.getFileString(file));
                    ig.src = str;
                }
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async button2() {
        var size = await SystemHtml.WindowHandler.presets.createNumSelect("Select", "select the percentage (%)");
        var img = await this.window.getHtmlElement("img")
        img.style.zoom = size + "%";
    }
    async button1() {
        var img = await SystemHtml.WindowHandler.presets.createFileSelect();
        var ig = await this.window.getHtmlElement("img");
        var str = SystemFileSystem.toImg(await SystemFileSystem.getFileString(img));
        ig.src = str;
    }
    async minimal() {
        (await this.window.getHtmlElement("buttons")).style.display = "none";
        await this.window.size.userCanResize(false);
        await this.window.appearence.showTitle(false);
        this.window.getHtml().style.background = "transparent";
        this.window.getHtml().style.boxShadow = "0px 0px 0px #00000000";
    }
    async imgClick() {
        (await this.window.getHtmlElement("buttons")).style.display = "flex";
        await this.window.size.userCanResize(true);
        await this.window.appearence.showTitle(true);
        this.window.getHtml().style.background = ""
        this.window.getHtml().style.boxShadow = "0px 0px 30px #00000024";
    }
}
new program();