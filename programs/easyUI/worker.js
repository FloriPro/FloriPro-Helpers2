class easUIWorkerProgram extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        //check if should be on
        if (!(await SystemFileSystem.getFileJson("c/user/easyUI/settings.json")).status) {
            this.stop();
            return;
        }
        console.log("init overwriten")

        document.body.appendChild(document.querySelector("#stuff"));

        var hidden = document.createElement("div");
        document.body.appendChild(hidden);
        hidden.id = "hidden";
        hidden.style.display = "none";

        hidden.appendChild(document.querySelector("#Desktop"));
        hidden.appendChild(document.querySelector("#taskbar"));
        hidden.appendChild(document.querySelector("#StartMenu"));
        hidden.appendChild(document.querySelector("#moveWindowOverlay"));
        hidden.appendChild(document.querySelector("#all"));

        document.querySelector("#all").style.background = "";

        document.body.style.webkitOverflowScrolling = 'touch';

        await this.desktop();

        this.createWindow();
        this.updateStartmenu();
    }
    elementFromHtml(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        return div;
    }

    async desktop() {
        document.body.innerHTML += await SystemFileSystem.getFileString(this.PATH.folder() + "/Desktop.html");

        document.querySelector("#DesktopExtension").innerHTML = await SystemFileSystem.getFileString(this.PATH.folder() + "/extensions.html");

        //add programs
        var app = await SystemFileSystem.getFileString(this.PATH.folder() + "/app.html");

        var programs = await System.options.get("programs");
        for (var x of Object.keys(programs)) {
            if (programs[x].hidden) continue;

            var div = this.elementFromHtml(app);

            div.querySelector(".apptext").innerText = programs[x].name;
            div.querySelector(".appclick").addEventListener("click", (async (x) => {
                console.log(x);
                await System.run(x.run);
            }).bind(this, programs[x]));

            document.querySelector("#DesktopApps").appendChild(div);
        }
    }

    createWindow() {
        var og = SystemHtml.WindowHandler.createWindow.bind(SystemHtml.WindowHandler);
        SystemHtml.WindowHandler.createWindow = async (...a) => {
            /**
             * @type {HtmlWindow}
             */
            var r = await og(...a);

            setTimeout(() => {
                var o = r.size.setMax.bind(r.size);
                r.size.setMax = async (...ar) => {
                    var ret = await o(...ar);

                    await r.size.setSize(window.innerWidth, window.innerHeight);

                    r.size.fullMax = true;

                    return ret;
                }

                r.size.backFromFullMax = async () => {
                    r.size.setMax();
                };
                r.size.setMax();
                r.size.setMax = r.size.setMax;
                r.size.notMax = r.size.setMax;

                //replace titelbar
                var html = r.getHtml()
                var titlebar = html.querySelector(".title-bar")
                titlebar.style.cursor = "default";

                titlebar.querySelector(".title-bar-controls").style.display = "none";

                var back = document.createElement("button");
                back.innerText = "<back"
                back.onclick = () => {
                    r.makeClose();
                }

                titlebar.prepend(back)
            }, 10);

            return r;
        }
    }
    updateStartmenu() {
        SystemHtml.updateStartmenu = (async () => {
            document.querySelector("#Desktop").remove();
            document.body.append(await this.desktop())
        }).bind(this);
    }
}

new easUIWorkerProgram();