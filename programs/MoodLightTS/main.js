class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.window = await SystemHtml.WindowHandler.createWindow("Moodlight",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")
                
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(320, 400)
                await this.window.size.userCanResize(true)

                //add event listeners
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
}
new program();