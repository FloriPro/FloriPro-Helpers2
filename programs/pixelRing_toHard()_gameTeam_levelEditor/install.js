async function run() {
    await System.options.addValue("programs", "pixelRing_toHard()_gameTeam_levelEditor", { "path": "c/programs/pixelRing_toHard()_gameTeam_levelEditor/main.js", "name": "Exit Game Toolkit", "run": "c/programs/pixelRing_toHard()_gameTeam_levelEditor/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/pixelRing_toHard()_gameTeam_levelEditor/run.js")){
        await SystemHtml.desktop.addLink("c/programs/pixelRing_toHard()_gameTeam_levelEditor/run.js", "Exit Game Toolkit", "c/programs/pixelRing_toHard()_gameTeam_levelEditor/logo.webp");
    }
    return true;
}
run();