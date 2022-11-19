class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.ws = new WebSocket("wss://liveChat.floriprolohner.repl.co")
        this.ws.onopen = () => {
            console.log("OPEN");
        }
        this.ws.onclose = function (event) {
            console.error(event);
        }
        this.ws.onmessage = async (event) => {
            var data = JSON.parse(event.data);
            var e = await this.window.getHtmlElement("consoleLog")

            var p = document.createElement("p");
            var st = document.createElement("span");
            st.style.color = "gray"
            st.innerText = data["user"] + ": "

            var sm = document.createElement("span");
            sm.style.color = "white"
            sm.innerText = data["message"]

            p.append(st);
            p.append(sm);
            e.prepend(p);
        }

        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Live Chat",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(200, 300)
                await this.window.size.userCanResize(true)


                //add event listeners
                await this.window.addHtmlEventListener("onkeyup", "send", async (thi, __, ___, event) => {
                    if (event.keyCode == 13) {
                        var u = (await this.window.getHtmlElement("username")).value
                        if (u == "") {
                            u = "?"
                        }
                        this.ws.send(JSON.stringify({ "username": u, "message": event.target.value }))
                        event.target.value = '';
                    }
                }, this);
            });
        this.window.close = () => {
            this.ws.close();
            this.stop()
            return true
        }
    }
    async send() {
        console.log("send!");
    }
}
new program();