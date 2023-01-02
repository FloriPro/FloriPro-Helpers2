//called by option "startup"

async function run() {

    //auto install packages when specified in the url
    var params = new URLSearchParams(location.search);
    var toInstall = params.get("install");

    await delay(100);
    if (toInstall != null) {
        for (var toInstall of toInstall.split(",")) {
            if (!await System.program.installed(toInstall)) {
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
async function debugBridge() {
    var address = "localhost"
    var ws = new WebSocket("ws://" + address + ":8000");
    System.console.addListener((d, ws) => {
        ws.send(JSON.stringify({
            type: d[0],
            data: JSON.stringify(d[1])
        }))
    }, ws)
    ws.onopen = () => {
        setInterval(() => {
            ws.send(JSON.stringify({
                type: "log",
                data: JSON.stringify("heap_" + performance.memory.usedJSHeapSize)
            }))
        }, 500)
    }
}
//debugBridge();
run();