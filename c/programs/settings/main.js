class program extends System.program.default {
    async init() {
        this.settings = {
            "Desktop": {
                "Edit desktop": {
                    "type": "button",
                    "description": "Edit desktop",
                    "action": async () => {
                        await System.program.runProgram("c/programs/legacySettings/desktop.js")
                    }
                },
                "Desktop Icon Align": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["alignDeskopIconsToGrid"][0];
                    },
                    "description": "Align desktop icons to grid",
                    "action": async () => {
                        await this.directChange("alignDeskopIconsToGrid");
                        this.settingsData["Desktop"]["Desktop Icon Align"].update();
                    }
                },
                "Background Image": {
                    "type": "button",
                    "description": "Set background image",
                    "action": async () => {
                        this.directChange("backgroundImage");
                    }
                }
            },
            "Updates": {
                "Check for updates": {
                    "type": "button",
                    "description": "Check for updates",
                    "action": async () => {
                        this.settingsInDom["Updates"]["Update status"].innerText = "Checking for updates...";
                        System.network.fetch("version", { cache: "no-store" }).then(async (response) => {
                            var v = await response.text()
                            if (v == VERSION) {
                                this.settingsInDom["Updates"]["Update status"].innerText = "Newest version! " + VERSION;
                            } else {
                                this.settingsInDom["Updates"]["Update status"].innerText = "Update available! " + VERSION + " -> " + v;
                            }
                            this.settingsInDom["Updates"]["Update"].style.display = "block";
                        })
                    }
                },
                "Update status": {
                    "type": "text",
                    "default": "Click 'Check for updates' to check for updates",
                    "description": "Update status",
                },
                "Update": {
                    "type": "button",
                    "description": "Update",
                    "action": async () => {
                        await System.run("c/programs/legacySettings/update.js");
                    },
                    "display": "none"
                }
            },
            "Accessibility": {
                "Instant reset": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["resetWithoutQuestion"][0];
                    },
                    "description": "Instant reset",
                    "action": async () => {
                        await this.directChange("resetWithoutQuestion");
                        this.settingsData["Accessibility"]["Instant reset"].update();
                    }
                },
                "Phone Rightclick": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["long click for rightclick"][0];
                    },
                    "description": "Phone Rightclick",
                    "action": async () => {
                        await this.directChange("long click for rightclick");
                        this.settingsData["Accessibility"]["Phone Rightclick"].update();
                    }
                },
                "Startup Disclaimer": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["startupDisclaimer"][0];
                    },
                    "description": "Startup Disclaimer",
                    "action": async () => {
                        await this.directChange("startupDisclaimer");
                        this.settingsData["Accessibility"]["Startup Disclaimer"].update();
                    }
                },
            },
            "Analytics": {
                "Allow analytics": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["analytics"][0];
                    },
                    "description": "Allow analytics",
                    "action": async () => {
                        await this.directChange("analytics");
                        this.settingsData["Analytics"]["Allow analytics"].update();
                    }
                },
                "Share IP": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["ip-spende"][0];
                    },
                    "description": "Share IP",
                    "action": async () => {
                        await this.directChange("ip-spende");
                        this.settingsData["Analytics"]["Share IP"].update();
                    }
                },
            },
        }

        this.selectedId = 0;

        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Settings",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                if (this.window.darkmode != true) {
                    var style = await SystemFileSystem.getFileString(this.PATH.folder() + "/styleLight.css")
                } else {
                    var style = await SystemFileSystem.getFileString(this.PATH.folder() + "/styleLight.css")
                }

                style = "<style>" + style + "</style>";

                await this.window.setContent((await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html")).replace("{{style}}", style).replaceAll("{{windowId}}", this.window.getId()));
                await this.window.size.setSize(520, 400);
                //if window width is smaller than 520px, the window will be resized to the minimum width
                if (window.innerWidth < 520) {
                    await this.window.size.setSize(window.innerWidth - 50, 400);
                }


                this.window.size.userCanResize(true);

                await this.loadSettings();
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async loadSettings() {
        this.settingsInDom = {};
        this.settingsData = {};
        var s = await this.window.getHtmlElement("selection");
        s.innerHTML = "";


        for (var x in this.settings) {
            var p = document.createElement("p");
            p.innerText = x;
            p.classList.add("coolbutton");
            p.onclick = this.select.bind(this, x);

            s.append(p);
        }

        await this.select(Object.keys(this.settings)[this.selectedId]);
    }

    async select(name) {
        //add selected class
        var s = await this.window.getHtmlElement("selection");
        for (var x of s.children) {
            x.classList.remove("selected");
        }
        s.children[Object.keys(this.settings).indexOf(name)].classList.add("selected");
        this.selectedId = Object.keys(this.settings).indexOf(name);

        var s = await this.window.getHtmlElement("options");
        s.innerHTML = "";

        for (var x in this.settings[name]) {
            var e = this.createElement(x, this.settings[name][x]);
            s.append(e);

            if (this.settingsInDom[name] == undefined) {
                this.settingsInDom[name] = {};
            }
            this.settingsInDom[name][x] = e;

            if (this.settingsData[name] == undefined) {
                this.settingsData[name] = {};
            }
            this.settingsData[name][x] = new class {
                constructor(name, x, parent) {
                    this.name = name;
                    this.x = x;

                    /**
                     * @type {program}
                     */
                    this.parent = parent;
                }
                async update() {
                    this.parent.settingsInDom[this.name][this.x].replaceWith(this.parent.createElement(this.x, this.parent.settings[this.name][this.x]));
                }
            }(name, x, this);
        }
    }

    createElement(name, data) {
        var p = document.createElement("p");
        p.innerText = name;
        if (data.default) {
            p.innerText = data.default;
        }

        p.onclick = this.selectSetting.bind(this, data);

        if (data.type == "button" || data.type == undefined) {
            p.classList.add("coolbutton");
            p.classList.add("rightSideButton");
        }
        else if (data.type == "text") {
            p.classList.add("cooltext");
        }
        else if (data.type == "checkbox") {
            p.classList.add("coolcheckbox");

            var display = document.createElement("p");
            data.status().then((status) => {
                if (status) {
                    display.classList.add("checked");
                    display.innerText = "✓";
                }
                else {
                    display.classList.add("notchecked");
                    display.innerText = "✖";
                }
            })

            p.prepend(display);
        }

        if (data.display) {
            p.style.display = data.display;
        }

        return p;
    }

    async selectSetting(data) {
        data.action = data.action || (() => { });

        // run action
        await data.action();
    }

    async directChange(setting) {
        var s = await System.options.get("settings")


        var o = "";
        if (s[setting][1] == "file")
            o = await SystemHtml.WindowHandler.presets.createFileSelect("Select File")
        if (s[setting][1] == "number")
            o = parseInt(await SystemHtml.WindowHandler.presets.createNumSelect());
        if (s[setting][1] == "string")
            o = await SystemHtml.WindowHandler.presets.createStringSelect()
        if (s[setting][1] == "bool") {
            o = !s[setting][0];
        }

        if (o == undefined) {
            await this.loadSettings();
            return;
        }

        await System.options.addValue("settings", setting, [o, s[setting][1]], true);
        System.settings.settingUpdated(setting);
        await this.loadSettings();
    }
}
new program();