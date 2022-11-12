async function run() {
    await System.options.addValue("programs", "unoSupreme", { "path": "c/programs/unoSupreme/main.js", "name": "UNO-Supreme", "run": "c/programs/unoSupreme/run.js" }, true);
    SystemHtml.updateStartmenu()
    return true;
}
run();