async function run() {
    //disable easyUI
    await SystemFileSystem.setFileString("c/user/easyUI/settings.json", JSON.stringify({ "status": true }));

    location.reload();
}
run();