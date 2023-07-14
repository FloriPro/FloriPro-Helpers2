console.log("initializing FileSystem");

class dbWrapper {
    constructor() {
        this.db = null;
    }
    createPromise() {
        //creates a promise and returns it with resolve and reject
        var resolve, reject;
        var p = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise: p, resolve: resolve, reject: reject };
    }
    async init() {
        var p = this.createPromise();
        const dbPromise = indexedDB.open('fileSystem', 2);
        dbPromise.onupgradeneeded = function (event) {
            console.error("Database should not be upgraded!")
        }
        dbPromise.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        dbPromise.onsuccess = function (event) {
            this.db = event.target.result;
            p.resolve(event.target.result);
        }.bind(this);
        return await p.promise;
    }

    async addFolder(path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore = transaction.objectStore('fileStructure');
        var request = objectStore.add({
            path: path,
            data: {
                containingFiles: [],
                containingFolders: []
            }
        });
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }

        // get containing folder and add folder to it
        if (path.split("/").length > 1)
            await this.addFolderToFolder(path, path.split("/").slice(0, -1).join("/"));

        return await p.promise;
    }
    async addFolderToFolder(path, folder) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore = transaction.objectStore('fileStructure');
        var request = objectStore.get(folder);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            var data = event.target.result;
            if (data.data.containingFolders.includes(path)) {
                p.resolve(event.target.result);
                return;
            }
            data.data.containingFolders.push(path);
            var request2 = objectStore.put(data);
            request2.onerror = function (event) {
                console.error("Database error: " + event.target.error);
                p.reject(event.target.error);
            }
            request2.onsuccess = function (event) {
                p.resolve(event.target.result);
            }
        }
        return await p.promise;
    }
    async addFileToFolder(folder, path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore = transaction.objectStore('fileStructure');

        var request = objectStore.get(folder);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            var data = event.target.result;
            if (!data.data.containingFiles.includes(path))
                data.data.containingFiles.push(path);
            var request2 = objectStore.put(data);
            request2.onerror = function (event) {
                console.error("Database error: " + event.target.error);
                p.reject(event.target.error);
            }
            request2.onsuccess = function (event) {
                p.resolve(event.target.result);
            }
        }
        return await p.promise;
    }

    async removeFileFromFolder(folder, path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore = transaction.objectStore('fileStructure');

        var request = objectStore.get(folder);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            var data = event.target.result;
            data.data.containingFiles = data.data.containingFiles.filter((e) => e != path);
            var request2 = objectStore.put(data);
            request2.onerror = function (event) {
                console.error("Database error: " + event.target.error);
                p.reject(event.target.error);
            }
            request2.onsuccess = function (event) {
                p.resolve(event.target.result);
            }
        }
        return await p.promise;
    }

    async removeFile(path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['files'], 'readwrite');
        var objectStore = transaction.objectStore('files');

        var request = objectStore.delete(path);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }
        return await p.promise;
    }
    /* wrong function
        var p = this.createPromise();
        var transaction = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore = transaction.objectStore('fileStructure');

        var request = objectStore.get(path);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            var data = event.target.result;
            var request2 = objectStore.delete(path);
            request2.onerror = function (event) {
                console.error("Database error: " + event.target.error);
                p.reject(event.target.error);
            }
            request2.onsuccess = function (event) {
                p.resolve(event.target.result);
            }
        }
        return await p.promise;*/


    async removeFolderFromFolder(folder, path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore = transaction.objectStore('fileStructure');

        var request = objectStore.get(folder);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            var data = event.target.result;
            data.data.containingFolders = data.data.containingFolders.filter((e) => e != path);
            var request2 = objectStore.put(data);
            request2.onerror = function (event) {
                console.error("Database error: " + event.target.error);
                p.reject(event.target.error);
            }
            request2.onsuccess = function (event) {
                p.resolve(event.target.result);
            }
        }
        return await p.promise;
    }

    async removeFolder(path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore = transaction.objectStore('fileStructure');
        var request = objectStore.delete(path);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }
        return await p.promise;
    }

    async getFolder(path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['fileStructure'], 'readonly');
        var objectStore = transaction.objectStore('fileStructure');
        var request = objectStore.get(path);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            if (event.target.result == undefined) {
                p.resolve(null);
                return;
            }
            p.resolve(event.target.result.data);
        }
        return await p.promise;
    }

    async getFile(path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['files'], 'readonly');
        var objectStore = transaction.objectStore('files');
        var request = objectStore.get(path);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }
        return await p.promise;
    }
    async putFile(path, data) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['files'], 'readwrite');
        var objectStore = transaction.objectStore('files');
        var request = objectStore.put({
            path: path,
            data: data
        });
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }
        return await p.promise;
    }

    async clear() {
        var p = this.createPromise();
        var transaction = this.db.transaction(['files'], 'readwrite');
        var objectStore = transaction.objectStore('files');
        var request = objectStore.clear();
        request.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p.reject(event.target.error);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }

        var p2 = this.createPromise();
        var transaction2 = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore2 = transaction2.objectStore('fileStructure');
        var request2 = objectStore2.clear();
        request2.onerror = function (event) {
            console.error("Database error: " + event.target.error);
            p2.reject(event.target.error);
        }
        request2.onsuccess = function (event) {
            p2.resolve(event.target.result);
        }

        await p2.promise;
        await p.promise;
    }
}

