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
            System.program.runProgram(PATH.folder() + "/information.js")
        }
        System.run("c/sys/functions/first/cleanupSettings.js");
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