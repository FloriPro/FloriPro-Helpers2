class syncSyncer {
    /**
     * 
     * @param {syncWorkerProgram} parent 
     */
    constructor(parent) {
        this.init();

        this.hasListener = false;
        /**
         * @type {syncWorkerProgram}
         */
        this.parent = parent;

        this.waitingForAnswer = new class {
            constructor() {
                this.list = [];

                this.update = () => { }
            }

            pop(path) {
                this.list.pop(path);
                this.update();
            }
            push(path) {
                this.list.push(path);
                this.update();
            }
        }();

        this.waitingForAnswer.update = () => {
            if (this.waitingForAnswer.list.length == 0) {
                this.parent.finish();
            } else {
                this.parent.loading();
            }
        }
    }

    async init() {
        this.immuneFiles = await SystemFileSystem.getFileJson("c/programs/sync/worker/immuneFiles.json");
    }

    /**
     * 
     * @param {?string} path 
     * @returns {Promise<string[]>}
     */
    async getUserFiles(path = "c/user") {
        var files = await SystemFileSystem.getFiles(path);
        var filePaths = [];
        for (var i = 0; i < files.length; i++) {
            if (await SystemFileSystem.fileExists(path + "/" + files[i])) {
                filePaths.push(path + "/" + files[i]);
            }
        }

        var folders = await SystemFileSystem.getFolders(path);
        for (var i = 0; i < folders.length; i++) {
            filePaths = filePaths.concat(await this.getUserFiles(path + "/" + folders[i]));
        }

        return filePaths;
    }

    async initialSync() {
        var files = await this.getUserFiles();
        var data = [];
        for (var i = 0; i < files.length; i++) {
            data.push({ path: files[i], data: await SystemFileSystem.getFileString(files[i], true) });
        }
        this.parent.connection.send({ type: "initialSync", data: data });
    }

    async createListener() {
        this.hasListener = true;
        SystemFileSystem.changes.addListener(this.changeListener.bind(this));
    }

    /**
     * 
     * @param {string} path 
     * @param {string} type 
     */
    async changeListener(path, type) {
        console.log(path, type);
        if (!path.startsWith("c/user") && !path.startsWith("c/sys/options")) {
            return;
        }
        if (this.immuneFiles.includes(path)) {
            return;
        }
        this.waitingForAnswer.push(path);
        if (type == "delete") {
            this.parent.connection.send({ type: "delete", path: path });
        }
        else if (type == "change") { //change is the same as create
            this.parent.connection.send({ type: "change", path: path, data: await SystemFileSystem.getFileString(path, true) });
        }
    }

    /**
     * 
     * @param {{string:string}} hashes 
     */
    async updateFiles(hashes) {
        if (await SystemFileSystem.fileExists("c/programs/sync/lastOffline.txt")) {
            var lastonline = parseInt(await SystemFileSystem.getFileString("c/programs/sync/lastOffline.txt"))
        } else {
            var lastonline = -1;
        }
        console.log(lastonline);

        var needsUpdateFiles = [];
        var untrackedFiles = await this.getUserFiles();

        for (var path of Object.keys(hashes)) {
            this.waitingForAnswer.pop(path);
            var hash = hashes[path]["hash"];

            if (!await SystemFileSystem.fileExists(path)) {
                needsUpdateFiles.push(path);
            }
            else if (hash != md5(await SystemFileSystem.getFileString(path, true))) {
                //check if file was changed before last offline
                if (hashes[path]["time"] > lastonline) {
                    needsUpdateFiles.push(path);
                } else {
                    //update the server because the user changed the file, whilest offline, but the file on the server has not changed
                    this.waitingForAnswer.push(path);
                    this.parent.connection.send({ type: "change", path: path, data: await SystemFileSystem.getFileString(path, true) });
                }
            }

            //remove elment from untrackedFiles
            var index = untrackedFiles.indexOf(path);
            if (index > -1) {
                untrackedFiles.splice(index, 1);
            }
        }

        //send untraqcked files
        for (var path of untrackedFiles) {
            if (this.immuneFiles.includes(path)) {
                continue;
            }
            this.waitingForAnswer.push(path);
            this.parent.connection.send({ type: "change", path: path, data: await SystemFileSystem.getFileString(path, true) });
        }

        //get files that need update
        var needsUpdateSanitized = [];
        for (var path of needsUpdateFiles) {
            if (this.immuneFiles.includes(path)) {
                continue;
            }
            needsUpdateSanitized.push(path);
            this.waitingForAnswer.push(path);
            //this.parent.connection.send({ type: "getFile", data: path });
        }
        this.parent.connection.send({ type: "bulkGet", data: needsUpdateSanitized })

        if (!this.hasListener) {
            this.createListener();
        }

        //all files on the server and localy are up to date, this means we are now *fully* online and synced
        if (await SystemFileSystem.fileExists("c/programs/sync/lastOffline.txt")) {
            SystemFileSystem.removeFile("c/programs/sync/lastOffline.txt")
        }
    }
}
syncSyncer;