//disable easyUI
async function run() {
    var settings = await SystemFileSystem.getFileJson("c/user/easyUI/settings.json");
    settings.status = false;
    await SystemFileSystem.setFileString("c/user/easyUI/settings.json", JSON.stringify(settings));
    
    await System.options.addValue("StartMenuButtons", "E", { "tooltip": "enable easyUI", "click": "c/programs/easyUI/on.js" })

    location.reload();
}
run();