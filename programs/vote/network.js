class n {
    constructor() {
        this.create();
        this.onupdate = (data) => { };
        this.tries = 0;
    }

    create() {
        this.ws = new WebSocket("wss://vote.flulu.eu/api/ws/updateListener");
        this.ws.onmessage = (msg) => {
            var data = JSON.parse(msg.data);
            console.log(data);
            this.onupdate(data);
        }

        this.ws.onopen = () => {
            this.tries = 0;
            console.log("ws open");
        }

        //reload on ws close
        this.ws.onclose = (err) => {
            if (err.wasClean) {
                console.log("ws closed");
            } else {
                if (this.tries < 5) {
                    setTimeout(() => {
                        this.tries++;
                        this.create();
                    }, 1000);
                }
            }
        }

        this.ws.onerror = (err) => {
            console.log(err);
        }
    }


    //set poll to listen to
    setPoll(pollId) {
        //send to server
        this.send(JSON.stringify({
            type: "setPoll",
            pollId: pollId
        }));
    }

    //cancel listening to poll
    cancelPoll() {
        //send to server
        this.send(JSON.stringify({
            type: "cancelPoll"
        }));
    }

    //function that caches the sends until the ws is open
    send(data) {
        if (this.ws.readyState == 1) {
            this.ws.send(data);
        } else {
            setTimeout(() => {
                this.send(data);
            }, 100);
        }
    }
}
n;