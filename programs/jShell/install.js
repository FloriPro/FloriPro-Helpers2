async function run() {
    await System.options.addValue("programs", "jshell", { "path": "c/programs/jShell/main.js", "name": "jShell", "run": "c/programs/jShell/run.js" }, true);
    SystemHtml.updateStartmenu()
    return true;
}
run();