new (class {
    constructor() {
        this.element = null;
    }
    getName() {
        return "Edit";
    }
    getPos() {
        return 20;
    }
    /**
     * @param {{type:string, data:string|any, pos:{x:number,y:number}, size:{width:number,height:number}, styling:any}} element
     */
    getFunctions(element) {
        this.element = element;

        if (element == null) {
            return {};
        }
        if (element.type == "box" || element.type == "circle" || element.type == "text" || element.type == "image") {
            return {
                "_descriptor": "Background",
                "Background": { "type": "color", "change": this.backgroundColor.bind(this), "get": this.getBackgroundColor.bind(this) },
                "_separator": "",
                "_descriptor2": "Border",
                "Border": { "type": "number", "change": this.border.bind(this), "get": this.getBorder.bind(this) },
                "BorderColor": { "type": "color", "change": this.borderColor.bind(this), "get": this.getBorderColor.bind(this) },
            }
        }
        else {
            return {};
        }
    }
    getBackgroundColor() {
        return this.element.styling.backgroundColor;
    }
    /**
     * @param {exitMe_gui_projectEditor} editor 
     * @param {HTMLInputElement} element 
     */
    backgroundColor(editor, color) {
        editor.elements[editor.nowEditing].styling.backgroundColor = color;
        editor.reloadElement(editor.nowEditing);
    }

    border(editor, el) {
        if (parseInt(el.value) < 0) {
            el.value = 0;
        }
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