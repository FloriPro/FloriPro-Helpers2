class syncWorkerConnection {
    constructor(url) {
        //global variables
        this.onopen = function () { };
        this.onmessage = function () { };
        this.onerror = function () { };
        this.onclose = function () { };

        this.url = url;
        this.connection = new WebSocket(url);
        this.connection.onopen = function (event) {
            this.onopen(event);
        }.bind(this);
        this.connection.onmessage = function (event) {
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
        this.connection.send(JSON.stringify(data));
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