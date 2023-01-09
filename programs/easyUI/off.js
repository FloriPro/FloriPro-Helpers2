//disable easyUI
async function run() {
    await SystemFileSystem.setFileString("c/user/easyUI/settings.json", JSON.stringify({ "status": false }));
    await System.options.addValue("StartMenuButtons", "E", { "tooltip": "enable easyUI", "click": "c/programs/easyUI/on.js" })

    location.reload();
}
run();