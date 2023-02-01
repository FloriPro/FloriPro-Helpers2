(class {
    constructor(window) {
        this.window = window
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
                    console.log(elements[nowEditing].data);
                    (await this.window.getHtmlElement("contentChangerChangeText")).style.display = "none";
                }
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
                }
            }
        }
    }

    textSettings(element, domEL) {
        domEL.innerText = element.data;
        domEL.style.color = element.styling.color;
        domEL.style.backgroundColor = element.styling.backgroundColor;
        domEL.style.fontSize = element.styling.fontSize + "px";
        domEL.style.fontFamily = element.styling.fontFamily;
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
        return [];
    }
});