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
                await this.window.setContentIframe(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setInnerSize(960, 640);
                await this.window.size.userCanResize(false);

                this.setInterval(this.check, 200);
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async check() {
        var ifr = (await this.window.getHtmlElement("autogenIframe"))
        ifr.contentWindow.changeFocus(ifr == document.activeElement)
    }
}
new program();