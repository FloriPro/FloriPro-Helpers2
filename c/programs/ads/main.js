class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("advertisement",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setInnerSize(200, 200)
                await this.window.size.disableOverflow()
                eval((adsbygoogle = window.adsbygoogle || []).push({}));
                this.window.size.userCanResize(false)

            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
}
new program();