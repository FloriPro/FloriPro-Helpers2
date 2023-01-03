async function run() {
    await System.options.addValue("programs", "thereTime", { "path": "c/programs/thereTime/main.js", "name": "There Time", "run": "c/programs/thereTime/run.js" }, true);
    SystemHtml.updateStartmenu();

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/thereTime/run.js")){
        await SystemHtml.desktop.addLink("c/programs/thereTime/run.js", "There Time", "c/programs/thereTime/logo.webp");
    }

    return true;
}
run();