//called by option "startup"

async function run() {

    //auto install packages when specified in the url
    var params = new URLSearchParams(location.search);
    var toInstall = params.get("install");

    if (toInstall != null) {
        for (var toInstall of toInstall.split(",")) {
            if (!await System.program.installed(toInstall)) {
                await delay(100);
                var l = await SystemHtml.WindowHandler.presets.createLoading("Installing " + toInstall, "Downloading " + toInstall);
                await System.program.installPackage(await (await System.network.fetch(`programs/${toInstall}.json`)).text(), true, l, false, toInstall);
            }
        }
    }


    var autostart = params.get("autostart");
    if (autostart != undefined) {
        for (var torun of autostart.split(",")) {
            await System.run(torun);
        }
    }

    if (params.get("clear") != undefined) {
        location.search = "";
    }
    // http://localhost/?install=reddit&autostart=c/programs/reddit/run.js
}
run();