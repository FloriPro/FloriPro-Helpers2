class program extends System.program.default {
    async init() {
        this.settings = {
            "Appearance": {
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
                        this.settingsData["Appearance"]["Desktop Icon Align"].update();
                    }
                },
                "Background Image": {
                    "type": "button",
                    "description": "Set background image",
                    "action": async () => {
                        this.directChange("backgroundImage");
                    }
                },
                "Newer Style": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["newStyle"][0];
                    },
                    "description": "Newer Style",
                    "action": async () => {
                        await this.directChange("newStyle");
                        this.settingsData["Appearance"]["Newer Style"].update();
                        this.settingsInDom["Appearance"]["Reload"].style.display = "";
                    }
                },
                "Reload": {
                    "type": "button",
                    "description": "Restart",
                    "action": async () => {
                        location.reload();
                    },
                    "display": "none"
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
                        this.settingsInDom["Accessibility"]["Reload"].style.display = "";
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
                "Clamp Windows to Screen Size": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["clampWindowToScreen"][0];
                    },
                    "description": "Clamp Windows to Screen Size",
                    "action": async () => {
                        await this.directChange("clampWindowToScreen");
                        this.settingsData["Accessibility"]["Clamp Windows to Screen Size"].update();
                    }
                },
                "Automatic Fullscreen": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["automaticFullscreen"][0];
                    },
                    "description": "Automatic Fullscreen",
                    "action": async () => {
                        await this.directChange("automaticFullscreen");
                        this.settingsData["Accessibility"]["Automatic Fullscreen"].update();
                    }
                },
                "Download Online Files": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["replaceOnlineDataFilesWithDownloaded"][0];
                    },
                    "description": "Download Online Files",
                    "action": async () => {
                        await this.directChange("replaceOnlineDataFilesWithDownloaded");
                        this.settingsData["Accessibility"]["Download Online Files"].update();
                        this.settingsInDom["Accessibility"]["Reload"].style.display = "";
                    }
                },
                "Resize Direction Indicator": {
                    "type": "checkbox",
                    "status": async () => {
                        return (await System.options.get("settings"))["resizeDirectionIndicator"][0];
                    },
                    "description": "Resize Direction Indicator",
                    "action": async () => {
                        await this.directChange("resizeDirectionIndicator");
                        this.settingsData["Accessibility"]["Resize Direction Indicator"].update();
                        this.settingsInDom["Accessibility"]["Reload"].style.display = "";
                    }
                },
                "infoText": {
                    "type": "text",
                    "default": "Some Settings require a Reload to take effect",
                    "description": "Info Text"
                },
                "Reload": {
                    "type": "button",
                    "description": "Restart",
                    "action": async () => {
                        location.reload();
                    },
                    "display": "none"
                }
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
            "VIP": {
                "Enter Code": {
                    "type": "button",
                    "description": "Enter the authorization code",
                    "action": async () => {
                        var code = await SystemHtml.WindowHandler.presets.createStringSelect("VIP Auth", "Enter vip authorization code");
                        await System.options.vip.setCode(code);
                        await this.settingsData["VIP"]["Status"].update();
                    }
                },
                "Enabled VIP Features": {
                    "type": "activeList",
                    "description": "Enabled VIP Features:",
                    "options": async () => {
                        function dat(name, settingsData, settingsInDom) {
                            return {
                                "type": "checkbox",
                                "status": async () => {
                                    var enabled = (await System.options.get("vipInfo"))["enabled"];
                                    return enabled.includes(name);
                                },
                                "action": async () => {
                                    var enabled = (await System.options.get("vipInfo"))["enabled"];
                                    if (enabled.includes(name)) {
                                        enabled.splice(enabled.indexOf(name), 1)
                                    } else {
                                        enabled.push(name)
                                    }
                                    await System.options.addValue("vipInfo", "enabled", enabled, true);
                                    settingsData["VIP.Enabled VIP Features"][name].update();
                                    SystemHtml.WindowHandler.presets.createInformation("VIP", "Please restart the system to apply the changes");
                                    settingsInDom["VIP"]["Reload"].style.display = "block";
                                }
                            }
                        }

                        var available = await SystemFileSystem.getFileJson("c/sys/HTML/vip/available.json");
                        var options = {};
                        for (var i = 0; i < available.length; i++) {
                            options[available[i]] = dat(available[i], this.settingsData, this.settingsInDom);
                        }
                        return options;
                    },
                    "display": "none"
                },
                "Status": {
                    "type": "text",
                    "default": "Not VIP",
                    "description": "VIP status",
                    "action": async () => {
                        this.settingsInDom["VIP"]["Status"].innerText = await System.options.vip.enabled ? "VIP Enabled" : "VIP Disabled";
                        if (await System.options.vip.enabled) {
                            this.settingsInDom["VIP"]["Status"].style.color = "green";
                            this.settingsInDom["VIP"]["Enabled VIP Features"].style.display = "";
                        } else {
                            this.settingsInDom["VIP"]["Status"].style.color = "red";
                            this.settingsInDom["VIP"]["Enabled VIP Features"].style.display = "none";
                        }
                    }
                },
                "Reload": {
                    "type": "button",
                    "description": "Reload Window",
                    "action": async () => {
                        location.reload();
                    },
                    "display": "none"
                }
            }
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
        this.createLeftHandData(s, this.settings, name);

    }

    async createLeftHandData(s, settings, name) {
        for (var x in settings[name]) {
            await this.createLeftHandSub(s, settings[name], name, x);
        }
    }

    async createLeftHandSub(s, settingspart, name, x, makeNew = true, toReplace = undefined) {
        var e = await this.createElement(x, settingspart[x], name);
        if (makeNew) {
            s.append(e);
        } else {
            toReplace.replaceWith(e);
        }

        if (this.settingsInDom[name] == undefined) {
            this.settingsInDom[name] = {};
        }
        this.settingsInDom[name][x] = e;

        if (this.settingsData[name] == undefined) {
            this.settingsData[name] = {};
        }
        this.settingsData[name][x] = new class {
            constructor(name, x, settingspart, s, parent) {
                this.name = name;
                this.x = x;
                this.settingspart = settingspart;
                this.s = s;

                /**
                 * @type {program}
                 */
                this.parent = parent;
            }
            async update() {
                //this.parent.settingsInDom[this.name][this.x].replaceWith(
                //    await this.parent.createElement(this.x, this.settingspart[this.x])
                //);
                this.parent.createLeftHandSub(this.s, this.settingspart, this.name, this.x, false, this.parent.settingsInDom[this.name][this.x]);
            }
        }(name, x, settingspart, s, this);
    }

    async createElement(name, data, parentName) {
        var p = document.createElement("p");
        data.action = data.action || (() => { });
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
            setTimeout(data.action.bind(this), 1);
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
        else if (data.type == "activeList") {
            p.classList.add("activeListWrapper");
            var innerDiv = document.createElement("div");
            innerDiv.classList.add("activeList");
            var op = await data.options();
            for (var x in op) {
                await this.createLeftHandSub(innerDiv, op, parentName + "." + name, x);
            }
            p.append(innerDiv);
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
        //await this.loadSettings();
    }
}
new program();