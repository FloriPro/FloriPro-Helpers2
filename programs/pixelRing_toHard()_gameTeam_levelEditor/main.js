class program extends System.program.default {
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("PixelRing | toHard() gameTeam | levelEditor",
            //onready:
            async () => {
                //set html
                await this.window.setContent("<style>" + (await SystemFileSystem.getFileString(this.PATH.folder() + "/style.css")).replaceAll("{{windowId}}", this.window.getId()) + "</style>" + await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(320, 400)
                this.window.size.userCanResize(true)
                this.window.size.setMax();
                //this.window.size.setfullMax();
                setTimeout(() => {
                    this.window.size.setfullMax();
                }, 100);

                /**
                 * @type {exitMe_gui}
                 */
                this.gui = await System.program.runProgram(this.PATH.folder() + "/gui.js", this.window);
                this.getProjectList();

                this.gui.loadProject = this.loadProject.bind(this);
                this.gui.getPath = this.getPath.bind(this);

                //set events
                this.window.addHtmlEventListener("click", "newProject", async () => {
                    var name = await SystemHtml.WindowHandler.presets.createStringSelect("New Project", "Enter a name for the new project");
                    if (name == null) return;
                    if (name == "") {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't be empty");
                        return;
                    }
                    if (name.includes("/")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '/'");
                        return;
                    }
                    if (name.includes("\\")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '\\'");
                        return;
                    }
                    if (name.includes(":")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain ':'");
                        return;
                    }
                    if (name.includes("*")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '*'");
                        return;
                    }
                    if (name.includes("?")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '?'");
                        return;
                    }
                    if (name.includes("\"")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '\"'");
                        return;
                    }
                    if (name.includes("<")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '<'");
                        return;
                    }
                    if (name.includes(">")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '>'");
                        return;
                    }
                    if (name.includes("|")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '|'");
                        return;
                    }
                    if (name.includes(".")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain '.'");
                        return;
                    }
                    if (name.includes(" ")) {
                        SystemHtml.WindowHandler.presets.createInformation("Error", "Project name can't contain ' '");
                        return;
                    }
                    var projects = await SystemFileSystem.getFileJson(this.PATH.folder() + "/projects.json");
                    for (var i = 0; i < projects.length; i++) {
                        if (projects[i].name == name) {
                            SystemHtml.WindowHandler.presets.createInformation("Error", "Project name already exists");
                            return;
                        }
                    }

                    projects.push({
                        name: name,
                        path: this.PATH.folder() + "/projects/" + name+ ".json"
                    });
                    await SystemFileSystem.setFileString(this.PATH.folder() + "/projects.json", JSON.stringify(projects));
                    await SystemFileSystem.setFileString(this.PATH.folder() + "/projects/" + name + ".json", JSON.stringify({
                        "pages": [{
                            "elements": [
                            ],
                            "background": {
                                "type": "color",
                                "color": "#ffffffff"
                            }
                        }],
                        "pixelRatio": "1152:646"
                    }));

                    await this.getProjectList();
                })
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async getProjectList() {
        this.gui.show("projectChoose")
        if (!await SystemFileSystem.fileExists(this.PATH.folder() + "/projects.json")) {
            await SystemFileSystem.setFileString(this.PATH.folder() + "/projects.json", "[]");
        }

        var projects = await SystemFileSystem.getFileJson(this.PATH.folder() + "/projects.json");

        this.projects = {};
        for (var i = 0; i < projects.length; i++) {
            this.projects[projects[i].name] = projects[i];
        }

        await this.gui.setProjects(projects);
    }

    async loadProject(name) {
        this.gui.show("projectEdit");
        this.gui.ribbon.loadRibbons();

        this.name = name;
        this.path = this.projects[name].path;

        this.gui.loadIntoProject(this.path);
    }

    async closeProject() {
        this.gui.show("projectChoose");
    }

    getPath() {
        return this.path;
    }
}
new program();