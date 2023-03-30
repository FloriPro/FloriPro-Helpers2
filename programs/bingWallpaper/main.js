class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Bing Wallpaper",
            //onready:
            async () => {
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(320, 400)
                this.window.size.userCanResize(true)

                //add event listeners
                this.window.addHtmlEventListener("click", "changeResolution", async () => {
                    var res = await SystemHtml.WindowHandler.presets.createStringSelect("Select Resolution", "Select a resolution for the wallpaper (1366, 1920, 3840)");
                    if (res == undefined) return;
                    if (!["1366", "1920", "3840"].includes(res)) return;
                    var info = await SystemFileSystem.getFileJson("c/programs/bingWallpaper/info.json");
                    info.resolution = res;
                    await SystemFileSystem.setFileString("c/programs/bingWallpaper/info.json", JSON.stringify(info));

                    await System.run("c/programs/bingWallpaper/startup.js");
                });
                this.window.addHtmlEventListener("click", "previousImage", async () => {
                    var info = await SystemFileSystem.getFileJson("c/programs/bingWallpaper/info.json");
                    info.offset = info.offset + 1;
                    if (info.offset > 7) info.offset = 7;
                    await SystemFileSystem.setFileString("c/programs/bingWallpaper/info.json", JSON.stringify(info));

                    await System.run("c/programs/bingWallpaper/startup.js");
                })
                this.window.addHtmlEventListener("click", "nextImage", async () => {
                    var info = await SystemFileSystem.getFileJson("c/programs/bingWallpaper/info.json");
                    info.offset = info.offset - 1;
                    if (info.offset < 0) info.offset = 0;
                    await SystemFileSystem.setFileString("c/programs/bingWallpaper/info.json", JSON.stringify(info));

                    await System.run("c/programs/bingWallpaper/startup.js");
                })

                await this.loadInfo();
                this.f = async () => {
                    await this.loadInfo();
                }
                System.settings.addSettingsUpdater("backgroundImage", this.f);
            });
        this.window.close = () => {
            var i = System.settings.settingsUpdater["backgroundImage"].indexOf(this.f);
            System.settings.settingsUpdater["backgroundImage"].splice(i, 1);

            this.stop()
            return true
        }
    }

    async loadInfo() {
        var info = await SystemFileSystem.getFileJson("c/programs/bingWallpaper/info.json");
        (await this.window.getHtmlElement("resolution")).innerText = info.resolution;
        (await this.window.getHtmlElement("url")).innerText = info.url;
        (await this.window.getHtmlElement("copyright")).innerText = info.copyright;
        (await this.window.getHtmlElement("offset")).innerText = info.offset;
    }
}
new program();