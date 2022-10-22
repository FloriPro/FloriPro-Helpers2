var usedFileSysIds = []
var useId = 0;
var FileSystemTable;
fastFileLookup = {};

var overwriteNotRedownload = false;

async function loader() {
    if (localStorage.getItem("fileSystemTable") == null || overwriteNotRedownload) {
        var r = await fetch("filesys.json?v=" + (Math.random() * 1000000));
        var d = JSON.parse(await r.text());
        FileSystemTable = load(d, "c");
        localStorage.setItem("fileSystemTable", JSON.stringify(FileSystemTable));

        //load save files
        if (localStorage["save"] != undefined) {
            var save = JSON.parse(localStorage["save"]);
            for (var x of Object.keys(save)) {
                localStorage[fastFileLookup[x]] = save[x];
            }
        }

        //localStorage.removeItem("save");
    } else {
        FileSystemTable = JSON.parse(localStorage.getItem("fileSystemTable"));
        loadFastLookup(FileSystemTable, "c")
    }

    //load boot.dat
    for (var x of localStorage.getItem(FileSystemTable["files"]["boot.dat"]).split("\r\n")) {
        if (localStorage.getItem(fastFileLookup[x]) == undefined) {
            console.error("file not found: " + x)
        }
        await eval(localStorage.getItem(fastFileLookup[x]))
    }

}

function loadFastLookup(data, path) {
    fastFileLookup = {};
    for (x of Object.keys(data["files"])) {
        if (!usedFileSysIds.includes(data["files"][x])) {
            usedFileSysIds.push(data["files"][x])
        }
        fastFileLookup[path + "/" + x] = data["files"][x];
    }
    for (x of Object.keys(data["folder"])) {
        loadFastLookup(data["folder"][x], path + "/" + x);
    }
}

function load(data, path) {
    var out = {}

    var folders = [];
    var files = [];
    for (var x of Object.keys(data)) {
        if (x.includes(".")) {
            files.push(x)
        } else {
            folders.push(x)
        }
    }

    out["folder"] = {}
    out["files"] = {}

    //load files
    for (var x of files) {
        fastFileLookup[path + "/" + x] = useId;

        out["files"][x] = useId;
        localStorage.setItem(useId, b64_to_utf8(data[x]))
        usedFileSysIds.push(useId);
        useId++;
    }

    //load folders
    for (var x of folders) {
        out["folder"][x] = load(data[x], path + "/" + x)
    }

    return out;
}
function b64_to_utf8(str) {
    try {
        str = str.replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(str)));
    } catch {
        return window.atob(str);
    }
}

loader()
