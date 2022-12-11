async function run() {
    await System.options.addValue("programs", "jShell", { "path": "c/programs/jShell/main.js", "name": "jShell", "run": "c/programs/jShell/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/jShell/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/jShell/run.js", "jShell", "c/programs/jShell/logo.webp");
    }

    return true;
}
run();