console.log("initializing FileSystem");

class FileSystemClass {
    constructor() {
        this.PositionalFileSystem = PositionalFileSystem;
        this.realLocalStorage = localStorage;
        this.FileSystemTable = FileSystemTable;
        this.changes = new class {
            constructor(parent) {
                this.parent = parent;
                /**
                 * @type {Array<(path,type)=>{}>}
                 */
                this.changeListeners = [];
            }
            /**
             * @param {(path,dat)=>{}} listener 
             */
            addListener(listener) {
                this.changeListeners.push(listener);
            }
            /**
             * @param {(path,type)=>{}} listener
             */
            removeListener(listener) {
                this.changeListeners.splice(this.changeListeners.indexOf(listener), 1);
            }
            send(path, type) {
                for (var x of SystemFileSystem.changes.changeListeners) {
                    x(path, type);
                }
            }
        }(this);
        //setTimeout(this.removeLocalStorage, 1)

        //load save files
        if (localStorage["save"] != undefined) {
            var save = JSON.parse(localStorage["save"]);
            for (var path of Object.keys(save)) {
                if (save[path] != "") {
                    this.setFileString(path, save[path])
                }
                //localStorage[fastFileLookup[x]] = save[x];
            }
            localStorage.removeItem("save");
        }
    }
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
            if (await this.fileExists(x)) {
                var dat = await this.getFileString(x);
                save[x] = dat;
            }
        }
        console.log(save);
        this.realLocalStorage["save"] = JSON.stringify(save);

        for (var x of toRemove) {
            this.realLocalStorage.removeItem(x);
        }
    }
    async removeLocalStorage() {

        Object.defineProperty(window, 'localStorage', {
            value: undefined
        });
    }

    /**
     * unpacks the package to "c/_temp/"
     * @param {string} data 
     */
    async unpackPackage(data) {
        var p = new packageLoader(data);
        await p.loader(data);
    }

    toImg(str, fileType = "png") {
        return "data:image/" + fileType + ";base64," + btoa(str)
    }
    /**
     * sets the String of a file
     * @param {string} path 
     * @param {string} dat 
     */
    async setFileString(path, dat, dispatchEvent = true) {
        if (!Object.keys(fastFileLookup).includes(path)) {
            await this.createFile(path);
        }
        if (fastFileLookup[path] == undefined || fastFileLookup[path] == "undefined") {
            console.error("could not create file")
            console.log(fastFileLookup[path]);
        }

        var oldDat = this.realLocalStorage[fastFileLookup[path]];

        if (oldDat != dat && dispatchEvent) {
            //dispatch change event
            setTimeout(this.changes.send, 1, path, "change");
        }
        this.realLocalStorage.setItem(fastFileLookup[path], dat);
    }
    async createFile(path) {
        var folder = path.split("/").slice(0, -1).join("/");
        var f = await this.getTablePos(folder, "c", FileSystemTable);

        if (f == undefined) {
            var tempPath = "";
            for (var x of folder.split("/")) {
                if (await this.getTablePos(tempPath + x, "c", FileSystemTable) == undefined) {
                    await this.createFolder(tempPath, x);
                }
                tempPath += x + "/";
            }
            var f = await this.getTablePos(folder, "c", FileSystemTable);
        }

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
    async fileExists(path) {
        return fastFileLookup[path] != undefined;
    }
    /**
     * returns the content of a file
     * @param {string} path 
     * @param {?boolean} raw load online data files
     * @returns {Promise<string>}
     */
    async getFileString(path, raw = false) {
        var dat = ""
        if (this.ramFiles == undefined || this.ramFiles[path] == undefined) {
            var r = await this.localFileLoad(path);
            //console.log(path + ":\n" + r);
            //await delay(200);
            if (r.startsWith(".od__") && !raw) {
                //var l = await SystemHtml.WindowHandler.presets.createLoading("Loading", "Loading file from the internet");
                //l.setNum(0);

                var d = r.slice(5)
                //var f = await fetch(d);
                //var array = await f.arrayBuffer();
                //var dat = await this.bufferToString(array);

                var dat = await System.network.informationalFetch_Text(d, {}, undefined, "Loading", "Loading file from the Internet...");

                //l.stop();
                r = dat;
            }

            //this.ramFiles[path] = r; //store the file in ram for fast acces
            return r;
        } else {
            return this.ramFiles[path];
        }
    }
    async bufferToString(buf) {
        var out = ""
        //var i = 0;
        //var p = 0;
        var view = new Uint8Array(buf);
        //var timeForEveryPercent = view.length / 5;
        for (var x = 0; x < view.length; x++) {
            out += String.fromCharCode(view[x]);
            //if (i >= timeForEveryPercent) {
            //    i = 0;
            //    if (l != null && timeForEveryPercent > 1000) {
            //        p += 20;
            //        l.setNum(p)
            //        await delay(0);
            //    }
            //}
            //i++;
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
     * @returns {Promise<FileSysFile>} FileSysFile
     */
    async getFile(path) {
        var out = new FileSysFile(path);
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
     * @return {Promise<string>}
     */
    async localFileLoad(path) {
        if (this.realLocalStorage.getItem(fastFileLookup[path]) == undefined) {
            console.error("file " + path + " does not exist!");
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
     * @returns {Promise<string[]>} list of files
     */
    async getFiles(path) {
        var f = await this.getTablePos(path, "c", FileSystemTable);
        return Object.keys(f["files"]);
    }
    /**
     * 
     * @param {string} path 
     * @returns {Promise<string[]>} list of folders
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
        if (path.startsWith("c")) {
            path = path.slice(1);
        }

        for (var x of path.split("/")) {
            if (x == "") {
                continue;
            }
            if (dat["folder"][x] == undefined) {
                return undefined;
            }
            dat = dat["folder"][x];
        }
        return dat;
    }


    /**
     * removes a file
     * @param {string} path 
     */
    async removeFile(path) {
        if (!Object.keys(fastFileLookup).includes(path)) {
            return
        }
        if (path.startsWith("c/")) {
            path = path.slice(2);
        }
        if (path.startsWith("c")) {
            path = path.slice(1);
        }
        var folder = path.split("/").slice(0, -1).join("/");

        var f = await this.getTablePos(folder, "c", FileSystemTable);

        this.realLocalStorage.removeItem(fastFileLookup[path]);
        delete f["files"][path.split("/")[path.split("/").length - 1]]

        path = "c/" + path;

        this.changes.send(path, "delete");

        this.realLocalStorage.setItem("fileSystemTable", JSON.stringify(FileSystemTable));

        loadFastLookup(FileSystemTable, "c")
    }
    /**
     * removes the folder and its contents
     * @param {string} path 
     */
    async removeFolder(path) {
        var folder = path.split("/").slice(0, -1).join("/");
        var f = await this.getTablePos(folder, "c", FileSystemTable);
        delete f["folder"][path.split("/")[path.split("/").length - 1]] //this also removes the files in the folder

        this.realLocalStorage.setItem("fileSystemTable", JSON.stringify(FileSystemTable));

        loadFastLookup(FileSystemTable, "c");
    }

    /**
     * move all files/folders in a folder to another folder
     * @param {string} path 
     * @param {string} to 
     */
    async moveInFolder(path, to) {
        //move files
        await this.moveRecursivlyIn(path, to);

        await this.removeFolder(path);
        await this.createFolder(path.split("/").slice(0, -1).join("/"), path.split("/")[path.split("/").length - 1])
    }
    async moveRecursivlyIn(path, to) {
        var f = await this.getTablePos(path, "c", FileSystemTable);
        for (var x of Object.keys(f["folder"])) {
            await this.moveRecursivlyIn(path + "/" + x, to + "/" + x);
        }
        for (var x of Object.keys(f["files"])) {
            await this.setFileString(to + "/" + x, await this.getFileString(path + "/" + x));
        }
    }
}
class packageLoader {
    async loader(d) {
        await this.load(d, "c/_temp");
    }
    async load(data, path) {
        for (var x of Object.keys(data)) {
            if (x.includes(".")) {
                await SystemFileSystem.setFileString(path + "/" + x, this.b64_to_utf8(data[x]));
            }
            else {
                await this.load(data[x], path + "/" + x);
            }
        }
    }
    b64_to_utf8(str) {
        try {
            str = str.replace(/\s/g, '');
            return decodeURIComponent(escape(window.atob(str)));
        } catch {
            return window.atob(str);
        }
    }
}
class FileSysFile {
    constructor(path) {
        this.path = path;
    }
    async text() {
        return await this.getFileString(this.path);
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
    /**
     * checks if this file is a online data file
     * @return {boolean}
     */
    async isOnlineData() {
        var r = await SystemFileSystem.localFileLoad(this.path);
        if (r.startsWith(".od__")) {
            return true;
        }
        else {
            return false;
        }
    }
    async getOnlineDataLink() {
        var r = await SystemFileSystem.localFileLoad(this.path)
        if (r.startsWith(".od__")) {
            return r.replace(".od__", "");
        }
        return undefined;
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

var SystemFileSystem = new FileSystemClass();//for "tsc" ///--remove--
SystemFileSystem = new FileSystemClass();
