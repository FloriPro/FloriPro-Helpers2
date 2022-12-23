async function run() {
    await System.options.addValue("programs", "WordCloud", { "path": "c/programs/wordcloud/main.js", "name": "Word Cloud", "run": "c/programs/wordcloud/run.js" }, true);
    SystemHtml.updateStartmenu();

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/wordcloud/run.js")) {
        await SystemHtml.desktop.addLink("c/programs/wordcloud/run.js", "Word Cloud", "c/programs/wordcloud/logo.webp");
    }

    //install anychart lib
    await System.program.libInstall("anychart");

    return true;
}
run();