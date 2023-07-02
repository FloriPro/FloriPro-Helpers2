new (class {
    constructor() {
        this.element = null;
    }
    getName() {
        return "Background";
    }
    getPos() {
        return 36;
    }
    /**
     * @param {{type:string, data:string|any, pos:{x:number,y:number}, size:{width:number,height:number}, styling:any}} element
     */
    getFunctions(element) {
        return {
            "Background Image": { "type": "file", "change": this.setBackgroundImage.bind(this), "get": this.getBackgroundImage.bind(this) },
        }
    }
    /**
     * @param {exitMe_gui_projectEditor} editor
     * @param {string} filePath
     */
    async setBackgroundImage(editor, filePath) {
        editor.gui.project.pages[editor.gui.page].background.type = "image"
        editor.gui.project.pages[editor.gui.page].background.data = SystemFileSystem.toImg(await SystemFileSystem.getFileString(filePath))
        this.updateBackground(editor);
    }
    /**
     * @param {exitMe_gui_ribbon} ribbon
     */
    getBackgroundImage(ribbon) {

    }

    /**
     * @param {exitMe_gui_projectEditor} editor 
     */
    updateBackground(editor) {
        if (editor.gui.project.pages[editor.gui.page].background.type == "color") {
            editor.content.style.background = editor.gui.project.pages[editor.gui.page].background.color;
        } else if (editor.gui.project.pages[editor.gui.page].background.type == "image") {
            editor.content.style.background = "url(" + editor.gui.project.pages[editor.gui.page].background.data + ")";
        }
    }
})();