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
                    delete editor.alignLines[nowEditing];
                    editor.genAllAlignLines();
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
            "hitbox": {
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
            "enemySpawn": {
                "set": this.enemySpawn,
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
        }
    }


    boxSettings(element, domEL) {
        domEL.style.backgroundColor = element.styling.backgroundColor;
        domEL.style.border = element.styling.border + "px solid " + element.styling.borderColor;
        domEL.style.margin = (element.styling.border * -1) + "px";
        return [];
    }

    //round circle with static size 10px
    enemySpawn(element, domEL) {
        domEL.style.backgroundColor = element.styling.backgroundColor;
        domEL.style.border = "";
        domEL.style.margin = "0"
        domEL.style.width = "10px";
        domEL.style.height = "10px";
        domEL.style.borderRadius = "50%";
        return [];
    }

});