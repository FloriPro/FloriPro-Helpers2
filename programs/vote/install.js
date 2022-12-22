async function run() {
    await System.options.addValue("programs", "vote", { "path": "c/programs/vote/main.js", "name": "Vote", "run": "c/programs/vote/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/vote/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/vote/run.js", "Vote", "c/programs/vote/logo.webp");
    }

    //install libs
    //* anychart
    //* qrcodejs
    //* chartjs
    await System.program.libInstall("anychart");
    await System.program.libInstall("qrious");
    await System.program.libInstall("chartjs");

    return true;
}
run();