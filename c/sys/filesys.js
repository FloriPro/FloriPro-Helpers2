console.log("initializing FileSystem");

class FileSystemClass {
    async reset() {
        var toRemove = []
        for (var x of Object.keys(this.realLocalStorage)) {
            if (x != "save") {
                toRemove.push(x);
            }
        }

        //load old localstorage "save"
        var save = {};
        if (this.realLocalStorage["save"] != undefined) {
            save = JSON.parse(this.realLocalStorage["save"]);
        }

        //save persistand files in localstorage "save"
        var persistandFileJson = await this.getFileJson("c/persistandFiles.json");
        for (var x of persistandFileJson) {
            var dat = await this.getFileString(x);
            save[x] = dat;
        }
        console.log(save);
        this.realLocalStorage["save"] = JSON.stringify(save);

        for (var x of toRemove) {
            this.realLocalStorage.removeItem(x);
        }
    }

    constructor() {
        this.PositionalFileSystem = PositionalFileSystem;
        this.realLocalStorage = localStorage;
        //setTimeout(this.removeLocalStorage, 1)

        this.ramFiles = {}
    }
    async removeLocalStorage() {

        Object.defineProperty(window, 'localStorage', {
            value: undefined
        });
    }

    toImg(str) {
        return "data:image/png;base64," + btoa(str)
    }

    /**
     * sets the String of a file
     * @param {string} path 
     * @param {string} dat 
     */
    async setFileString(path, dat) {
        if (Object.keys(fastFileLookup).includes(path)) {
            this.realLocalStorage.setItem(fastFileLookup[path], dat);
            this.ramFiles[path] = undefined;
            return true;
        } else {
            console.warn("file needs to be created first: " + path)
            return false;
        }
    }
    async createFile(path) {
        var folder = path.split("/").slice(0, -1).join("/");
        var f = await this.getTablePos(folder, "c", FileSystemTable);

        var id = this.getUnusedId();
        usedFileSysIds.push(id);
        f.files[path.split("/")[path.split("/").length - 1]] = id

        localStorage.setItem("fileSystemTable", JSON.stringify(FileSystemTable));
        loadFastLookup(FileSystemTable, "c")
        return true;
    }
    async createFolder(path, name) {
        var f = await this.getTablePos(path, "c", FileSystemTable);
        f.folder[name] = { "files": {}, "folder": {} };
        localStorage.setItem("fileSystemTable", JSON.stringify(FileSystemTable));
        loadFastLookup(FileSystemTable, "c")
    }
    /**
     * returns the content of a file
     * @param {string} path 
     * @returns {string}
     */
    async getFileString(path) {
        var dat = ""
        if (this.ramFiles[path] == undefined) {
            var r = await this.localFileLoad(path);
            if (r.startsWith(".od__")) {
                var l = await SystemHtml.WindowHandler.presets.createLoading("Loading", "Loading file from the internet");
                l.setNum(0);

                var d = r.slice(5)
                var f = await (await fetch(d));
                var array = await f.arrayBuffer();
                var dat = await this.bufferToString(array, l);

                l.stop();
                r = dat;
            }

            this.ramFiles[path] = r; //store the file in ram for fast acces
            return r;
        } else {
            return this.ramFiles[path];
        }
    }
    async bufferToString(buf, l) {
        var view = new Uint8Array(buf);
        var out = ""
        var timeForEveryPercent = view.length / 10;
        var i = 0;
        var p = 0;
        for (var x of view) {
            out += String.fromCharCode(x);
            if (i >= timeForEveryPercent) {
                i = 0;
                if (l != null && timeForEveryPercent > 1000) {
                    p += 10;
                    l.setNum(p)
                    await delay(10);
                }
            }
            i++;
        }
        return out;
    }
    /**
     * returns the json parsed content of a file
     * @param {string} path 
     * @returns {*}
     */
    async getFileJson(path) {
        var s = await this.getFileString(path)
        try {
            return JSON.parse(s)
        } catch {
            console.error("could not parse file JSON: " + path);
            return null
        }
    }
    /**
     * 
     * @param {string} path 
     * @returns {FileSysFile} FileSysFile
     */
    async getFile(path) {
        var out = new FileSysFile(path, await this.getFileString(path));
        return out;
    }
    /**
     * 
     * @param {string} path 
     * @returns {FileSysFolder} FileSysFolder
     */
    async getFolder(path) {
        var d = new FileSysFolder(path);
        return d
    }

    /**
     * loads the file from local storage
     * @param {string} path 
     */
    async localFileLoad(path) {
        if (this.realLocalStorage.getItem(fastFileLookup[path]) == undefined) {
            return "";
        }
        return this.realLocalStorage.getItem(fastFileLookup[path]).replace("\r\n", "\n")
    }

    getUnusedId() {
        var i = 0;
        while (usedFileSysIds.includes(i)) {
            i++
        }
        return i;
    }

    /**
     * 
     * @param {string} path 
     * @returns {string[]} list of files
     */
    async getFiles(path) {
        var f = await this.getTablePos(path, "c", FileSystemTable);
        return Object.keys(f["files"]);
    }
    /**
     * 
     * @param {string} path 
     * @returns {string[]} list of folders
     */
    async getFolders(path) {
        var f = await this.getTablePos(path, "c", FileSystemTable);
        return Object.keys(f["folder"]);
    }

    /**
     * 
     * @param {string} path 
     * @param {string} p 
     * @param {*} dat 
     * @returns {*} Part of the FileSystemTable starting at the desired path
     */
    async getTablePos(path, p, dat) {
        if (path.endsWith("/")) {
            path = path.slice(0, -1);
        }
        if (p == path) {
            return dat;
        } else {
            var n = path.replace(p + "/", "").split("/")[0]
            return this.getTablePos(path, p + "/" + n, dat["folder"][n])
        }
    }
}
class FileSysFile {
    constructor(path, text) {
        this.path = path;
        this.text = text;
    }
    async remove() {
        console.warn("File: remove not implemented");
        return false
    }
    async rename() {
        console.warn("File: rename not implemented");
        return false
    }
    async getInformation() {
        console.warn("File: getInformation not implemented");
        return false
    }
}
class FileSysInfo { //TODO
    constructor() {
        this.createdDate = "";
    }
}
class FileSysFolder {
    constructor(path) {
        this.path = path;
        this.files = []
        this.folders = []

        //load data from fileSysTable
    }
}

class PositionalFileSystem { //TODO

}

var s = new FileSystemClass();
SystemFileSystem = s;