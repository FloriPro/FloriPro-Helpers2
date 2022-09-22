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
        this.window = await SystemHtml.WindowHandler.createWindow("test",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(200, 300)
                await this.window.size.userCanResize(false)

                //add event listeners
                await this.window.addHtmlEventListener("click", "button1", this.button1, this)
                await this.window.addHtmlEventListener("click", "button2", () => { this.window.size.userCanResize(this.windowUserCanResize); this.windowUserCanResize = !this.windowUserCanResize; }, this)
                await this.window.addHtmlEventListener("click", "button3", () => { this.window.appearence.showTitle(this.windowShowTitle); this.windowShowTitle = !this.windowShowTitle; }, this)
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async button1() {
        this.button1Clicks = this.button1Clicks + 1;
        var e = await this.window.getHtmlElement("button1return")
        e.innerText = "" + this.button1Clicks;
        console.log("button1 pressed!");
    }
}
new program();