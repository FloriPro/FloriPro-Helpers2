class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("test",
            //onready:
            async () => {
                //set html
                await this.window.setContentIframe(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(200, 300);
                await this.window.size.showOverflow(false);
                this.window.size.userCanResize(true);

                
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
}
new program();