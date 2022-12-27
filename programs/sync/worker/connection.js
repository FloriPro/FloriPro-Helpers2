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

        this.url = url;
        this.connection = new WebSocket(url);
        this.connection.onopen = function (event) {
            this.onopen(event);
        }.bind(this);
        this.connection.onmessage = function (event) {
            var d = JSON.parse(event.data);
            if (d.type == "getFilesHash") {
                this.changeAction("getFilesHash", true);
            }
            if (d.type == "getFile") {
                this.changeAction(d.path, true)
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
            this.addAction(["getFilesHash", false]);
        } else if (data.type == "getFile") {
            this.addAction([data.data, false]);
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
    changeAction(action, status) {
        this.actionUpdate();
        for (var i = 0; i < this.actions.length; i++) {
            if (this.actions[i][0] == action && this.actions[i][1] != status) {
                this.actions[i][1] = status;
                return;
            }
        }
        console.error("Action not found");
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