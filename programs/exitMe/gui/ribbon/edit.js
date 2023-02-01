new (class {
    constructor() {
        this.element = null;
    }
    getName() {
        return "Edit";
    }
    /**
     * @param {{type:string, data:string|any, pos:{x:number,y:number}, size:{width:number,height:number}, styling:any}} element
     */
    getFunctions(element) {
        this.element = element;

        if (element == null) {
            return {};
        }
        console.log(element);
        if (element.type == "text") {
            return {
                "fontSize": { "type": "number", "change": this.fontSize.bind(this), "get": this.getFontSize.bind(this) },
                "fontFamily": { "type": "text", "change": this.fontFamily.bind(this), "get": this.getFontFamily.bind(this) },
                "color": { "type": "color", "change": this.color.bind(this), "get": this.getColor.bind(this) },
                "backgroundColor": { "type": "color", "change": this.backgroundColor.bind(this), "get": this.getBackgroundColor.bind(this) }
            }
        } else if (element.type == "image") {
            return {
                "Image": { "type": "file", "change": this.imageSrc.bind(this), "get": this.getImage.bind(this) },
                "Consistent Size": { "type": "checkbox", "change": this.imageConsistentSize.bind(this), "get": this.getImageConsistentSize.bind(this) }
            };
        }
        else {
            return {};
        }
    }
    getFontSize() {
        return this.element.styling.fontSize;
    }
    getFontFamily() {
        return this.element.styling.fontFamily;
    }
    getColor() {
        return this.element.styling.color;
    }
    getBackgroundColor() {
        return this.element.styling.backgroundColor;
    }
    /**
     * @param {exitMe_gui_projectEditor} editor
     * @param {HTMLInputElement} element 
     */
    fontSize(editor, element) {
        editor.elements[editor.nowEditing].styling.fontSize = element.value;
        editor.reloadElement(editor.nowEditing);
    }
    /**
     * @param {exitMe_gui_projectEditor} editor 
     * @param {HTMLInputElement} element 
     */
    fontFamily(editor, element) {
        editor.elements[editor.nowEditing].styling.fontFamily = element.value;
        editor.reloadElement(editor.nowEditing);
    }
    /**
     * @param {exitMe_gui_projectEditor} editor 
     * @param {HTMLInputElement} element 
     */
    color(editor, element) {
        editor.elements[editor.nowEditing].styling.color = element.value;
        editor.reloadElement(editor.nowEditing);
    }
    /**
     * @param {exitMe_gui_projectEditor} editor 
     * @param {HTMLInputElement} element 
     */
    backgroundColor(editor, element) {
        editor.elements[editor.nowEditing].styling.backgroundColor = element.value;
        editor.reloadElement(editor.nowEditing);
    }

    /**
     * @param {exitMe_gui_projectEditor} editor
     * @param {string} filePath
     */
    async imageSrc(editor, filePath) {
        console.log(filePath);
        editor.elements[editor.nowEditing].data = SystemFileSystem.toImg(await SystemFileSystem.getFileString(filePath));
        editor.elements[editor.nowEditing].path = filePath;
        editor.reloadElement(editor.nowEditing);
    }

    getImage() {
        return this.element.path;
    }

    /**
     * @param {exitMe_gui_projectEditor} editor
     * @param {HTMLInputElement} element
     */
    imageConsistentSize(editor, element) {
        editor.elements[editor.nowEditing].styling.consistentSize = element.checked;
        editor.reloadElement(editor.nowEditing);
    }

    getImageConsistentSize() {
        return this.element.styling.consistentSize;
    }
})();