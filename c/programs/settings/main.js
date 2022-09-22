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
        this.window = await SystemHtml.WindowHandler.createWindow("Settings",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(200, 300)
                await this.window.size.userCanResize(true)
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
}
new program();