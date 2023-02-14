async function run() {
    await System.options.addValue("programs", "bingWallpaper", { "path": "c/programs/bingWallpaper/main.js", "name": "Bing Wallpaper", "run": "c/programs/bingWallpaper/run.js" }, true);
    SystemHtml.updateStartmenu()

    System.options.addValue("startup", "c/programs/bingWallpaper/startup.js", true, true)
    await System.run("c/programs/bingWallpaper/startup.js")

    return true;
}
run();