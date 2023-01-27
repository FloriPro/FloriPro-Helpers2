new (class {
    constructor() {
    }
    getName() {
        return "Elements";
    }
    getFunctions() {
        return {
            "text": { "type": "button", "change": this.text },
            "button": { "type": "button", "change": this.button },
            "image": { "type": "button", "change": this.image },
            "website": { "type": "button", "change": this.website },
        }
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     */
    async text(editor) {
        editor.createElement({
            "type": "text",
            "data": "Text",
            "pos": {
                x: 10,
                y: 10
            },
            "size": {
                width: 100,
                height: 100
            },
            "styling": {
                "fontSize": 40,
                "fontFamily": "Arial",
                "color": "black",
                "backgroundColor": "transparent"
            }
        });
    }
    async button() {
        console.warn("button not implemented");
    }
    async image() {
        console.warn("image not implemented");
    }
    async website() {
        console.warn("website not implemented");
    }
})();