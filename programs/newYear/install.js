async function run() {
    await System.options.addValue("programs", "newYear", { "path": "c/programs/newYear/main.js", "name": "New Year", "run": "c/programs/newYear/run.js" }, true);
    SystemHtml.updateStartmenu()

    //create newYear worker
    await System.program.runProgram("c/programs/newYear/nyworker.js");

    return true;
}
//this gets run every time on boot, because it's a special program

run();