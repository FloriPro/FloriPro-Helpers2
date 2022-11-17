async function run() {
    await System.options.addValue("programs", "sfxSteffan", { "path": "c/programs/steffanPack/sfxmain.js", "name": "SFX-Steffan", "run": "c/programs/steffanPack/sfxrun.js" }, true);
    await System.options.addValue("programs", "steffanFan", { "path": "c/programs/steffanPack/fanmain.js", "name": "Steffan-Fan", "run": "c/programs/steffanPack/fanrun.js" }, true);
    await System.options.addValue("libs", "steffanPack", "c/programs/steffanPack/run.js", true);
    SystemHtml.updateStartmenu()
    return true;
}
run();