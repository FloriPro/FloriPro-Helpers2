class piControllerConsolewindow {
    constructor(PATH) {
        this.PATH = PATH
        this.API_URL = "https://192.168.178.92/api/v2/"
    }
    async init(program, programId, parent) {
        console.log("parent:", parent)
        this.parent = parent;
        this.program = program;
        this.programId = programId;

        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Pi Controller",
            //onready:
            async () => {
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                //set html
                await this.window.setContent((await SystemFileSystem.getFileString(this.PATH.folder() + "/console.html")).replaceAll("{{windowId}}", this.window.getId()));
                await this.window.size.setSize(300, 500)
                this.window.size.userCanResize(true)

                this.makeFetch();
                //setInterval(this.makeFetch.bind(this), 1000); //TODO: add again
            });
        this.window.close = () => {
            return true
        }
    }

    async makeFetch() {
        var d = await fetch(this.API_URL + "console",{
            method: "POST",
            body: JSON.stringify({
                "auth": await this.parent.getPass(),
                "consoleId": this.programId
            })
        })
        var data = await d.json();

        console.log(data);
    }
}

class piControllerConsole {
    async init(parent) {
        this.parent = parent;
    }
    async make(program, programId) {
        var window = new piControllerConsolewindow(this.PATH);
        await window.init(program, programId, this.parent);
        return window;
    }
}

new piControllerConsole();