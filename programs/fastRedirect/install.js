async function run() {
    await System.options.addValue("programs", "fastRedirect", { "path": "c/programs/fastRedirect/main.js", "name": "fastRedirect", "run": "c/programs/fastRedirect/run.js", "hidden": true }, true);
    await System.options.addValue("startup", "c/programs/fastRedirect/test.js", true, true);

    System.run("c/programs/fastRedirect/test.js");
    
    return true;
}
run();