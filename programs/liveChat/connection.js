class connection {
    constructor(ws) {
        this.ws = ws;

        this.newMessage = () => { };
        this.channelMessages = () => { };
        this.allChannels = () => { };
        this.authFinished = () => { };
        this.userUpdate = () => { };

        this.ws.onmessage = async (event) => {
            console.log(JSON.parse(event.data))
            var data = JSON.parse(event.data);
            if (data["type"] == "channelMessages") {
                this.channelMessages(data["channel"], data["messages"], data["end"]);
            } else if (data["type"] == "message") {
                this.newMessage(data["channel"], data["message"], data["user"]);
            } else if (data["type"] == "channels") {
                this.allChannels(data["channels"]);
            } else if (data["type"] == "alert") {
                SystemHtml.WindowHandler.presets.createInformation("LiveChat | server alert", data["message"])
            } else if (data["type"] == "authOK") {
                this.authFinished();
            }else if (data["type"] == "users"){
                this.userUpdate(data["user"]);
            }
        }

    }
    getChannel(channel) {
        this.ws.send(JSON.stringify({
            "type": "get",
            "dat": {
                "channel": channel
            }
        }))
    }
    getChannels() {
        this.ws.send(JSON.stringify({
            "type": "getChannels"
        }))
    }
    sendMessage(channel, message) {
        this.ws.send(JSON.stringify({
            "type": "message",
            "dat": {
                "channel": channel,
                "message": message
            }
        }))
    }
    authenticate(username) {
        this.username = username;
        this.ws.send(JSON.stringify({
            "type": "auth",
            "dat": {
                "name": username
            }
        }))
    }
}

connection;