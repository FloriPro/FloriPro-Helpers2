class easUIWorkerProgram extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
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

        document.body.append(await this.desktop())

        this.createWindow();
        this.updateStartmenu();
    }

    async desktop() {
        var desktop = document.createElement("div");
        desktop.id = "Desktop";
        desktop.style.position = "absolute";
        desktop.style.top = "0px";
        desktop.style.left = "0px";
        desktop.style.width = "100%";
        desktop.style.height = "100%";
        desktop.style.background = "black"//'url("' + SystemFileSystem.toImg(await SystemFileSystem.getFileString((await System.options.get("settings"))["backgroundImage"][0])) + '") center center / cover no-repeat';
        desktop.style.backgroundSize = "cover";
        desktop.style.backgroundRepeat = "no-repeat";
        desktop.style.backgroundPosition = "center";
        desktop.style.textAlign = "center";

        var p = document.createElement("p");
        p.innerText = "Apps:";
        p.style.color = "white";
        desktop.append(p)



        //add programs
        var programs = await System.options.get("programs");
        //var desktopOptions = (await System.options.get("desktop")).all;
        for (var x of Object.keys(programs)) {
            if (programs[x].hidden) continue;
            var div = document.createElement("div");
            var p = document.createElement("p");
            p.innerText = programs[x].name;

            p.style.backgroundColor = "black";
            p.style.color = "white";
            p.style.fontSize = "50px";

            div.appendChild(p);
            div.addEventListener("click", (async (x) => {
                console.log(x);
                await System.run(x.run);
            }).bind(this, programs[x]));

            desktop.appendChild(div);
        }


        return desktop;
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