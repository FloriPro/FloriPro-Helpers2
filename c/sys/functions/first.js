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
    }
    //tracker
    if (o["tracker"] == undefined) {
        o["tracker"] = [true, "bool"]
        await System.options.addValue("settings", "tracker", [true, "bool"], true);
    }
    if (o["tracker"][0] == true) {
        System.run("c/sys/functions/tracker.js");
    }
}

run();