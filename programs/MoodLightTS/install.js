async function run() {
    await System.options.addValue("programs", "MoodLightTS", { "path": "c/programs/MoodLightTS/main.js", "name": "MoodLight", "run": "c/programs/MoodLightTS/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/MoodLightTS/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/MoodLightTS/run.js", "MoodLight", "c/programs/MoodLightTS/logo.webp");
    }

    return true;
}
run();