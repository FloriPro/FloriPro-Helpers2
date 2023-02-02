async function run() {
    var params = new URLSearchParams(location.search);
    var redirect = params.get("redirect");

    if (!redirect) {
        return
    }
    await delay(200);

    await System.program.easyPackageInstall(redirect)

    var p = (await System.options.get("programs"))[redirect];
    var prog = await System.program.runProgram(p.path);

    await delay(100);
    history.pushState({}, null, location.href.split("?")[0]);

    if (prog.window) {
        prog.window.size.setfullMax();
    }
}
run()