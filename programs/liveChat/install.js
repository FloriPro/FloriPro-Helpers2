async function run() {
    await System.options.addValue("programs", "liveChat", { "path": "c/programs/liveChat/main.js", "name": "Live Chat", "run": "c/programs/liveChat/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/liveChat/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/liveChat/run.js", "Live Chat", "c/programs/liveChat/logo.webp");
    }

    return true;
}
run();