console.log("New fileSysDownloaderBig.js loaded!");

// loads the file system from the server and saves it in indexedDB
async function downloadFilesys() {
    var d = await fetch("/filesys.json");
    if (!d.ok) {
        throw new Error("file system file not found! (" + d.status + ")");
    }
    return await d.text();
}

function hasError(e, msg) {
    console.error(e);
    document.querySelector("#status").innerText = document.querySelector("#status").innerText + "\n" + document.querySelector("#status").innerText.split("\n").length + ". " + msg;
    document.querySelector("#status").className = "error";
}
function setMessage(msg) {
    document.querySelector("#status").innerText = document.querySelector("#status").innerText + "\n" + document.querySelector("#status").innerText.split("\n").length + ". " + msg;
}

const debug = false;

async function tryRun(func, msg, ...args) {
    if (debug) {
        return await func(...args);
    }
    try {
        return await func(...args);
    } catch (e) {
        hasError(e, msg);
        throw "Error";
    }
}
function tryRunSync(func, msg, ...args) {
    if (debug) {
        return func(...args);
    }
    try {
        return func(...args);
    } catch (e) {
        hasError(e, msg);
        throw "Error";
    }
}

class dbWrapper {
    constructor() {
        /**
         * @type {IDBDatabase} db
         */
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
            /**
             * @type {IDBDatabase} db
             */
            var db = event.target.result;
            if (!db.objectStoreNames.contains('files')) {
                var co = db.createObjectStore('files', { keyPath: 'path' });
                co.createIndex('path', 'path', { unique: true });
                co.createIndex('data', 'data', { unique: false });
            }

            if (!db.objectStoreNames.contains('fileStructure')) {
                var co = db.createObjectStore('fileStructure', { keyPath: 'path' });
                co.createIndex('path', 'path', { unique: true });
                co.createIndex('data', 'data', { unique: false });
            }
        }
        dbPromise.onerror = function (event) {
            console.error("Database error: " + event.target.errorCode);
            p.reject(event.target.errorCode);
        }
        dbPromise.onsuccess = function (event) {
            this.db = event.target.result;
            p.resolve(event.target.result);
        }.bind(this);
        await p.promise;
        return this.db;
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
            console.error("Database error: " + event.target.errorCode);
            p.reject(event.target.errorCode);
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
            console.error("Database error: " + event.target.errorCode);
            p.reject(event.target.errorCode);
        }
        request.onsuccess = function (event) {
            var data = event.target.result;
            data.data.containingFolders.push(path);
            var request2 = objectStore.put(data);
            request2.onerror = function (event) {
                console.error("Database error: " + event.target.errorCode);
                p.reject(event.target.errorCode);
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
            console.error("Database error: " + event.target.errorCode);
            p.reject(event.target.errorCode);
        }
        request.onsuccess = function (event) {
            var data = event.target.result;
            data.data.containingFiles.push(path);
            var request2 = objectStore.put(data);
            request2.onerror = function (event) {
                console.error("Database error: " + event.target.errorCode);
                p.reject(event.target.errorCode);
            }
            request2.onsuccess = function (event) {
                p.resolve(event.target.result);
            }
        }
        return await p.promise;
    }

    async getAllKeys() {
        var p = this.createPromise();
        var transaction = this.db.transaction(['files'], 'readonly');
        var objectStore = transaction.objectStore('files');
        var request = objectStore.getAllKeys();
        request.onerror = function (event) {
            console.error("Database error: " + event.target.errorCode);
            p.reject(event.target.errorCode);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }
        return await p.promise;
    }

    async get(path) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['files'], 'readonly');
        var objectStore = transaction.objectStore('files');

        var request = objectStore.get(path);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.errorCode);
            p.reject(event.target.errorCode);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }
        return await p.promise;
    }
    async put(path, data) {
        var p = this.createPromise();
        var transaction = this.db.transaction(['files'], 'readwrite');
        var objectStore = transaction.objectStore('files');
        var request = objectStore.put({
            path: path,
            data: {
                path: path,
                data: data,
                info: {
                    lastModified: Date.now()
                }
            }
        });
        request.onerror = function (event) {
            console.error("Database error: " + event.target.errorCode);
            p.reject(event.target.errorCode);
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
            console.error("Database error: " + event.target.errorCode);
            p.reject(event.target.errorCode);
        }
        request.onsuccess = function (event) {
            p.resolve(event.target.result);
        }

        var p2 = this.createPromise();
        var transaction2 = this.db.transaction(['fileStructure'], 'readwrite');
        var objectStore2 = transaction2.objectStore('fileStructure');
        var request2 = objectStore2.clear();
        request2.onerror = function (event) {
            console.error("Database error: " + event.target.errorCode);
            p2.reject(event.target.errorCode);
        }
        request2.onsuccess = function (event) {
            p2.resolve(event.target.result);
        }

        await p2.promise;
        await p.promise;

        return
    }
}

