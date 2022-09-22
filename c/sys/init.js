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

SystemFileSystem = undefined;
System = undefined
SystemHtml = undefined;