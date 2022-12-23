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

    //add c/user/vote/polls.json to persistandFiles.json file
    var persistantFiles = await SystemFileSystem.getFileJson("c/persistandFiles.json");
    if (!persistantFiles.includes("c/user/vote/polls.json")) {
        persistantFiles.push("c/user/vote/polls.json");
        await SystemFileSystem.setFileString("c/persistandFiles.json", JSON.stringify(persistantFiles));
    }


    return true;
}
run();