class FileSystemClass {
    //now uses indexedDB
    constructor() {
        if (localStorage["fileSystemTable"] && !localStorage["type"]) {
            localStorage.removeItem("boot");

            localStorage["type"] = "indexedDB";
            location.reload();
            return
        }

        /**
         * @type {IDBDatabase}
         */
        this.db = null;
        /**
         * @type {dbWrapper}
         */
        this.dbWrapper = null;
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
        var opdb = this.openDB();
        this.opdb = opdb;
    }

    async openDB() {
        if (this.db != null) {
            return;
        }
        this.dbWrapper = new dbWrapper();
        this.db = await this.dbWrapper.init();
        await this.loadPersistandFiles();

        if (localStorage["fileSystemTable"] && localStorage["type"]) {
            //convert to indexedDB
            setTimeout(() => {
                var wid = SystemHtml.WindowHandler.getFreeId()
                SystemHtml.WindowHandler.presets.createInformation("Converting to indexedDB", "Copying files to indexedDB. Please wait a few seconds.");
                setInterval(() => {
                    SystemHtml.WindowHandler.focus(wid);
                }, 10);
            }, 100);
            var table = JSON.parse(localStorage["fileSystemTable"]);
            await this.localStorageConverter(table, "c");

            await new Promise((resolve, reject) => { setTimeout(resolve, 500) });
            localStorage.removeItem("fileSystemTable");
            location.reload();
        }
    }
    async localStorageConverter(data, path) {
        for (var x in data.files) {
            console.log("copying file: ", path + "/" + x, " to indexedDB")
            await this.setFileString(path + "/" + x, localStorage[data.files[x]]);
        }
        for (var x in data.folder) {
            console.log("copying folder: ", path + "/" + x, " to indexedDB")
            await this.createFolder(path, x);
            await this.localStorageConverter(data.folder[x], path + "/" + x);
        }
    }

    async loadPersistandFiles() {
        var save = localStorage.getItem("savedPersistandFiles");
        if (save == null) {
            return;
        }
        save = JSON.parse(save);
        for (var x in save) {
            await this.setFileString(x, save[x]);
        }
        localStorage.removeItem("savedPersistandFiles");
        //var out = await SystemHtml.WindowHandler.presets.createConfirm("Last Session Restore", "Your files have been restored from your last session. To apply changes, the page will be reloaded. Do you want to continue?");
        var out = await SystemHtml.notifications.confirm("Last Session Restore", "Your files have been restored from your last session. To apply changes, the page will be reloaded. Do you want to continue?");
        if (out) {
            location.reload();
        }
    }

    async dbOpen() {
        if (this.db != null) {
            return;
        }
        await this.opdb;
    }

    async reset() {
        //check for files not to delete
        var persistandFileJson = await this.getFileJson("c/persistandFiles.json");
        var save = {};
        for (var x of persistandFileJson) {
            if (await this.fileExists(x)) {
                var dat = await this.getFileString(x, true);
                save[x] = dat;
            }
        }
        localStorage.setItem("savedPersistandFiles", JSON.stringify(save));

        //delete all files
        await this.dbOpen();
        await this.dbWrapper.clear();
    }

    async unpackPackage(data) {
        var p = new packageLoader(data);
        await p.loader(data);
    }

    toImg(str, fileType = "png") {
        return "data:image/" + fileType + ";base64," + btoa(str);
    }

    async loadOptions() {
        var options = await this.getFileJson("c/sys/options/settings.json");
        var so = {};
        for (var x of Object.keys(options)) {
            so[x] = options[x][0];
        }
        this.options = so;
    }

