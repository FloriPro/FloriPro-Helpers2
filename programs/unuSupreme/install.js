async function run() {
    await System.options.addValue("programs", "unuSupreme", { "path": "c/programs/unuSupreme/main.js", "name": "UNU-Supreme", "run": "c/programs/unuSupreme/run.js" }, true);
    SystemHtml.updateStartmenu()
    return true;
}
run();