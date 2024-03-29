new (class {
    constructor() {
    }
    getName() {
        return "Elements";
    }
    getPos() {
        return 30;
    }
    getFunctions() {
        return {
            "text": { "type": "button", "change": this.text },
            "box": { "type": "button", "change": this.box },
            "circle": { "type": "button", "change": this.circle },
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
                "color": "#000000ff",
                "backgroundColor": "#00000000",
                "border": "1",
                "borderColor": "#000000ff",
            }
        });
    }
    async box(editor) {
        editor.createElement({
            "type": "box",
            "data": null,
            "pos": {
                x: 10,
                y: 10
            },
            "size": {
                width: 100,
                height: 100
            },
            "styling": {
                "backgroundColor": "#ff0000ff",
                "border": "2",
                "borderColor": "#000000ff",
            }
        });
    }
    async circle(editor) {
        editor.createElement({
            "type": "circle",
            "data": null,
            "pos": {
                x: 10,
                y: 10
            },
            "size": {
                width: 100,
                height: 100
            },
            "styling": {
                "backgroundColor": "#00ff00ff",
                "border": "2",
                "borderColor": "#000000ff",
            }
        });
    }
    async button() {
        console.warn("button not implemented");
    }
    async image(editor) {
        editor.createElement({
            "type": "image",
            "data": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            "pos": {
                x: 10,
                y: 10
            },
            "size": {
                width: 100,
                height: 100
            },
            "styling": {
                "consistentSize": false,
                "backgroundColor": "#00000000",
                "border": "0",
                "borderColor": "#000000ff",
            }
        });
    }
    async website() {
        console.warn("website not implemented");
    }
})();