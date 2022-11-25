async function run() {
    var o = await System.options.get("settings");
    if (!await SystemFileSystem.fileExists("c/sys/functions/first.txt")) {
        await delay(100);
        SystemFileSystem.createFile("c/sys/functions/first.txt");

        //startupDisclaimer
        if (o["startupDisclaimer"] == undefined) {
            o["startupDisclaimer"] == [true, "bool"];
            await System.options.addValue("settings", "startupDisclaimer", [true, "bool"]);
        }
        if (o["startupDisclaimer"][0] == true) {
            await System.program.runProgram(PATH.folder() + "/information.js")
        }
        System.run("c/sys/functions/first/cleanupSettings.js");

        if (o["ip-spende"][0] != true) {
            if (await SystemHtml.WindowHandler.presets.createConfirm("Activate IP-Spende", "Through the use of this website you consent on anonymous statistics. Would you also like to contribute to the stability of this Website by letting us save your ip address?")) {
                o["startupDisclaimer"] == [true, "bool"];
                await System.options.addValue("settings", "ip-spende", [true, "bool"], true);
            }
        }
    }
    //analytics
    if (o["analytics"] == undefined) {
        o["analytics"] = [true, "bool"]
        await System.options.addValue("settings", "analytics", [true, "bool"], true);
    }
    if (o["analytics"][0] == true) {
        System.run("c/sys/functions/analytics.js");
    }
}

run();