var usedFileSysIds = []
var useId = 0;
var FileSystemTable;
fastFileLookup = {};

var overwriteNotRedownload = false;

function getCookie(name) {
    var dc,
        prefix,
        begin,
        end;
    dc = document.cookie;
    prefix = name + "=";
    begin = dc.indexOf("; " + prefix);
    end = dc.length;
    if (begin !== -1) {
        begin += 2;
    } else {
        begin = dc.indexOf(prefix);
        if (begin === -1 || begin !== 0) return null;
    }
    if (dc.indexOf(";", begin) !== -1) {
        end = dc.indexOf(";", begin);
    }
    return decodeURI(dc.substring(begin + prefix.length, end)).replace(/\"/g, '');
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function informationalFetch_Text(url, opts = {}) {
    var p = new Promise(async function (res, rej) {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers || {}) {
            xhr.setRequestHeader(k, opts.headers[k]);
        }
        xhr.responseType = "text";
        xhr.onload = (e) => {
            res(xhr.responseText);
        };
        xhr.onerror = (...e) => {
            rej(...e);
        };
        xhr.onprogress = (e) => {
            document.querySelector("#status").innerText = "loading: " + Math.floor((e.loaded / e.total) * 100) + "%"
        }
        xhr.send(opts.body);
    });
    return await p;
}

async function loader() {
    try {
        if (getCookie("cookieAllowance") != "true") {
            var conf = confirm("Do you allow Cookies and Local Storage? This is absolutely vital for this website to function correctly!")
            if (!conf) {
                alert("Halted! This website needs Local Storage to function!");
                return
            } else {
                setCookie("cookieAllowance", "true", 1000);
            }
        }

        if (localStorage.getItem("fileSystemTable") == null || overwriteNotRedownload) {
            try {
                var text = await informationalFetch_Text("filesys.json?v=" + (Math.random() * 1000000));
            } catch (e) {
                console.error(e);
                document.querySelector("#status").innerHTML = "Error Initializing OS: Can't load from server! To visit a allready loaded version of this site please click <a href='/out.html'>here</a>.<br>When you switch between versions, you might need to press <b>'reset Boot'</b> to fully switch!";
                document.querySelector("#status").className = "error";
                return
            }
            try {
                var d = JSON.parse(text);
            } catch (e) {
                console.error(e);
                document.querySelector("#status").innerText = "Error Initializing OS: Can't parse file system!";
                document.querySelector("#status").className = "error";
                return
            }
            originalFileSystem = d;
            try {
                FileSystemTable = load(d, "c");
            } catch (e) {
                console.error(e);
                document.querySelector("#status").innerText = "Error Initializing OS: Can't initialize file system!";
                document.querySelector("#status").className = "error";
                return
            }
            localStorage.setItem("fileSystemTable", JSON.stringify(FileSystemTable));

            //load save files
            //if (localStorage["save"] != undefined) {
            //    localStorage[fastFileLookup["_saveFiles.json"]] = localStorage["save"];
            //var save = JSON.parse(localStorage["save"]);
            //for (var x of Object.keys(save)) {
            //    localStorage[fastFileLookup[x]] = save[x];
            //}
            //}

            //localStorage.removeItem("save");
        } else {
            FileSystemTable = JSON.parse(localStorage.getItem("fileSystemTable"));
            try {
                loadFastLookup(FileSystemTable, "c")
            } catch (e) {
                console.error(e);
                document.querySelector("#status").innerText = "Error Initializing OS: Can't reload file system!";
                document.querySelector("#status").className = "error";
                return
            }
        }

        //load boot.dat
        for (var x of localStorage.getItem(FileSystemTable["files"]["boot.dat"]).split("\r\n")) {
            if (localStorage.getItem(fastFileLookup[x]) == undefined) {
                console.error("file not found: " + x)
            }
            try {
                await eval(localStorage.getItem(fastFileLookup[x]))
            } catch (e) {
                console.error(e)
                document.querySelector("#status").innerText = "One ore more files doesn't work: " + e + " in file: " + x;
                document.querySelector("#status").className = "error";
                return
            }
        }
    } catch (e) {
        console.error(e)
        document.querySelector("#status").innerText = "Error Initializing OS: " + e;
        document.querySelector("#status").className = "error";
        return
    }
}

function loadFastLookup(data, path) {
    fastFileLookup = {};
    loadFastLookupRunner(data, path)
}
function loadFastLookupRunner(data, path) {
    for (x of Object.keys(data["files"])) {
        if (!usedFileSysIds.includes(data["files"][x])) {
            usedFileSysIds.push(data["files"][x])
        }
        fastFileLookup[path + "/" + x] = data["files"][x];
    }
    for (x of Object.keys(data["folder"])) {
        loadFastLookupRunner(data["folder"][x], path + "/" + x);
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
