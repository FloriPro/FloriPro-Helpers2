async function run() {
    await System.options.addValue("programs", "liveChat", { "path": "c/programs/liveChat/main.js", "name": "Live Chat", "run": "c/programs/liveChat/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/liveChat/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/liveChat/run.js", "Live Chat", "c/programs/liveChat/logo.webp");
    }

    //add username to persistant files json
    var persistantFiles = await SystemFileSystem.getFileJson("c/persistandFiles.json");
    if (!persistantFiles.includes("c/programs/liveChat/username.txt")) {
        persistantFiles.push("c/programs/liveChat/username.txt");
        await SystemFileSystem.setFileString("c/persistandFiles.json", JSON.stringify(persistantFiles));
    }

    return true;
}
run();