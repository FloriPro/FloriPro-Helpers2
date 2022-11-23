async function run() {
    await System.options.addValue("programs", "MoodLightTS", { "path": "c/programs/MoodLightTS/main.js", "name": "MoodLight", "run": "c/programs/MoodLightTS/run.js" }, true);
    SystemHtml.updateStartmenu()
    return true;
}
run();