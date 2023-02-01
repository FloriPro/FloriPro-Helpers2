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
            "exit": { "type": "button", "change": this.exit }
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
        var out = [];
        for (var x of Object.values(editor.elements)) {
            delete x["id"];
            out.push(x);
        }
        return out;
    }
})();