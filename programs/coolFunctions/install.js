async function run() {
    await System.options.addValue("programs", "coolFunctins", { "path": "c/programs/coolFunctions/main.js", "name": "Cool Functions", "run": "c/programs/coolFunctions/run.js" }, true);

    await System.program.libInstall("chartjs")

    SystemHtml.updateStartmenu()
    return true;
}
run();