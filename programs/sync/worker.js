// Worker *allways* runs in in the background, the window only "connects" to it when needed

class syncWorkerProgram extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        //load md5
        await System.getLib("md5");

        /**
         * @type {syncSyncer}
         */
        this.sync = new (await System.run(this.PATH.folder() + "/worker/sync.js"))(this);

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

        this.start();
    }

    set status(status) {
        if (this.abstractStatus == status) return;
        this.workerListener.forEach((listener) => {
            listener({ type: "status", status: status });
        });
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

    async start(register = false) {
        this.status = "offline";
        this.options = await SystemFileSystem.getFileJson("c/user/sync/options.json")

        /**
         * @type {syncWorkerConnection}
         */
        this.connection = new (await System.run(this.PATH.folder() + "/worker/connection.js"))(this.url)
        this.connection.onerror = async (event) => {
            this.connection = new (await System.run(this.PATH.folder() + "/worker/connection.js"))(this.url)
        }
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
            this.sync.waitingForAnswer.pop(data.path);
            await SystemFileSystem.setFileString(data.path, data.data);
        }else if (data.type == "accnowledge"){
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