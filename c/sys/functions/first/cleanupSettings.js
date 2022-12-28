async function run() {
    const dictFiles = ["sys/options/settings.json"]; // no "c/" at the start!
    for (var x of dictFiles) {
        var a = await getFiles(x);
        var ogDat = JSON.parse(a[0]);
        var currentDat = JSON.parse(a[1]);

        if (Object.keys(ogDat).sort().join(',') != Object.keys(currentDat).sort().join(',')) {
            var resolve = confirm("key missmath in file: " + x + "! Resolve?");
            if (resolve) {
                var currentKeys = Object.keys(currentDat);

                for (var y of Object.keys(ogDat)) {
                    var index = currentKeys.indexOf(y)
                    if (index !== -1) {
                        currentKeys.splice(index, 1);
                    } else {
                        console.log("missmatch resolve | Add key " + y + ".");
                        currentDat[y] = ogDat[y];
                    }
                }

                //remove all keys that exist, but are not used in the new version
                for (var y of currentKeys) {
                    console.log("missmatch resolve | Remove key " + y + ".");
                    delete currentDat[y];
                }

                SystemFileSystem.setFileString("c/" + x, JSON.stringify(currentDat));
            }
        }
    }
}
/**
 * 
 * @param {string} path without "c/" at the start!
 * @return {Promise<[string, string]>}
 */
async function getFiles(path) {
    if (window.originalFileSystem == undefined) {
        return ["{}", "{}"];
    }
    var ogDat = originalFileSystem;
    for (var y of path.split("/")) {
        ogDat = ogDat[y];
    }
    var ogDat = b64_to_utf8(ogDat);
    var currentDat = await SystemFileSystem.getFileString("c/" + path);
    return [ogDat, currentDat];
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