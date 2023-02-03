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
            "Background color": { "type": "color", "change": this.setBackgroundcolor.bind(this), "get": this.getBackgroundcolor.bind(this) },
            "Background Image": { "type": "file", "change": this.setBackgroundImage.bind(this), "get": this.getBackgroundImage.bind(this) },
            "Background Image Url": { "type": "stringAsk", "change": this.imageUrl.bind(this), "get": this.getImage.bind(this) },
        }
    }

    /**
     * @param {exitMe_gui_ribbon} ribbon
     */
    getBackgroundcolor(ribbon) {
        if (ribbon.editor.gui.project.pages[ribbon.editor.gui.page].background.type != "color") {
            return "#000000ff";
        }
        return ribbon.editor.gui.project.pages[ribbon.editor.gui.page].background.color;
    }
    /**
     * @param {exitMe_gui_projectEditor} editor 
     * @param {string} color 
     */
    setBackgroundcolor(editor, color) {
        editor.gui.project.pages[editor.gui.page].background.type = "color"
        color = color.substring(0, 7) + "ff";
        editor.gui.project.pages[editor.gui.page].background.color = color;
        this.updateBackground(editor);
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
     * @param {string} url
     */
    async imageUrl(editor, url) {
        var n = await System.network.informationalFetch_Text(url);
        editor.gui.project.pages[editor.gui.page].background.type = "image"
        editor.gui.project.pages[editor.gui.page].background.data = SystemFileSystem.toImg(n)
        this.updateBackground(editor);
    }
    /**
     * @param {exitMe_gui_ribbon} ribbon
     */
    getImage(ribbon) {

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