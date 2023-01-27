class exitMe_gui_projectEditor extends System.program.default {
    /**
     * 
     * @param {HtmlWindow} window 
     */
    async init(window) {
        /**
         * @type {{{type:string, data:string|any, pos:{x:number,y:number}, size:{width:number,height:number}, styling:any}[]}}
         */
        this.elements = {};
        this.window = window;

        this.resize = false;
        this.moving = false;
        this.editing = false;

        this.nowEditing = null;
        this.contentChanger = await this.window.getHtmlElement("contentChanger");
        this.makeContentChanger();

        this.select = (element) => { };
    }

    makeContentChanger() {
        var types = [
            { "top": "-10px", "left": "-10px", "cursor": "nw-resize" },
            { "bottom": "-10px", "left": "-10px", "cursor": "sw-resize" },
            { "top": "-10px", "right": "-10px", "cursor": "ne-resize" },
            { "bottom": "-10px", "right": "-10px", "cursor": "se-resize" },
        ];

        for (var i in types) {
            var el = document.createElement("div");
            el.setAttribute("element", "contentChanger_bomml");

            for (var y of Object.keys(types[i])) {
                el.style.setProperty(y, types[i][y]);
            }

            el.onmousedown = ((i) => {
                this.resize = true;
                this.resizeType = i;
            }).bind(this, i);

            this.contentChanger.appendChild(el);
        }

        this.contentChanger.querySelector("[windowelement='contentChangerBorder']").onmousedown = (() => {
            this.moving = true;
        }).bind(this);
        this.window.getHtml().onmouseup = (() => {
            this.moving = false;
            this.resize = false;
        }).bind(this);
        System.eventHandler.addEventHandler("mousemove", this.contentChangerMove.bind(this));

        this.window.addHtmlEventListener("onclick", "projectContent", async () => {
            if (this.editing) {
                this.content.querySelector(`[uuid="${this.nowEditing}"]`).style.display = "";
                this.elements[this.nowEditing].data = (await this.window.getHtmlElement("contentChangerChangeText")).value;
                (await this.window.getHtmlElement("contentChangerChangeText")).style.display = "none";
                this.editing = false;
                this.reloadElement(this.nowEditing);
                return;
            }

            this.nowEditing = null;
            this.hideContentChanger();
            this.updateSelect();
        });

        this.window.addHtmlEventListener("onclick", "contentChanger", (_, __, ___, e) => {
            if (e.target.getAttribute("windowelement") == "contentChanger_bomml") {
                return;
            }
            this.editContent();
        });
    }

    contentChangerMove(e) {
        if (this.moving == true) {
            this.elements[this.nowEditing].pos.x += e.movementX;
            this.elements[this.nowEditing].pos.y += e.movementY;
            this.reloadElement(this.nowEditing);
            this.setContentChanger();
        }
        else if (this.resize == true) {
            if (this.resizeType == 0) {
                this.elements[this.nowEditing].pos.x += e.movementX;
                this.elements[this.nowEditing].pos.y += e.movementY;
                this.elements[this.nowEditing].size.width -= e.movementX;
                this.elements[this.nowEditing].size.height -= e.movementY;
            }
            else if (this.resizeType == 1) {
                this.elements[this.nowEditing].pos.x += e.movementX;
                this.elements[this.nowEditing].size.width -= e.movementX;
                this.elements[this.nowEditing].size.height += e.movementY;
            }
            else if (this.resizeType == 2) {
                this.elements[this.nowEditing].pos.y += e.movementY;
                this.elements[this.nowEditing].size.width += e.movementX;
                this.elements[this.nowEditing].size.height -= e.movementY;
            } else if (this.resizeType == 3) {
                this.elements[this.nowEditing].size.width += e.movementX;
                this.elements[this.nowEditing].size.height += e.movementY;
            }
            this.reloadElement(this.nowEditing);
            this.setContentChanger();
        }
    }

    updateSelect() {
        if (this.nowEditing == null)
            this.select(null);
        else
            this.select(this.elements[this.nowEditing]);
    }

    /**
     * 
     * @param {{type:string, data:string|any, pos:{x:number,y:number}, size:{width:number,height:number}, styling:any}[]} elements 
     */
    async loadProject(elements) {
        this.content = await this.window.getHtmlElement("projectContent");
        this.content.innerHTML = "";
        this.elements = {};

        for (var x of elements) {
            this.createElement(x);
        }
    }

    /**
     * 
     * @param {{type:string, data:string|any, pos:{x:number,y:number}, size:{width:number,height:number}, styling:any}} element
     */
    createElement(element) {
        element.id = System.makeid(10);

        var domEL;
        switch (element.type) {
            case "text":
                domEL = document.createElement("p");
                break;
        }

        this.setElementInformation(element, domEL);

        domEL.onclick = this.click.bind(this, element.id);
        domEL.setAttribute("uuid", element.id)
        this.elements[element.id] = element;
        this.content.appendChild(domEL);
    }

    setElementInformation(element, domEL) {
        switch (element.type) {
            case "text":
                domEL.innerText = element.data;
                domEL.style.color = element.styling.color;
                domEL.style.backgroundColor = element.styling.backgroundColor;
                domEL.style.fontSize = element.styling.fontSize + "px";
                domEL.style.fontFamily = element.styling.fontFamily;
                break;
        }

        domEL.style.position = "absolute";
        domEL.style.left = element.pos.x + "px";
        domEL.style.top = element.pos.y + "px";
        domEL.style.width = element.size.width + "px";
        domEL.style.height = element.size.height + "px";
    }

    async editContent() {
        this.editing = true;
        var element = this.elements[this.nowEditing];
        if (element.type == "text") {
            var cccc = (await this.window.getHtmlElement("contentChangerChangeText"));
            cccc.value = element.data;
            cccc.style.display = "";
            cccc.select();

            cccc.style.color = element.styling.color;
            cccc.style.backgroundColor = element.styling.backgroundColor;
            cccc.style.fontSize = element.styling.fontSize + "px";
            cccc.style.fontFamily = element.styling.fontFamily;

            //hide element
            this.content.querySelector(`[uuid="${this.nowEditing}"]`).style.display = "none";
        }
    }

    reloadElement(id) {
        this.setElementInformation(this.elements[id], document.querySelector(`[uuid="${id}"]`));
    }

    async click(id) {
        //this.elements[id].pos.x += 10;
        if (this.nowEditing != undefined) {
            if (this.editing) {
                this.content.querySelector(`[uuid="${this.nowEditing}"]`).style.display = "";
                this.elements[this.nowEditing].data = (await this.window.getHtmlElement("contentChangerChangeText")).value;
                (await this.window.getHtmlElement("contentChangerChangeText")).style.display = "none";
                this.editing = false;
                this.reloadElement(this.nowEditing);
                return;
            }
        }
        this.nowEditing = id;
        this.updateSelect();
        this.setContentChanger();
        //this.reloadElement(id);
    }

    setContentChanger() {
        var element = this.elements[this.nowEditing];
        this.contentChanger.style.display = "";
        this.contentChanger.style.position = "absolute";
        this.contentChanger.style.left = element.pos.x + "px";
        this.contentChanger.style.top = element.pos.y + "px";
        this.contentChanger.style.width = element.size.width + "px";
        this.contentChanger.style.height = element.size.height + "px";
    }
    hideContentChanger() {
        this.contentChanger.style.display = "none";
    }
}
new exitMe_gui_projectEditor();