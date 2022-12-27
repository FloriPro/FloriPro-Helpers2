async function run() {
    await System.options.addValue("programs", "Sync", { "path": "c/programs/sync/main.js", "name": "Sync", "run": "c/programs/sync/run.js" }, true);
    SystemHtml.updateStartmenu()

    await System.program.libInstall("md5");

    //add the worker to start on boot
    var o = await System.options.addValue("startup", "c/programs/sync/runworker.js", true, false);

    //run the worker
    await delay(100);
    if (!System.program.connect.listenerExists("syncWorker") && o == true) {
        console.warn("run worker")
        await System.run("c/programs/sync/runworker.js");
    }

    //start program
    await System.run("c/programs/sync/run.js");

    return true;
}
run();