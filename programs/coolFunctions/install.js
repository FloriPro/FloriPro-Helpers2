async function run() {
    await System.options.addValue("programs", "coolFunctions", { "path": "c/programs/coolFunctions/main.js", "name": "Cool Functions", "run": "c/programs/coolFunctions/run.js" }, true);

    await System.program.libInstall("chartjs")

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/coolFunctions/run.js")){
        await SystemHtml.desktop.addLink("c/programs/coolFunctions/run.js", "Cool Functions", "c/programs/coolFunctions/logo.webp");
    }

    SystemHtml.updateStartmenu()
    return true;
}
run();