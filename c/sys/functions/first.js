async function run() {
    if (!await SystemFileSystem.fileExists("c/sys/functions/first.txt")) {
        await delay(100);
        SystemFileSystem.createFile("c/sys/functions/first.txt");

        var o = await System.options.get("settings");
        if (o["startupDisclaimer"] == undefined || o["startupDisclaimer"][0] == true) {
            System.program.runProgram(PATH.folder() + "/information.js")
        }
    }
}

run();