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


        /**
         * @type {exitMe_gui_projectEditor}
         */
        this.projectEditor = await System.program.runProgram(this.PATH.folder() + "/gui/projectEditor.js", this.window);
        this.projectEditor.getPath = this.getPath.bind(this);

        /**
         * @type {exitMe_gui_ribbon}
         */
        this.ribbon = await System.program.runProgram(this.PATH.folder() + "/gui/ribbon.js", [this.window, this.projectEditor]);

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
        var elements = await SystemFileSystem.getFileJson(path);
        this.projectEditor.loadProject(elements);
    }
}
new exitMe_gui();