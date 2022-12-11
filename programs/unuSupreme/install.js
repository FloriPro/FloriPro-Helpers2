async function run() {
    await System.options.addValue("programs", "unuSupreme", { "path": "c/programs/unuSupreme/main.js", "name": "UNU-Supreme", "run": "c/programs/unuSupreme/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/unuSupreme/run.js")){
        await SystemHtml.desktop.addLink("c/programs/unuSupreme/run.js", "UNU-Supreme", "c/programs/unuSupreme/logo.webp");
    }
    return true;
}
run();