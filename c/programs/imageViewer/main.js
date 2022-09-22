class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        console.log("started as id " + this.id);
        this.window = await SystemHtml.WindowHandler.createWindow("Image Viewer",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.htmlSizing();
                await this.window.size.userCanResize(false)

                //add event listeners
                await this.window.addHtmlEventListener("click", "button1", this.button1, this)
                await this.window.addHtmlEventListener("click", "button2", this.button2, this)
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
        var str = "data:image/png;base64," + btoa(await SystemFileSystem.getFileString(img))
        ig.src = str;
    }
}
new program();