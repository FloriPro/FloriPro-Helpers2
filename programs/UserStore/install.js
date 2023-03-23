async function run() {
    await System.options.addValue("programs", "pong", { "path": "c/programs/UserStore/main.js", "name": "User Store", "run": "c/programs/UserStore/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/UserStore/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/UserStore/run.js", "User Store", "c/programs/UserStore/logo.webp");
    }

    return true;
}
run();