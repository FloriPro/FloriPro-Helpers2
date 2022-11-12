async function run() {
    await System.options.addValue("programs", "testScript", { "path": "c/programs/testScript/main.js", "name": "Test", "run": "c/programs/testScript/run.js" }, true);
    SystemHtml.updateStartmenu()
    return true;
}
run();