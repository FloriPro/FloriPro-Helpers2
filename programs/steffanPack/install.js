async function run() {
    await System.options.addValue("programs", "sfxSteffan", { "path": "c/programs/steffanPack/sfxmain.js", "name": "SFX-Steffan", "run": "c/programs/steffanPack/sfxrun.js" }, true);
    await System.options.addValue("programs", "steffanFan", { "path": "c/programs/steffanPack/fanmain.js", "name": "Steffan-Fan", "run": "c/programs/steffanPack/fanrun.js" }, true);
    await System.options.addValue("libs", "steffanPack", "c/programs/steffanPack/run.js", true);
    SystemHtml.updateStartmenu()

    //desktop shortcut
    if (!await SystemHtml.desktop.existsLink("c/programs/steffanPack/sfxrun.js")) {
        await SystemHtml.desktop.addLink("c/programs/steffanPack/sfxrun.js", "SFX-Steffan", "c/programs/steffanPack/sfxlogo.webp");
    }
    if (!await SystemHtml.desktop.existsLink("c/programs/steffanPack/fanrun.js")) {
        await SystemHtml.desktop.addLink("c/programs/steffanPack/fanrun.js", "Steffan-Fan", "c/programs/steffanPack/fanlogo.webp");
    }

    return true;
}
run();