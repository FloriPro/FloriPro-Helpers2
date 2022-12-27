class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Sync",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setInnerSize(300, 500);
                this.window.size.userCanResize(true);

                var status = await System.program.connect.send("syncWorker", { type: "status" });
                (await this.window.getHtmlElement("status")).innerText = status;
                this.handleStatus(status);

                this.wl = this.workerListener.bind(this)
                await System.program.connect.send("syncWorker", { type: "listener", listener: this.wl });

                await this.window.addHtmlEventListener("onclick", "relogin", async () => {
                    (await this.window.getHtmlElement("relogin")).style.display = "none";
                    new authWindow(this);
                }, this);

                this.workerListener({ type: "actionUpdate" });
            });
        this.window.close = () => {
            System.program.connect.send("syncWorker", { type: "unlistener", listener: this.wl })
            this.stop()
            return true
        }
    }

    async handleStatus(status) {
        if (status == "needsAuth") {
            new authWindow(this);
        } else if (status == "noAuth") {
            (await this.window.getHtmlElement("relogin")).style.display = "";
        } else {
            (await this.window.getHtmlElement("relogin")).style.display = "none";
        }
    }
    async workerListener(data) {
        if (data.type == "status") {
            var status = data.status;
            (await this.window.getHtmlElement("status")).innerText = status;
            this.handleStatus(status);
        } else if (data.type = "actionUpdate") {
            console.log("actionUpdate");
            var el = await this.window.getHtmlElement("actions");
            var c = await System.program.connect.send("syncWorker", { type: "actions" });

            el.innerHTML = "";
            for (var x of c) {
                var p = document.createElement("p");
                p.innerText = x[0];
                if (x[1] == true) {
                    p.style.background = "lime";
                } else {
                    //p.style.background = "linear-gradient(90deg, rgba(181,0,0,1) 0%, rgb(255 255 255) 42%, rgba(255,0,0,1) 100%)";
                    p.style.background = "linear-gradient(90deg, rgb(255, 0, 0), rgb(255, 255, 255), rgb(255, 0, 0), rgb(255, 255, 255)) 0% 0% / 300%";
                    p.style.animation = "gradient 1s linear infinite";
                }
                el.prepend(p);
            }
        }
    }
}

class authWindow {
    constructor(parent) {
        this.parent = parent;
        this.init()
    }
    async init() {
        this.window = await SystemHtml.WindowHandler.createWindow("Sync - Auth",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.parent.PATH.folder() + "/logo.webp")

                await this.window.setContent(await SystemFileSystem.getFileString(this.parent.PATH.folder() + "/auth.html"));
                await this.window.size.setInnerSize(500, 400);
                this.window.size.userCanResize(true);

                (await this.window.getHtmlElement("submit")).onclick = async () => {
                    var username = (await this.window.getHtmlElement("username")).value;
                    var password = (await this.window.getHtmlElement("password")).value;

                    await System.program.connect.send("syncWorker", { type: "auth", username: username, password: password });
                    this.window.makeClose();
                }

                (await this.window.getHtmlElement("submitRegister")).onclick = async () => {
                    var username = (await this.window.getHtmlElement("username")).value;
                    var password = (await this.window.getHtmlElement("password")).value;

                    await System.program.connect.send("syncWorker", { type: "register", username: username, password: password });
                    this.window.makeClose();
                }
            });
    }
}

new program();