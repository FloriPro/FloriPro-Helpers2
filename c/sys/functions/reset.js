async function run() {
    let skipQuestion = false;
    try {
        var t = (await System.options.get("settings"))["resetQuestion"][0];
        console.log(t);
        if (t == true) {
            skipQuestion = t;
        }
    } catch {
        console.error("could not check for skip question!");
    }

    var r = true;
    if (!skipQuestion) {
        try {
            r = await SystemHtml.WindowHandler.presets.createConfirm("reset", "Do you realy want to reset this whole machine?");
        }
        catch {
            console.log("could not ask for reset")
            r = true;
        }
    }
    if (r == true) {
        try {
            SystemHtml.WindowHandler.presets.createConfirm("reseting...", "this might take a while");
            await SystemFileSystem.reset();
        } catch {
            if (confirm("reset failed! Completely reset everything?")) {
                localStorage.clear();
            } else {
                alert("complete reset aborted!");
            }
        }
        location.reload();
    }
}
run();