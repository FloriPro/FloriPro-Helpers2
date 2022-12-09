async function run() {
    await System.options.addValue("programs", "pong", { "path": "c/programs/pong/main.js", "name": "Pong", "run": "c/programs/pong/run.js" }, true);
    SystemHtml.updateStartmenu()
    return true;
}
run();