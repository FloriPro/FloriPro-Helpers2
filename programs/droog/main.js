class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Pong",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")
                
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setInnerSize(960, 640);
                this.window.size.userCanResize(true);

            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
}
new program();