class syncWorkerConnection {
    constructor(url) {
        this.actions = []

        //global variables
        this.actionUpdate = () => { }
        this.onopen = function () { };
        this.onmessage = function () { };
        this.onerror = function () { };
        this.onclose = function () { };
        this.onsend = function () { };
        this.wrongTime = function () { };

        this.url = url;
        this.connection = new WebSocket(url);
        this.connection.onopen = function (event) {
            this.onopen(event);

            this.connection.send(JSON.stringify({ type: "checkTime", time: (Date.now() / 1000) }));
            this.addAction(["checkTime", false, null]);
        }.bind(this);
        this.connection.onmessage = function (event) {
            var d = JSON.parse(event.data);

            if (d.type == "checkTime") {
                if (d.data == "ok") {
                    this.changeAction("checkTime", true, null);
                } else if (d.data == "error") {
                    this.wrongTime();
                } else {
                    if (d.data == undefined) {
                        d.data = "no errror message";
                    }
                    SystemHtml.WindowHandler.presets.createInformation("Error!", "An error occured while checking the time. Please try again later. (Error: '" + d.data + "')")
                }
            }


            if (d.type == "getFilesHash") {
                this.changeAction("getFilesHash", true, false);
            }
            if (d.type == "getFile") {
                this.changeAction(d.path, true, false)
            }
            if (d.type == "accnowledge") {
                this.changeAction(d.path, true, true)
            }
            if (d.type == "delete") {
                this.addAction([d.path, true, false])
            }


            this.onmessage(event);
        }.bind(this);
        this.connection.onerror = function (event) {
            this.onerror(event);
        }.bind(this);
        this.connection.onclose = function (event) {
            this.onclose(event);
        }.bind(this);
    }
    send(data) {
        this.onsend(data);
        if (data.type == "getFilesHash") {
            this.addAction(["getFilesHash", false, false]);
        } else if (data.type == "getFile") {
            this.addAction([data.data, false, false]);
        } else if (data.type == "change") {
            this.addAction([data.path, false, true]);
        } else if (data.type == "delete") {
            this.addAction([data.path, false, true]);
        } else if (data.type == "bulkGet") {
            for (var i = 0; i < data.data.length; i++) {
                this.addAction([data.data[i], false, false]);
            }
        }

        this.connection.send(JSON.stringify(data));
    }

    addAction(action) {
        this.actionUpdate();
        this.actions.push(action);

        //delete old actions
        if (this.actions.length > 20) {
            for (var i = 0; i < this.actions.length; i++) {
                if (this.actions[i][1]) {
                    this.actions.splice(i, 1);
                    return;
                }
            }
        }
    }
    changeAction(action, status, up) {
        this.actionUpdate();
        for (var i = 0; i < this.actions.length; i++) {
            if (this.actions[i][0] == action && this.actions[i][1] != status && this.actions[i][2] == up) {
                this.actions[i][1] = status;
                return;
            }
        }
        this.addAction([action, status, up]);
        return;
    }

    /**
     * @returns {boolean} true if the connection is open
     */
    get connected() {
        var c = this.connection.readyState == this.connection.OPEN;
        return c;
    }
}
syncWorkerConnection;