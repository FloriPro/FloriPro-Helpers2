async function run() {
    //file extensions
    await System.options.addValue("fileExtensionOpener", "rhtml", "c/programs/downloadReaderV2/main.js", true); //reader html

    await System.options.addValue("programs", "downloadReaderV2", { "path": "c/programs/downloadReaderV2/main.js", "name": "Download Reader", "run": "c/programs/downloadReaderV2/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/downloadReaderV2/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/downloadReaderV2/run.js", "Download Reader", "c/programs/downloadReaderV2/logo.webp");
    }
    return true;
}
run();