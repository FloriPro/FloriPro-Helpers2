async function run() {
    if (!await SystemHtml.WindowHandler.presets.createConfirm("Install easyUI", "This Will completely change your desktop. Are you sure you want to continue?")) {
        return false;
    }

    await System.options.addValue("programs", "easyUI", { "path": "c/programs/easyUI/main.js", "name": "Test", "run": "c/programs/easyUI/run.js", "hidden": true }, true);
    await System.options.addValue("startup", "c/programs/easyUI/runworker.js", true, true);

    location.reload();
    return true;
}
run();