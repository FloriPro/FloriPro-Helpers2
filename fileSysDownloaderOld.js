let fileLookup = {}
let folderData = []
async function loadData() {
    var redownload = true; // TODO
    if (localStorage.getItem("fileLookup") == null) {
        redownload = true;
    }
    if (redownload) {
        response = await fetch("filesys.json");
        var d = await response.text();
        //read json and de-hexify data, store in localstorage, set pointer to files
        filesys = JSON.parse(d)[""];
        loadDir(filesys, "c");
        localStorage.setItem("fileLookup", JSON.stringify(fileLookup));
    } else {
        fileLookup = JSON.parse(localStorage.getItem("fileLookup"));
    }

    //localStorage.setItem("filesys.json", d);

    var toRun = localStorage.getItem(fileLookup["c/boot.dat"]).replaceAll("\r", "").split("\n");
    for (var r of toRun) {
        eval(localStorage.getItem(fileLookup[r]));
    }
}
function loadDir(dat, path) {
    console.log(Object.keys(dat))
    folderData[path] = Object.keys(dat);
    for (const [key, value] of Object.entries(dat)) {
        if (typeof value == "string") {
            id = Object.keys(fileLookup).length //TODO: make better
            fileLookup[path + "/" + key] = id;
            localStorage.setItem(id, b64_to_utf8(value));
        } else {
            if (isNaN(parseInt(key))) {
                loadDir(value, path + "/" + key);
            } else {
                loadDir(value, path);
            }
        }
    }
}
function fromHex(h) {
    var s = ''
    for (var i = 0; i < h.length; i += 3) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
    }
    return s
}
function fromBase64(s) {
    return window.atob(s);
}
function b64_to_utf8(str) {
    try {
        str = str.replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(str)));
    } catch {
        return window.atob(str);
    }
}
loadData()
