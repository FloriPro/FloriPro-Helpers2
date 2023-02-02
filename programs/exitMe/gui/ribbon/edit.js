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
                "Image Url": { "type": "stringAsk", "change": this.imageUrl.bind(this), "get": this.getImage.bind(this) },
                "Consistent Size": { "type": "checkbox", "change": this.imageConsistentSize.bind(this), "get": this.getImageConsistentSize.bind(this) }
            };
        } else if (element.type == "box" || element.type == "circle") {
            return {
                "Color": { "type": "color", "change": this.backgroundColor.bind(this), "get": this.getBackgroundColor.bind(this) },
                "Border": { "type": "number", "change": this.border.bind(this), "get": this.getBorder.bind(this) },
                "BorderColor": { "type": "color", "change": this.borderColor.bind(this), "get": this.getBorderColor.bind(this) }
            }
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
    color(editor, color) {
        editor.elements[editor.nowEditing].styling.color = color;
        editor.reloadElement(editor.nowEditing);
    }
    /**
     * @param {exitMe_gui_projectEditor} editor 
     * @param {HTMLInputElement} element 
     */
    backgroundColor(editor, color) {
        editor.elements[editor.nowEditing].styling.backgroundColor = color;
        editor.reloadElement(editor.nowEditing);
    }

    /**
     * @param {exitMe_gui_projectEditor} editor
     * @param {string} filePath
     */
    async imageSrc(editor, filePath) {
        editor.elements[editor.nowEditing].data = SystemFileSystem.toImg(await SystemFileSystem.getFileString(filePath));
        editor.elements[editor.nowEditing].path = filePath;
        editor.reloadElement(editor.nowEditing);
    }

    async imageUrl(editor, url) {
        var n = await System.network.informationalFetch_Text(url);

        editor.elements[editor.nowEditing].data = SystemFileSystem.toImg(n);
        editor.elements[editor.nowEditing].path = "url";
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
    border(editor, el) {
        editor.elements[editor.nowEditing].styling.border = el.value;
        editor.reloadElement(editor.nowEditing);
    }
    getBorder() {
        return this.element.styling.border;
    }
    borderColor(editor, color) {
        editor.elements[editor.nowEditing].styling.borderColor = color;
        editor.reloadElement(editor.nowEditing);
    }
    getBorderColor() {
        return this.element.styling.borderColor;
    }
})();