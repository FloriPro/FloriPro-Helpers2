async function run() {
    await System.options.addValue("programs", "piController", { "path": "c/programs/piController/main.js", "name": "Pi Controller", "run": "c/programs/piController/run.js" }, true);

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/piController/run.js")){
        await SystemHtml.desktop.addLink("c/programs/piController/run.js", "Pi Controller", "c/programs/piController/logo.webp");
    }

    SystemHtml.updateStartmenu()
    return true;
}
run();