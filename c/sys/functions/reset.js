async function run() {
    var r = false;
    try {
        r = await SystemHtml.WindowHandler.presets.createConfirm("reset", "Do you realy want to reset this whole machine?");
    }
    catch {
        console.log("could not ask for reset")
        r = true;
    }
    if (r == true) {
        try {
            SystemHtml.WindowHandler.presets.createConfirm("reseting...", "this might take a while");
            await SystemFileSystem.reset();
        } catch {
            if (confirm("reset failed! Completely reset everything?")) {
                localStorage.clear();
            }else{
                alert("complete reset aborted!");
            }
        }
        location.reload();
    }
}
run();