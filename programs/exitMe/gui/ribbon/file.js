new (class {
    constructor() {
    }
    getName() {
        return "file";
    }
    getFunctions() {
        return {
            "saveProject": { "type": "button", "change": this.saveProject.bind(this) },
            "saveProjectAs": { "type": "button", "change": this.saveProjectAs.bind(this) },
            "closeProject": { "type": "button", "change": this.closeProject },
            "exit": { "type": "button", "change": this.exit },
            "pixel ratio": { "type": "text", "change": this.setPixelRatio.bind(this), "get": this.getPixelRatio }
        }
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     */
    async saveProject(editor) {
        var x = this.generateSaveFile(editor);
        SystemFileSystem.setFileString(editor.projectPath, JSON.stringify(x));
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     */
    async saveProjectAs(editor) {
        console.warn("saveProjectAs not implemented");
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     */
    async closeProject(editor) {
        console.warn("closeProject not implemented");
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     */
    async exit(editor) {
        console.warn("exit not implemented");
    }

    /**
     * 
     * @param {exitMe_gui_projectEditor} editor
     */
    generateSaveFile(editor) {
        return editor.saveFile;
    }

    /**
     * @param {exitMe_gui_projectEditor} editor
     */
    setPixelRatio(editor, element) {
        editor.gui.project.pixelRatio = element.value;
        editor.gui.loadProjectSettings();
    }
    /**
     * @param {exitMe_gui_ribbon} ribbon
     */
    getPixelRatio(ribbon) {
        return ribbon.editor.gui.project.pixelRatio;
    }
})();