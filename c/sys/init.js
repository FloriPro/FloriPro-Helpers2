console.log("initializing System");

//utility functions
remove = function (arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}
delay = function (time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
isJson = function (obj) {
    try {
        JSON.parse(obj);
        return true;
    } catch {
        return false;
    }
}

window.onerror = function (error, url, line) {
    console.error(error);
};

VERSION = '2023.06.17.1';
SystemFileSystem = undefined;
System = undefined
SystemHtml = undefined;
