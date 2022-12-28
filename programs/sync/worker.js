// Worker *allways* runs in in the background, the window only "connects" to it when needed

class syncWorkerProgram extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        //load md5
        await System.getLib("md5");

        this.immuneFiles = await SystemFileSystem.getFileJson("c/programs/sync/worker/immuneFiles.json")

        /**
         * @type {syncSyncer}
         */
        this.sync = new (await System.run(this.PATH.folder() + "/worker/sync.js"))(this);
        this.pic = new (await System.run(this.PATH.folder() + "/worker/statuspic.js"))(this);

        this.abstractStatus = "offline";
        this.workerListener = []

        this.url = "wss://sync.flulu.eu"

        this.setPublicListener(this.message.bind(this), "syncWorker")

        //get username and password
        if (!await SystemFileSystem.fileExists("c/user/sync/options.json")) {
            SystemFileSystem.setFileString("c/user/sync/options.json", JSON.stringify({ username: "", password: "" }));
            this.status = "needsAuth";
            return;
        }

        this.setInterval(this.checkws.bind(this), 1000);

        this.start();
    }

    set status(status) {
        if (this.abstractStatus == status) return;
        this.workerListener.forEach((listener) => {
            listener({ type: "status", status: status });
        });
        this.pic.setStatus(status);
        this.abstractStatus = status;
    }
    /**
     * <b>needsAuth</b>: no username and password saved;
     * <b>noAuth</b>: username and password saved, but authentification failed;
     * <b>authWait</b>: username and password saved, authentification in progress;
     * <b>syncing</b>: currently syncing files;
     * <b>idle</b>: waiting because we are lazy;
     * <b>synced</b>: synced all files. waiting for changes;
     * <b>offline</b>: no connection to server. waiting for connection. Retrying everytime it fails;<br>
     * @type {string}
     */
    get status() {
        return this.abstractStatus;
    }

    async checkws() {
        if (this.connection == undefined) return;
        if (this.connection.connection.readyState == this.connection.connection.CLOSED || this.connection.connection.readyState == this.connection.connection.CLOSING) {
            //is offline!
            if (!await SystemFileSystem.fileExists("c/programs/sync/lastOffline.txt")) {
                SystemFileSystem.setFileString("c/programs/sync/lastOffline.txt", (Date.now() / 1000) + "") //save first offline time in seconds in utc time
            }

            this.start();
        }
    }

    async start(register = false) {
        this.status = "offline";
        this.options = await SystemFileSystem.getFileJson("c/user/sync/options.json")

        /**
         * @type {syncWorkerConnection}
         */
        this.connection = new (await System.run(this.PATH.folder() + "/worker/connection.js"))(this.url)
        if (register) {
            this.connection.onopen = async (event) => {
                this.status = "authWait";
                this.connection.send({ type: "register", username: this.options.username, password: this.options.password })
            };
        } else {
            this.connection.onopen = async (event) => {
                this.status = "authWait";
                this.connection.send({ type: "auth", username: this.options.username, password: this.options.password })
            };
        }
        this.connection.onmessage = this.msg.bind(this);
        this.connection.actionUpdate = () => {
            this.workerListener.forEach((listener) => {
                listener({ type: "actionUpdate" });
            });
        }
    }

    async msg(event) {
        var data = JSON.parse(event.data);
        if (data.type == "auth") {
            if (data.status == false) {
                this.status = "noAuth";
            }
            else if (data.status == true) {
                this.status = "syncing";
            }

            if (data.dat == "register") {
                this.connection.send({ type: "getFilesHash" });
            }
            else if (data.dat == "login") {
                this.connection.send({ type: "getFilesHash" });
            }
        }
        else if (data.type == "getFilesHash") {
            this.sync.updateFiles(data.data);
        }
        else if (data.type == "getFile") {
            if (!this.immuneFiles.includes(data.path)) {
                await SystemFileSystem.setFileString(data.path, data.data, false);
            }

            var c = await SystemFileSystem.getFileJson("c/programs/sync/worker/changeCommands.json")
            if (Object.keys(c).includes(data.path)) {
                eval(c[data.path])
            }

            this.sync.waitingForAnswer.pop(data.path);
        }
        else if (data.type == "delete") {
            await SystemFileSystem.removeFile(data.path);
        }
        else if (data.type == "accnowledge") {
            this.sync.waitingForAnswer.pop(data.path);
        }
    }

    async message(data) {
        if (data.type == "status") {
            return this.status;
        }
        else if (data.type == "auth") {
            //save username and password
            SystemFileSystem.setFileString("c/user/sync/options.json", JSON.stringify({ username: data.username, password: data.password }));
            this.start();
        } else if (data.type == "register") {
            //save username and password
            SystemFileSystem.setFileString("c/user/sync/options.json", JSON.stringify({ username: data.username, password: data.password }));

            this.start(true);
        }
        else if (data.type == "listener") {
            this.workerListener.push(data.listener)
        }
        else if (data.type == "unlistener") {
            this.workerListener.splice(this.workerListener.indexOf(data.listener), 1)
        }
        else if (data.type == "actions") {
            if (this.connection == undefined) return [];
            return this.connection.actions;
        }

        return "unknown message";
    }
    finish() {
        this.status = "synced";
    }
    loading() {
        this.status = "syncing";
    }
}
new syncWorkerProgram();