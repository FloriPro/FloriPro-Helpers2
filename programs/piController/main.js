class piControllerMainProgram extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.API_URL = "https://192.168.178.92/api/v2/"
        if (location.protocol == "http:") {
            //this.API_URL = this.API_URL.replace("https", "http")
        }

        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Pi Controller",
            //onready:
            async () => {
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                //set html
                await this.window.setContent((await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html")).replace("{{ style }}", "<style>" + (await SystemFileSystem.getFileString(this.PATH.folder() + "/style.css")) + "</style>").replaceAll("{{windowId}}", this.window.getId()));

                this.setStatus("Loading...")
                await this.window.size.setSize(600, 500)
                this.window.size.userCanResize(true)

                if (!await this.checkAuth()) {
                    await this.createAuth()
                }
                this.displayRunning()
            });
        this.window.close = () => {
            this.stop()
            return true
        }

        /**
         * @type {piControllerConsole}
         */
        this.consoleWindow = await System.program.runProgram(this.PATH.folder() + "/console.js", this);
    }

    async setStatus(status) {
        (await this.window.getHtmlElement("status")).innerText = status
    }

    async getPass() {
        try {
            var opt = await SystemFileSystem.getFileJson(this.PATH.folder() + "/options.json")
            return opt.pass
        } catch (e) {
            await this.setPass("")
            return ""
        }
    }
    async setPass(pass) {
        await SystemFileSystem.setFileString(this.PATH.folder() + "/options.json", JSON.stringify({
            pass: pass
        }))
    }

    async createAuth() {
        this.setStatus("Waiting for user input...")
        var pass = await SystemHtml.WindowHandler.presets.createStringSelect("Password", "Please enter the password for the pi");
        await this.setPass(pass)
        var r = await this.checkAuth()
        if (!r) {
            var re = await SystemHtml.WindowHandler.presets.createConfirm("Error", "Could not create auth! Retry?")
            if (re) {
                await this.createAuth()
            }
        }
    }


    async checkAuth() {
        this.setStatus("Checking auth...")
        var r = await (await fetch(this.API_URL, {
            "method": "POST",
            "body": JSON.stringify({
                "auth": await this.getPass()
            })
        })).text()
        var dat = JSON.parse(r)
        if (dat.auth) {
            this.setStatus("Auth ok!")
        } else {
            this.setStatus("Auth failed!")
        }
        return dat.auth;
    }

    async displayRunning() {
        var r = await this.getRunning()
        this.setStatus("Displaying running...")

        var runningDiv = await this.window.getHtmlElement("consoles")
        runningDiv.innerHTML = ""

        for (var x in r) {
            var prog = r[x];
            var div = this.createProgramDiv(prog, x);
            runningDiv.appendChild(div)
        }

        this.setStatus("Ok!")
    }
    createProgramDiv(prog, i) {
        var div = document.createElement("div");
        div.classList.add("runningProgramm");

        var pDescr = document.createElement("p");
        pDescr.innerText = prog.description;
        div.appendChild(pDescr);

        var pCommand = document.createElement("p");
        pCommand.innerText = prog.path[0] + " >> " + prog.path[1];;
        div.appendChild(pCommand);

        div.addEventListener("click", this.onProgramClick.bind(this, prog, i))

        return div;
    }

    onProgramClick(prog, id) {
        this.consoleWindow.make(prog, id)
    }

    async getRunning() {
        this.setStatus("Getting running...")
        var r = await (await fetch(this.API_URL + "running", {
            "method": "POST",
            "body": JSON.stringify({
                "auth": await this.getPass()
            })
        })).text()
        var dat = JSON.parse(r)

        this.setStatus("Got running...")
        return dat.programs;
    }
}
new piControllerMainProgram();