    async getOption(option) {
        try {
            await this.loadOptions();

            return this.options[option];
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async createFolderToFile(path) {
        var folder = path.split("/");
        folder.pop();
        folder = folder.join("/");

        var topFolder = folder.split("/");
        topFolder.pop();
        topFolder = topFolder.join("/");
        if (topFolder != "") {
            if (!(await this.folderExists(topFolder))) {
                await this.createFolderToFile(folder);
            }
        }

        await this.createFolder(topFolder, folder.split("/").pop());
    }

    /**
     * protip: non string data will be converted to string now (JSON.stringify)
     * @param {*} path 
     * @param {*} dat 
     * @param {*} dispatchEvent 
     */
    async setFileString(path, dat, dispatchEvent = true, onlineData = false) {
        await this.dbOpen();
        var flm = Date.now();

        //check if folder containing the file exists
        var folder = path.split("/");
        folder.pop();
        folder = folder.join("/");
        if (!(await this.folderExists(folder))) {
            await this.createFolderToFile(path);
        }

        var beforeDat = (await this.dbWrapper.getFile(path)) || {
            data: {
                path: path,
                data: null,
                info: {
                    lastModified: -1
                }
            }
        };
        var folder = path.split("/");
        folder.pop();
        folder = folder.join("/");

        var fileDataBeforeChange = (beforeDat.data.data + " ").slice(0, -1);

        beforeDat = beforeDat.data;
        if (typeof dat != "string") {
            dat = JSON.stringify(dat);
        }

        if (onlineData != false) {
            beforeDat.onlineData = true;
            beforeDat.onlineDataUrl = onlineData;
            beforeDat.dataDownloaded = true;
        } else if (dat.startsWith(".od__")) {
            beforeDat.onlineData = true;
            beforeDat.onlineDataUrl = dat.slice(5);
            dat = "";
            beforeDat.dataDownloaded = false;
        }
        else {
            beforeDat.onlineData = false;
            beforeDat.onlineDataUrl = null;
            beforeDat.dataDownloaded = false;
        }

        beforeDat.data = dat;
        beforeDat.info.lastModified = Date.now();

        await this.dbWrapper.addFileToFolder(folder, path);
        await this.dbWrapper.putFile(path, beforeDat);
        if (dispatchEvent) {
            if (fileDataBeforeChange != dat) {
                setTimeout(this.changes.send, 1, path, "change");
            }
        }
        /**
         * @type {FileSysFileNew}
         */
        var test = await this.getFile(path);
        var tt = await test.text();
        if (tt != dat) {
            if (test.getInformation().lastModified > flm) {
                console.log("File was changed by another process while setting it.");
                return;
            }
            console.log("modify: ", test.getInformation(), " == ", flm);
            console.error("file not set correctly", path);
            console.log(dat, " || wanted, but got || ", tt);
        }
    }

    async createFile(path) {
        await this.dbOpen();

        if (await this.fileExists(path)) {
            return;
        }
        await this.setFileString(path, "");
    }

    async createFolder(path, name) {
        await this.dbOpen();
        if (await this.folderExists(path + "/" + name)) {
            return;
        }

        await this.dbWrapper.addFolder(path + "/" + name);
    }

    async folderExists(path) {
        await this.dbOpen();
        return await this.dbWrapper.getFolder(path) != null;
    }

    async fileExists(path) {
        await this.dbOpen();
        return await this.dbWrapper.getFile(path) != null;
    }

    async getFileString(path, raw = false) {
        await this.dbOpen();

        var d = await this.dbWrapper.getFile(path);
        if (d == null) {
            return null;
        }
        if (d.data.onlineData == true) {
            var rpodfwd = await this.getOption("replaceOnlineDataFilesWithDownloaded");
            if (d.data.dataDownloaded == true) {
                return d.data.data;
            }

            var d = d.data.onlineDataUrl;
            var dat = await System.network.informationalFetch_Text(d);

            if (rpodfwd) {
                await this.setFileString(path, dat, undefined, d);
            }
            return dat;
        }
        if (d.data.data == null) {
            return null;
        }
        if (raw) {
            return d.data.data;
        }
        var dat = d.data.data;
        if (d.data.data.startsWith(".od__")) {
            var rpodfwd = await this.getOption("replaceOnlineDataFilesWithDownloaded");

            var d = d.data.data.slice(5);
            dat = await System.network.informationalFetch_Text(d);

            if (rpodfwd) {
                await this.setFileString(path, dat, undefined, d);
            }
        }
        return dat;
    }

    async bufferToString(buf) {
        var out = ""
        var view = new Uint8Array(buf);
        for (var x = 0; x < view.length; x++) {
            out += String.fromCharCode(view[x]);
        }
        return out;
    }

    async getFileJson(path) {
        var d = await this.getFileString(path);
        if (d == null) {
            console.error("File does not exist: " + path);
            return null;
        }
        return JSON.parse(d);
    }

    /**
     * 
     * @param {*} path 
     * @returns  {Promise<FileSysFileNew>}
     */
    async getFile(path) {
        await this.dbOpen();
        var beforeDat = (await this.dbWrapper.getFile(path)) || {
            data: {
                path: path,
                data: null,
                info: {
                    lastModified: -1
                }
            }
        };
        beforeDat = beforeDat.data;
        var f = new FileSysFileNew(path, beforeDat);
        return f;
    }

    async getFolder(path) {
        //TODO
    }

    async getFiles(path) {
        await this.dbOpen();
        var folder = await this.dbWrapper.getFolder(path);
        if (folder == null) {
            console.warn("Folder does not exist: " + path);
            return [];
        }
        var d = [];
        for (var x of folder.containingFiles) {
            d.push(x.split("/").pop());
        }
        return d;
    }

    async getFolders(path) {
        await this.dbOpen();
        var folder = await this.dbWrapper.getFolder(path);
        if (folder == null) {
            return [];
        }
        var d = [];
        for (var x of folder.containingFolders) {
            d.push(x.split("/").pop());
        }
        return d;
    }

    async removeFile(path) {
        await this.dbOpen();
        await this.dbWrapper.removeFile(path);
        var folder = path.split("/");
        folder.pop();
        folder = folder.join("/");
        await this.dbWrapper.removeFileFromFolder(folder, path);
        SystemFileSystem.changes.send(path, "remove");
    }
    /**
     * @deprecated
     * @param {*} path 
     */
    async deleteFile(path) {
        await this.removeFile(path);
    }
    async removeFolder(path) {
        await this.dbOpen();
        var folder = path.split("/");
        folder.pop();
        folder = folder.join("/");

        //remove all files in folder
        await this.removeFilesInFolder(path);
        await this.dbWrapper.removeFolderFromFolder(folder, path);

        await this.dbWrapper.removeFolder(path);
    }

    async removeFilesInFolder(path) {
        var files = await this.getFiles(path);
        console.log("files in folder: ", path, files);
        for (var x of files) {
            console.log("remove file: ", path + "/" + x);
            await this.removeFile(path + "/" + x);
        }
        var folders = await this.getFolders(path);
        for (var x of folders) {
            await this.removeFolder(path + "/" + x);
        }
    }

    async moveInFolder(path, to) {
        if (!to) {
            console.error("to is null");
            return;
        }
        if (to == path) {
            console.error("to is path");
            return;
        }
        await this.dbOpen();

        var toPath = to.split("/");
        toPath.pop();
        toPath = toPath.join("/");
        await this.createFolder(toPath, to.split("/").pop());
        await this.moveInFolderR(path, to);

        await this.removeFolder(path);
        var bpath = path.split("/");
        bpath.pop();
        bpath = bpath.join("/");
        await this.createFolder(bpath, path.split("/").pop());
    }

    async moveFile(path, to) {
        await this.dbOpen();
        var dat = await this.getFileString(path, true);
        await this.setFileString(to, dat, false);
        await this.removeFile(path);
    }

    async moveInFolderR(path, to) {
        var folders = await this.getFolders(path);
        for (var x of folders) {
            await this.moveInFolderR(path + "/" + x, to + "/" + x);
        }
        var files = await this.getFiles(path);
        for (var x of files) {
            await this.moveFile(path + "/" + x, to + "/" + x);
        }
    }
}

class OldFileSystemClass {
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
        var x = fastFileLookup[path] != undefined;
        if (x) {
            if (this.realLocalStorage[fastFileLookup[path]] == undefined) {
                x = false;
            }
        }
        return x;
    }
    fileExistsSync(path) {
        var x = fastFileLookup[path] != undefined;
        if (x) {
            if (this.realLocalStorage[fastFileLookup[path]] == undefined) {
                x = false;
            }
        }
        return x;
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
    async getFileStringSync(path, raw = false) {
        if (this.ramFiles == undefined || this.ramFiles[path] == undefined) {
            var r = this.localFileLoadSync(path);
            if (r.startsWith(".od__") && !raw) {
                var d = r.slice(5)
                console.error("fetch not available in sync mode!");
                return null;
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
    localFileLoadSync(path) {
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
                await SystemFileSystem.createFolder(path, x);
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
class FileSysFileNew {
    constructor(path, beforeDat) {
        this.path = path;
        this.info = beforeDat.info;
        this.beforeDat = beforeDat;
    }
    async text() {
        return await SystemFileSystem.getFileString(this.path);
    }
    async remove() {
        console.warn("File: remove not implemented");
        return false
    }
    async rename() {
        console.warn("File: rename not implemented");
        return false
    }
    getInformation() {
        return this.info;
    }
    /**
     * checks if this file is a online data file
     * @return {boolean}
     */
    async isOnlineData() {
        var r = await SystemFileSystem.getFileString(this.path, true);
        if (this.beforeDat.onlineData == true) {
            return true;
        }
        else if (r == undefined) {
            return false;
        }
        if (r.startsWith(".od__")) {
            return true;
        }
        else {
            return false;
        }
    }
    async getOnlineDataLink() {
        var r = await SystemFileSystem.getFileString(this.path, true);
        if (this.beforeDat.onlineData == true) {
            return this.beforeDat.onlineDataUrl;
        } if (r.startsWith(".od__")) {
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