(async () => {
    // check if indexedDB is supported
    if (!window.indexedDB) {
        hasError("indexedDB not supported!", "Error Initializing OS: indexedDB not supported!"); return;
    }

    setMessage("Initializing file system database...");
    var db = new dbWrapper();
    await tryRun(() => db.init(), "Error Initializing OS: Can't initialize file system database!");

    setMessage("Checking file system database...");
    //check if a file system is already stored
    var fs = await tryRun(() => db.get("c/boot.dat"), "Error Initializing OS: Can't get file system from database!", "fileSystem", "fileSystem");
    if (fs) {
        setMessage("File system already stored in database!");
        if (localStorage['info'] == 'reset') {
            setMessage("Resetting file system...");
            await tryRun((db) => db.clear(), "Error Initializing OS: Can't reset file system!", db);
            setMessage("File system reset!");
            localStorage['info'] = '';
        } else {
            tryRun(runSystem, "Error Initializing OS: Can't run system!", db)
            return;
        }
    }


    setMessage("Downloading file system file...");
    var dat = await tryRun(downloadFilesys, "Error Initializing OS: Can't download file system file!");
    var d = tryRunSync(() => JSON.parse(dat), "Error Initializing OS: Can't parse file system file!");

    setMessage("Initializing file system...");
    await tryRun((db) => db.addFolder("c"), "Error Initializing OS: Can't initialize file system!", db);
    await tryRun(() => adder(d, "c", db), "Error Initializing OS: Can't load file system into database!");

    //delay 500ms to make sure everything is stored in the database

    setMessage("File system initialized!");
    tryRun(runSystem, "Error Initializing OS: Can't run system!", db)
})();

async function runSystem(db) {
    setMessage("Running system...");

    var boot = await tryRun((db) => db.get("c/boot.dat"), "Error Initializing OS: Can't get boot file from database!", db);
    for (var x of boot.data.data.split("\n")) {
        x = x.replace("\r", "");
        var fileData = await tryRun((db) => db.get(x), "Error Initializing OS: Can't get file from database!", db);
        if (fileData) {
            eval(fileData.data.data);
        } else {
            hasError("Warning: File " + x + " not found!", "Warning: File " + x + " not found!")
        }
    }
}

async function adder(data, pathbefore, db) {
    for (var i in data) {
        var path = pathbefore + "/" + i;
        if (typeof data[i] == "string") {
            //lowercase
            setMessage("Adding file " + path);
            path = path;
            await db.put(path, b64_to_utf8(data[i]));
            await db.addFileToFolder(pathbefore, path);
        } else {
            setMessage("Adding folder " + path);
            await db.addFolder(path);
            await adder(data[i], path, db);
        }
    }
}

function b64_to_utf8(str) {
    try {
        str = str.replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(str)));
    } catch {
        return window.atob(str);
    }
}