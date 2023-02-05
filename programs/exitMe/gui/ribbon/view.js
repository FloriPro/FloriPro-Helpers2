new (class {
    constructor() {
        this.element = null;
    }
    getName() {
        return "View";
    }
    getPos() {
        return 35;
    }
    /**
     * @param {{type:string, data:string|any, pos:{x:number,y:number}, size:{width:number,height:number}, styling:any}} element
     */
    getFunctions(element) {
        return {
            "Overlay outline": {
                "type": "checkbox", "change": this.setoutline.bind(this), "get": this.getoutline.bind(this)
            }
        }
    }

    /**
     * 
     * @param {exitMe_gui_ribbon} editor 
     * @returns 
     */
    getoutline(editor) {
        return editor.editor.overlayOutline;
    }

    setoutline(editor, element) {
        editor.overlayOutline = element.checked;
        editor.updateOverlayOutline();
    }
})();