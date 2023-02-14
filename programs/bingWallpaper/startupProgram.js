//standard program
class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        //fetch wallpaper
        const resolutions = [1366, 1920, 3840];
        let resolution;

        var info = await SystemFileSystem.getFileJson("c/programs/bingWallpaper/info.json");
        if (resolutions.includes(parseInt(info.resolution))) {
            resolution = parseInt(info.resolution);
        } else {
            resolution = resolutions[0];
        }

        let index = info.offset;

        let wallpaper = await (await System.network.fetch(`https://bing.biturl.top/?mkt=en-US&resolution=${resolution}&index=${index}`)).text();
        wallpaper = JSON.parse(wallpaper);

        //set wallpaper
        if (info.url == wallpaper.url) return this.stop();
        await SystemFileSystem.setFileString("c/programs/bingWallpaper/wallpaper.jpg", ".od__" + wallpaper.url);
        await System.options.addValue("settings", "backgroundImage", ["c/programs/bingWallpaper/wallpaper.jpg", "file"], true);

        wallpaper.resolution = resolution;
        wallpaper.offset = index;
        await SystemFileSystem.setFileString("c/programs/bingWallpaper/info.json", JSON.stringify(wallpaper));

        System.settings.settingUpdated("backgroundImage");

        this.stop();
    }
}
new program();