console.log("initializing System");

//utility functions
remove = function (arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}

SystemFileSystem = undefined;
System = undefined
SystemHtml = undefined;