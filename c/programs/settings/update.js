async function run() {
    var information = await SystemHtml.WindowHandler.presets.createLoading("Updating", "Verifying...");

    var nv = await (await System.network.fetch("version", { cache: "no-store" })).text();
    if (nv == VERSION) {
        if (await SystemHtml.WindowHandler.presets.createConfirm("Error", "You currently have the latest version! (NO to update nevertheless)")) {
            information.stop();
            return;
        }
    }

    if (!await SystemHtml.WindowHandler.presets.createConfirm("Update?", "all files in c/sys and c/programs that are shipped with this website will be replaced. This includes your changes you made to them!")) {
        information.stop();
        return;
    }

    information.setNum(5);
    information.setText("Connecting...");

    var con = await System.network.fetch("filesys.json", { cache: "no-store" });
    information.setNum(10);
    information.setText("Downloading...");
    var txt = await con.text();

    information.setNum(50);
    information.setText("Applying changes");

    var dat = JSON.parse(txt);
    var pf = await SystemFileSystem.getFileJson("c/persistandFiles.json");
    await asyncUpdateFiles(dat["sys"], "c/sys", pf)
    await asyncUpdateFiles(dat["programs"], "c/programs", pf)

    //run finishing toutches
    try {
        window.originalFileSystem = dat;
        System.run("c/sys/functions/first/cleanupSettings.js");
    } catch {
        console.error("Error running version check");
    }
    VERSION = nv;

    var r = async () => {
        if (await SystemHtml.WindowHandler.presets.createConfirm("Reload?", "A reload is suggested. Would you like to reload?")) {
            location.reload();
        }
    }; r();

    information.setNum(100);
    information.setText("Updated!");
    information.stop();
}

/**
     * 
     * @param {*} dat 
     * @param {string} path 
     * @param {*} persistandFiles 
     */
async function asyncUpdateFiles(dat, path, persistandFiles) {
    for (var x of Object.keys(dat)) {
        if (x.includes(".")) {
            1
            if (!persistandFiles.includes(path + "/" + x) && !path.startsWith("c/sys/options")) {
                console.log("update " + path + "/" + x);
                await SystemFileSystem.setFileString(path + "/" + x, b64_to_utf8(dat[x]));
            }
            //when the file is in options, first check if it exists, if not then write it
            else if (!persistandFiles.includes(path + "/" + x) && path.startsWith("c/sys/options") && !await SystemFileSystem.fileExists(path + "/" + x)) {
                console.log("create " + path + "/" + x);
                await SystemFileSystem.setFileString(path + "/" + x, b64_to_utf8(dat[x]));
            }
            else {
                //file not changed / created
            }
        } else {
            asyncUpdateFiles(dat[x], path + "/" + x, persistandFiles);
        }
    }
}
function b64_to_utf8(str) {
    try {
        str = str.replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(str)));
    } catch {
        return window.atob(str);
    }
}

run();