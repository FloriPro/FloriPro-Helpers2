async function run() {
    await System.options.addValue("programs", "exitMe", { "path": "c/programs/exitMe/main.js", "name": "Exit Game Toolkit", "run": "c/programs/exitMe/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/exitMe/run.js")){
        await SystemHtml.desktop.addLink("c/programs/exitMe/run.js", "Exit Game Toolkit", "c/programs/exitMe/logo.webp");
    }
    return true;
}
run();