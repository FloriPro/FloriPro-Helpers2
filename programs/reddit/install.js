async function run() {
    //install the needed dependencies
    //await System.program.libInstall("redditApi");

    //file extensions
    await System.options.addValue("programs", "reddit", { "path": "c/programs/reddit/main.js", "name": "Reddit", "run": "c/programs/reddit/run.js" }, true);
    SystemHtml.updateStartmenu()
    if (!(await SystemFileSystem.fileExists("c/user/reddit/old/0.json"))) {
        console.log("nwe File");
        await SystemFileSystem.setFileString("c/user/reddit/old/0.json", '[]');
    }
    if (!(await SystemFileSystem.fileExists("c/user/reddit/settings.json"))) {
        console.log("nwe File");
        await SystemFileSystem.setFileString("c/user/reddit/settings.json", '[{"limit": "10","sort_time": "all","sort_by": "hot","only_images": false,"save_data": false,"no_nsfw": false,"needs_bool_argument": "","subreddits": "memes", "name": "memes"}]');
    } else {
        let settings = await SystemFileSystem.getFileJson("c/user/reddit/settings.json");
        //check if the settings are up to date and thus in a list
        if (!Array.isArray(settings)) {
            settings = [settings];
            settings[0].name = "please rename me";
            await SystemFileSystem.setFileString("c/user/reddit/settings.json", JSON.stringify(settings));
            console.log("updated settings");
        }
    }

    await System.program.libInstall("md5");

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/reddit/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/reddit/run.js", "Reddit", "c/programs/reddit/logo.webp");
    }
    return true;
}
run();