async function run() {
    await System.options.addValue("programs", "liveChat", { "path": "c/programs/liveChat/main.js", "name": "Live Chat", "run": "c/programs/liveChat/run.js" }, true);
    SystemHtml.updateStartmenu()
    return true;
}
run();