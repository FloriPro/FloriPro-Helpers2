async function run() {
    await System.options.addValue("programs", "remoteBrowser", { "path": "c/programs/remoteBrowser/main.js", "name": "Remote Browser", "run": "c/programs/remoteBrowser/run.js" }, true);
    SystemHtml.updateStartmenu();

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/remoteBrowser/run.js")){
        await SystemHtml.desktop.addLink("c/programs/remoteBrowser/run.js", "Remote Browser", "c/programs/remoteBrowser/logo.webp");
    }

    return true;
}
run();