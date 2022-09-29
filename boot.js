async function load() {
    if (localStorage["boot"] == undefined) {
        localStorage["boot"] = await (await fetch("fileSysDownloaderBig.js")).text();
    }
    eval(localStorage["boot"])
}
load();