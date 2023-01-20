async function run() {
    //disable easyUI

    var settings = await SystemFileSystem.getFileJson("c/user/easyUI/settings.json");
    settings.status = true;
    await SystemFileSystem.setFileString("c/user/easyUI/settings.json", JSON.stringify(settings));

    location.reload();
}
run();