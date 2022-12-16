async function run() {
    await System.options.addValue("programs", "pong", { "path": "c/programs/pong/main.js", "name": "Pong", "run": "c/programs/pong/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/pong/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/pong/run.js", "Pong", "c/programs/pong/logo.webp");
    }

    return true;
}
run();