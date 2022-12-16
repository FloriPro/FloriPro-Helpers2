async function run() {
    //file extensions
    await System.options.addValue("fileExtensionOpener", "png", "c/programs/imageViewer/main.js", true);
    await System.options.addValue("fileExtensionOpener", "jpg", "c/programs/imageViewer/main.js", true);
    await System.options.addValue("fileExtensionOpener", "gif", "c/programs/imageViewer/main.js", true);
    await System.options.addValue("fileExtensionOpener", "webp", "c/programs/imageViewer/main.js", true);

    await System.options.addValue("programs", "imageViewer", { "path": "c/programs/Image Viewer/main.js", "name": "Image Viewer", "run": "c/programs/imageViewer/run.js" }, true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/imageViewer/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/imageViewer/run.js", "Image Viewer", "c/programs/imageViewer/logo.webp");
    }
    return true;
}
run();