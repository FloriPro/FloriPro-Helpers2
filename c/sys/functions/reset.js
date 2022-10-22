async function run() {
    SystemHtml.WindowHandler.presets.createConfirm("reseting...", "this might take a while");
    await SystemFileSystem.reset();
    location.reload();
}
run();