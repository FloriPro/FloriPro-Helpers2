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
        this.darkmode = (await SystemFileSystem.getFileJson("c/user/easyUI/settings.json")).darkmode;
        console.log("init overwriten")

        //load css
        var css = await SystemFileSystem.getFileString("c/programs/easyUI/style.css");
        var style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);

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
        document.body.classList.add("disable-select");

        await this.makeNewDesktop();

        this.createWindow();
        this.updateStartmenu();
        this.taskbar();


        //check for weird stuff
        this.shouldBeRemoved = [];
        this.setInterval((() => {
            for (var x of document.querySelectorAll("._remove")) {
                if (this.shouldBeRemoved.includes(x)) {
                    x.remove();
                    continue;
                }
                this.shouldBeRemoved.push(x);
            }
        }).bind(this), 500);

        setTimeout(async () => {
            if ((await System.options.get("settings"))["automaticFullscreen"][0]) {
                var r = await SystemHtml.WindowHandler.presets.createConfirm("EasyUI", "The Setting: 'Automatic Fullscreen' is not supported by EasyUI. Should it be disabled?");
                if (r) {
                    System.options.addValue("settings", "automaticFullscreen", [false, "bool"], true);
                }
            }
        }, 1000);
    }
    elementFromHtml(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        return div;
    }

    async makeNewDesktop() {
        document.body.innerHTML += await SystemFileSystem.getFileString(this.PATH.folder() + "/Desktop.html");

        document.querySelector("#DesktopExtension").innerHTML = await SystemFileSystem.getFileString(this.PATH.folder() + "/extensions.html");

        document.querySelector("#DesktopMoreMenuMore").addEventListener("click", async () => {
            var menu = document.querySelector("#DesktopExtension");
            menu.classList.toggle("hidden");
        });

        document.querySelector("#bottom-arror-arrow").addEventListener("click", async () => {
            var programs = document.querySelector("#DesktopPrograms");
            programs.classList.toggle("hidden");

            var arrow = document.querySelector("#bottom-arror-arrow");
            arrow.classList.toggle("rotate");
        });

        SystemHtml.desktop.buildDesktop = this.ReBuildDesktop.bind(this);

        await this.ReBuildDesktop();
    }
    async ReBuildDesktop() {
        document.querySelector("#DesktopApps").innerHTML = "";

        //add desktop programs
        var app = await SystemFileSystem.getFileString(this.PATH.folder() + "/app.html");

        var programs = (await System.options.get("desktop"))["all"];
        for (var prog of programs) {
            var div = this.elementFromHtml(app.replace("%%imgsrc%%", prog.icon));

            div.querySelector(".apptext").innerText = prog.name;
            div.querySelector(".appclick").addEventListener("click", (async (x) => {
                await System.run(x.run);
            }).bind(this, prog));

            document.querySelector("#DesktopApps").appendChild(div);
        }

        //add all programs
        var program = await SystemFileSystem.getFileString(this.PATH.folder() + "/program.html");
        document.querySelector("#DesktopPrograms").innerHTML = "";

        var programs = await System.options.get("programs");
        for (var x of Object.keys(programs)) {
            if (programs[x].hidden) continue;
            var div = this.elementFromHtml(program);

            div.querySelector(".apptext").innerText = programs[x].name;
            div.querySelector(".appclick").addEventListener("click", (async (x) => {
                await System.run(x.run);
            }).bind(this, programs[x]));

            document.querySelector("#DesktopPrograms").appendChild(div);
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
                if (r.removed) return;

                var umog = r.size.updateMax.bind(r.size);
                r.size.updateMax = async () => {
                    var ot = r.size.transitionTime;
                    r.size.transitionTime = 0;
                    await umog();
                    r.size.transitionTime = ot;

                    if (!r.size.fullMax) {
                        if (r.removed) return;
                        await r.size.setSize(window.innerWidth, window.innerHeight - (this.darkmode ? 0 : 0));
                    }
                }

                var o = r.size.setMax.bind(r.size);
                r.size.setMax = async (...ar) => {
                    var ret = await o(...ar);
                    r.size.max = true;

                    if (r.removed) return;

                    await r.size.setSize(window.innerWidth, window.innerHeight - (this.darkmode ? 0 : 0));

                    return ret;
                }

                r.size.backFromFullMax = async () => {
                    if (r.removed) return;
                    r.size.setMax();
                };
                r.size.setMax();
                r.size.setMax = r.size.setMax;
                r.size.notMax = r.size.setMax;
                setTimeout(() => {
                    r.size.setMax();
                }, 10);

                //replace titelbar
                var html = r.getHtml()
                if (this.darkmode) {
                    html.style.backgroundColor = "rgb(44, 43, 43)";
                    html.querySelector(".content").style.backgroundColor = "rgb(44, 43, 43)";
                    html.querySelector(".content").style.color = "white";
                }

                var titlebar = html.querySelector(".title-bar")
                titlebar.style.cursor = "default";
                if (this.darkmode) {
                    titlebar.style.background = "#242323";
                    titlebar.style.color = "white";
                    titlebar.style.boxShadow = "0px 0px 10px 2px rgb(0 0 0 / 58%)";
                    titlebar.style.position = "relative";
                    titlebar.querySelector(".title-bar-text").style.color = "white";
                }

                titlebar.querySelector(".title-bar-controls").style.display = "none";

                var feu = document.createElement("div");
                feu.innerHTML = `
                <div style="display: flex;align-items: center;background: #2c2b2b;box-shadow: 0px 0px 30px 30px #2c2b2b;height: 0;">
                    <img imgsrc="c/sys/imgs/color.webp" style="border-radius: 10px" />
                    <p style="color: #58e384">FluLu.eu</p>
                </div>
                `

                var back = document.createElement("button");
                back.innerText = "<back"
                back.onclick = () => {
                    r.makeClose();
                }

                titlebar.prepend(feu);
                titlebar.prepend(back);

                //notify window, that easyUI is enabled
                r.appearence.easyUI = true;
                if (r.appearence.notifyUI != undefined) r.appearence.notifyUI();
            }, 10);

            r.darkmode = this.darkmode;

            return r;
        }
    }
    updateStartmenu() {
        SystemHtml.updateStartmenu = (async () => {
            await this.ReBuildDesktop()
        }).bind(this);
    }
    taskbar() {
        var og = SystemHtml.WindowHandler.updateTaskBar.bind(SystemHtml.WindowHandler);
        SystemHtml.WindowHandler.updateTaskBar = () => {
            og();

            //hide the DesktopNew, when a window is open
            for (var x of Object.keys(SystemHtml.WindowHandler.windows)) {
                if (SystemHtml.WindowHandler.windows[x].appearence.shown) {
                    document.querySelector("#DesktopNew").style.display = "none";
                    return;
                }
            }
            document.querySelector("#DesktopNew").style.display = "";
        }
    }
}

new easUIWorkerProgram();