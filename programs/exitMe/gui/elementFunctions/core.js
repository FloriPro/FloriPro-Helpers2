(class {
    constructor(window) {
        this.window = window
    }
    contextMenuAll() {
        return [
            {
                "name": "remove",
                "action": (elements, nowEditing, content, editor) => {
                    editor.nowEditing = null;
                    editor.hideContentChanger();
                    editor.updateSelect();

                    delete elements[nowEditing];
                    content.querySelector(`[uuid="${nowEditing}"]`).remove();
                }
            },
            {
                "name": "layer",
                "action": (elements, nowEditing, content, editor) => {
                    SystemHtml.ContextMenu.specific({
                        "move to top": [(x) => {
                            /**
                             * @type {[{[id:string]:exitMe_gui_projectEditor_element}, string, HTMLElement, exitMe_gui_projectEditor]}
                             */
                            var [elements, nowEditing, content, editor] = [x[0], x[1], x[2], x[3]];
                            console.log(editor);
                            editor.elements = editor.util.setLayer(elements, nowEditing, editor.util.getLayerMax(elements) + 1);
                            editor.updateLayers();
                        }, [elements, nowEditing, content, editor]],
                        "move to bottom": [(x) => {
                            /**
                             * @type {[{[id:string]:exitMe_gui_projectEditor_element}, string, HTMLElement, exitMe_gui_projectEditor]}
                             */
                            var [elements, nowEditing, content, editor] = [x[0], x[1], x[2], x[3]];
                            editor.elements = editor.util.setLayer(elements, nowEditing, 0);
                            editor.updateLayers();
                        }, [elements, nowEditing, content, editor]],
                        "move up": [(x) => {
                            /**
                             * @type {[{[id:string]:exitMe_gui_projectEditor_element}, string, HTMLElement, exitMe_gui_projectEditor]}
                             */
                            var [elements, nowEditing, content, editor] = [x[0], x[1], x[2], x[3]];
                            editor.elements = editor.util.setLayer(elements, nowEditing, elements[nowEditing].layer + 2);
                            editor.updateLayers();
                        }, [elements, nowEditing, content, editor]],
                        "move down": [(x) => {
                            /**
                             * @type {[{[id:string]:exitMe_gui_projectEditor_element}, string, HTMLElement, exitMe_gui_projectEditor]}
                             */
                            var [elements, nowEditing, content, editor] = [x[0], x[1], x[2], x[3]];
                            if (elements[nowEditing].layer < 0) {
                                console.warn("layer is allready lowest 0");
                                return;
                            }
                            editor.elements = editor.util.setLayer(elements, nowEditing, elements[nowEditing].layer - 1);
                            editor.updateLayers();
                        }, [elements, nowEditing, content, editor]],
                    });
                }
            }
        ]
    }
    get() {
        return {
            "text": {
                "set": this.textSettings,
                "create": () => {
                    return document.createElement("p");
                },
                "editContent": async (element, nowEditing, content) => {
                    var cccc = (await this.window.getHtmlElement("contentChangerChangeText"));
                    cccc.value = element.data;
                    cccc.style.display = "";
                    cccc.select();

                    cccc.style.color = element.styling.color;
                    cccc.style.backgroundColor = element.styling.backgroundColor;
                    cccc.style.fontSize = element.styling.fontSize + "px";
                    cccc.style.fontFamily = element.styling.fontFamily;

                    //hide element
                    content.querySelector(`[uuid="${nowEditing}"]`).style.display = "none";

                    return true;
                },
                "stopEdit": async (elements, nowEditing, content) => {
                    content.querySelector(`[uuid="${nowEditing}"]`).style.display = "";
                    elements[nowEditing].data = (await this.window.getHtmlElement("contentChangerChangeText")).value;
                    (await this.window.getHtmlElement("contentChangerChangeText")).style.display = "none";
                },
                "contextMenu": [
                    {
                        "name": "test",
                        "action": (elements, nowEditing, content) => {
                            console.log("test");
                        }
                    }
                ]
            },
            "image": {
                "set": this.imageSettings,
                "create": () => {
                    return document.createElement("img");
                },
                "editContent": async (element, nowEditing, content) => {
                    return false;
                },
                "stopEdit": async (elements, nowEditing, content) => {
                    console.warn("stop edit should not be called on image!");
                },
                "contextMenu": []
            },
            "box": {
                "set": this.boxSettings,
                "create": () => {
                    var e = document.createElement("div");
                    e.style.backgroundClip = "padding-box";
                    return e;
                },
                "editContent": async (element, nowEditing, content) => {
                    return false;
                },
                "stopEdit": async (elements, nowEditing, content) => {
                    console.warn("stop edit should not be called on box!");
                },
                "contextMenu": []
            },
            "circle": {
                "set": this.circleSettings,
                "create": () => {
                    var e = document.createElement("div");
                    e.style.backgroundClip = "padding-box";
                    return e;
                },
                "editContent": async (element, nowEditing, content) => {
                    return false;
                },
                "stopEdit": async (elements, nowEditing, content) => {
                    console.warn("stop edit should not be called on box!");
                },
                "contextMenu": []
            }
        }
    }

    textSettings(element, domEL) {
        domEL.innerText = element.data;
        domEL.style.color = element.styling.color;
        domEL.style.backgroundColor = element.styling.backgroundColor;
        domEL.style.fontSize = element.styling.fontSize + "px";
        domEL.style.fontFamily = element.styling.fontFamily;
        domEL.style.border = element.styling.border + "px solid " + element.styling.borderColor;
        domEL.style.margin = (element.styling.border * -1) + "px";
        return []
    }

    /**
     * 
     * @param {any} element 
     * @param {HTMLImageElement} domEL 
     * @returns 
     */

    imageSettings(element, domEL) {
        domEL.src = element.data;
        if (element.styling.consistentSize == true) {
            domEL.style.height = "";
            element.size.height = domEL.height
            return ["style_height"];
        }
        domEL.style.backgroundColor = element.styling.backgroundColor;
        domEL.style.border = element.styling.border + "px solid " + element.styling.borderColor;
        domEL.style.margin = (element.styling.border * -1) + "px";
        return [];
    }

    boxSettings(element, domEL) {
        domEL.style.backgroundColor = element.styling.backgroundColor;
        domEL.style.border = element.styling.border + "px solid " + element.styling.borderColor;
        domEL.style.margin = (element.styling.border * -1) + "px";
        return [];
    }

    circleSettings(element, domEL) {
        domEL.style.backgroundColor = element.styling.backgroundColor;
        domEL.style.border = element.styling.border + "px solid " + element.styling.borderColor;
        domEL.style.margin = (element.styling.border * -1) + "px";
        domEL.style.borderRadius = "50%";
        return [];
    }
});