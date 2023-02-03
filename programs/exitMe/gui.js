class exitMe_gui extends System.program.default {
    /**
     * 
     * @param {HtmlWindow} window 
     */
    async init(window) {
        this.getPath = () => { };
        this.types = ["projectChoose", "projectEdit"];
        this.window = window;

        this.loadProject = (name) => { };
        this.show("projectChoose");

        this.project = null;
        this.page = 0;

        /**
         * @type {exitMe_gui_projectEditor}
         */
        this.projectEditor = await System.program.runProgram(this.PATH.folder() + "/gui/projectEditor.js", [this.window, this]);
        this.projectEditor.getPath = this.getPath.bind(this);
        this.projectEditor.getSaveFile = this.getSaveFile.bind(this);
        this.projectEditor.setPage = this.setPage.bind(this);

        /**
         * @type {exitMe_gui_ribbon}
         */
        this.ribbon = await System.program.runProgram(this.PATH.folder() + "/gui/ribbon.js", [this.window, this.projectEditor]);
        /**
         * @type {exitMe_gui_bottomControll}
         */
        this.bottomControll = await System.program.runProgram(this.PATH.folder() + "/gui/bottomControll.js", [this.window, this.projectEditor]);

        this.projectEditor.select = this.ribbon.setElement.bind(this.ribbon);
    }

    async show(typ) {
        for (var x of this.types) {
            if (x == typ) {
                (await this.window.getHtmlElement(typ)).style.display = "";
            } else {
                (await this.window.getHtmlElement(x)).style.display = "none";
            }
        }
    }

    /**
     * @param {string[]} projects 
     * @returns 
     */
    async setProjects(projects) {
        var availProjects = await this.window.getHtmlElement("availProjects");
        availProjects.innerHTML = "";

        if (projects.length == 0) {
            availProjects.innerHTML = "<p><i>No projects found</i></p>";
            return
        }

        for (var x of projects) {
            var project = document.createElement("button");
            project.className = "project";
            project.innerText = x.name;
            project.onclick = () => {
                this.loadProject(x.name);
            }
            availProjects.appendChild(project);
        }
    }

    async loadIntoProject(path) {
        this.project = await SystemFileSystem.getFileJson(path);
        this.page = 0;
        await this.projectEditor.loadProject(this.project.pages[this.page].elements);
        this.loadProjectSettings();
    }

    async loadProjectSettings() {
        this.projectEditor.setPixelRatio(this.project.pixelRatio);
    }

    getSaveFile() {
        return this.project;
    }

    setPage(elements) {
        var out = [];
        for (var x of Object.values(elements)) {
            var x = Object.assign({}, x);
            delete x["id"];
            out.push(x);
        }

        this.project.pages[this.page].elements = out;
    }
}
new exitMe_gui();