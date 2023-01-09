async function run() {
    await System.options.addValue("programs", "easyUI", { "path": "c/programs/easyUI/main.js", "name": "easyUI", "run": "c/programs/easyUI/run.js", "hidden": true }, true);
    await System.options.addValue("startup", "c/programs/easyUI/runworker.js", true, true);

    await System.run("c/programs/easyUI/on.js")

    location.reload();
    return true;
}
run();