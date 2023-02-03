class exitMe_gui_projectEditor_element {                              ///--remove--
    constructor() {                                                   ///--remove--
        /**@type {string} */                                          ///--remove--
        this.type;                                                    ///--remove--
        /**@type {string | any} */                                    ///--remove--
        this.data;                                                    ///--remove--
        /**@type {{ x: number, y: number }} */                        ///--remove--
        this.pos;                                                     ///--remove--
        /**@type {{ width: number, height: number }} */               ///--remove--
        this.size;                                                    ///--remove--
        /**@type {any} */                                             ///--remove--
        this.styling;                                                 ///--remove--
        /**@type {number} */                                          ///--remove--
        this.layer;                                                   ///--remove--
        /**@type {string} */                                          ///--remove--
        this.id;                                                      ///--remove--
    }                                                                 ///--remove--
}                                                                     ///--remove--
class exitMe_gui_projectEditor extends System.program.default {
    /**
     * 
     * @param {[HtmlWindow, exitMe_gui]} window 
     */
    async init([window, gui]) {
        this.getPath = () => {
            console.error("function not set!")
        };
        this.getSaveFile = () => {
            console.error("function not set!")
        };
        this.setPage = (elements) => {
            console.error("function not set!")
        };
        this.select = (element) => {
            console.error("function not set!")
        };

        /**
         * @type {exitMe_gui_projectEditor_util}
         */
        this.util = await System.run(this.PATH.folder() + "/util/projectEditorUtil.js");
        /**
         * @type {exitMe_gui}
         */
        this.gui = gui;
        /**
         * @type {{[key: string]:exitMe_gui_projectEditor_element}}
         */
        this.elements = {};
        this.window = window;

        this.elementFunctions = {};
        this.contextMenuAll = [];
        await this.initElementFunctions();

        this.resize = false;
        this.moving = false;
        this.editing = false;

        this.nowEditing = null;
        this.contentChanger = await this.window.getHtmlElement("contentChanger");
        this.makeContentChanger();

        this.zoom = 1;
        this.initZoom();

        this.updateLayers = (() => {
            this.gui.setPage(this.elements);

            this.elements = this.util.capLayers(this.elements);

            for (var x in this.elements) {
                this.reloadElement(x);
            }
        }).bind(this);
    }

    initZoom() {
        this.window.addHtmlEventListener("onwheel", "projectEdit", ((a, b, c, e) => {
            if (!e.altKey) { return }
            e.preventDefault();

            if (e.deltaY > 0) {
                this.zoom -= 0.1;
            } else {
                this.zoom += 0.1;
            }
            this.applyZoom();
        }).bind(this));
    }

    applyZoom() {
        if (this.zoom < 0.1) {
            this.zoom = 0.1;
        }
        if (this.zoom > 3) {
            this.zoom = 3;
        }
        this.content.style.setProperty("zoom", this.zoom);
        this.contentChanger.style.setProperty("zoom", this.zoom);

        for (var x of this.contentChanger.children) {
            x.style.setProperty("zoom", 1 / this.zoom);
        }
    }

    async initElementFunctions() {
        var files = await SystemFileSystem.getFiles(this.PATH.folder() + "/elementFunctions");
        for (var file of files) {
            var clas = new (await System.run(this.PATH.folder() + "/elementFunctions/" + file))(this.window);
            var info = clas.get();
            for (var x of Object.keys(info)) {
                if (this.elementFunctions[x] != undefined) {
                    console.error("Element function " + x + " already exists!");
                    continue;
                }
                this.elementFunctions[x] = info[x];
            }

            var r = clas.contextMenuAll();
            if (r != undefined) {
                for (var x of r) {
                    this.contextMenuAll.push(x);
                }
            }
        }
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
            el.ontouchstart = ((i) => {
                this.resize = true;
                this.resizeType = i;
            }).bind(this, i);
            this.contentChanger.appendChild(el);
        }

        this.contentChanger.querySelector("[windowelement='contentChangerBorder']").onmousedown = (() => {
            this.moving = true;
        }).bind(this);
        this.contentChanger.querySelector("[windowelement='contentChangerBorder']").ontouchstart = (() => {
            this.moving = true;
        }).bind(this);

        this.window.getHtml().onmouseup = (() => {
            this.moving = false;
            this.resize = false;
        }).bind(this);
        this.window.getHtml().ontouchend = (() => {
            this.moving = false;
            this.resize = false;
        }).bind(this);

        System.eventHandler.addEventHandler("mousemove", this.contentChangerMove.bind(this));

        this.window.addHtmlEventListener("onclick", "projectContent", async (_, __, ___, e) => {
            if (e.target.getAttribute("windowelement") != "projectContent") { return }
            if (this.editing) {
                if (this.elements[this.nowEditing] == undefined) {
                    this.nowEditing = null;
                    this.hideContentChanger();
                    this.updateSelect();
                    return;
                }
                await this.elementFunctions[this.elements[this.nowEditing].type].stopEdit(this.elements, this.nowEditing, this.content);
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
            } if (e.target.getAttribute("windowelement") == "contentChangerBorderPart") {
                return;
            }
            this.editContent();
        });

        this.contentChanger.contextscript = ((e) => {
            var out = {};
            for (var x of this.contextMenuAll) {
                out[x.name] = x.action.bind(this, this.elements, this.elements[this.nowEditing].id, this.content, this);
            }

            var s = this.elementFunctions[this.elements[this.nowEditing].type].contextMenu;
            for (var x of s) {
                out[x.name] = x.action.bind(this, this.elements, this.elements[this.nowEditing].id, this.content, this);
            }
            return out;
        }).bind(this);
    }

    contentChangerMove(e) {
        var movementX = e.movementX / this.zoom
        var movementY = e.movementY / this.zoom
        if (this.moving == true) {
            this.elements[this.nowEditing].pos.x += movementX;
            this.elements[this.nowEditing].pos.y += movementY;
            this.reloadElement(this.nowEditing);
            this.setContentChanger();
        }
        else if (this.resize == true) {
            if (this.resizeType == 0) {
                this.elements[this.nowEditing].pos.x += movementX;
                this.elements[this.nowEditing].pos.y += movementY;
                this.elements[this.nowEditing].size.width -= movementX;
                this.elements[this.nowEditing].size.height -= movementY;
            }
            else if (this.resizeType == 1) {
                this.elements[this.nowEditing].pos.x += movementX;
                this.elements[this.nowEditing].size.width -= movementX;
                this.elements[this.nowEditing].size.height += movementY;
            }
            else if (this.resizeType == 2) {
                this.elements[this.nowEditing].pos.y += movementY;
                this.elements[this.nowEditing].size.width += movementX;
                this.elements[this.nowEditing].size.height -= movementY;
            } else if (this.resizeType == 3) {
                this.elements[this.nowEditing].size.width += movementX;
                this.elements[this.nowEditing].size.height += movementY;
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

        elements = this.util.sortLayers(elements);

        for (var x of elements) {
            this.createElement(x);
        }
    }

    /**
     * 
     * @param {exitMe_gui_projectEditor_element} element
     */
    createElement(element) {
        element.id = System.makeid(10);
        element.layer = this.util.getLayerMax(this.elements) + 1;
        /**
         * @type {HTMLElement}
         */
        var domEL;
        domEL = this.elementFunctions[element.type].create(element, domEL);

        domEL.contextscript = ((self) => {
            var out = {};
            for (var x of this.contextMenuAll) {
                out[x.name] = x.action.bind(this, this.elements, element.id, this.content, this);
            }

            var s = this.elementFunctions[self.type].contextMenu;
            for (var x of s) {
                out[x.name] = x.action.bind(this, this.elements, element.id, this.content, this);
            }
            return out;
        }).bind(this, element);

        this.setElementInformation(element, domEL);

        domEL.addEventListener("click", this.click.bind(this, element.id));
        domEL.setAttribute("uuid", element.id)
        domEL.setAttribute("windowelement", "projectContent_element")
        domEL.setAttribute("windowid", this.window.getId())
        this.elements[element.id] = element;
        this.content.appendChild(domEL);
    }

    /**
     * 
     * @param {exitMe_gui_projectEditor_element} element 
     * @param {HTMLElement} domEL 
     */
    setElementInformation(element, domEL) {
        var r = this.elementFunctions[element.type].set(element, domEL);

        if (!r.includes("style_postion")) domEL.style.position = "absolute";
        if (!r.includes("style_left")) domEL.style.left = element.pos.x + "px";
        if (!r.includes("style_top")) domEL.style.top = element.pos.y + "px";
        if (!r.includes("style_width")) domEL.style.width = element.size.width + "px";
        if (!r.includes("style_height")) domEL.style.height = element.size.height + "px";
        if (!r.includes("style_zIndex")) domEL.style.zIndex = element.layer;

        this.gui.setPage(this.elements);
    }

    async editContent() {
        this.editing = true;
        var element = this.elements[this.nowEditing];
        var r = await this.elementFunctions[element.type].editContent(element, this.nowEditing, this.content);
        if (r != true) {
            this.editing = false;
        }
    }

    reloadElement(id) {
        this.setElementInformation(this.elements[id], document.querySelector(`[uuid="${id}"]`));
    }

    async click(id) {
        //this.elements[id].pos.x += 10;
        if (this.nowEditing != undefined) {
            if (this.editing) {
                if (this.content.querySelector(`[uuid="${this.nowEditing}"]`) == null) {
                    this.editing = true;
                    this.nowEditing = id;
                    this.updateSelect();
                    this.setContentChanger();
                    return;
                }
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

    get projectPath() {
        return this.getPath();
    }

    get saveFile() {
        return this.getSaveFile();
    }

    setPixelRatio(r) {
        this.content.style.width = r.split(":")[0] + "px";
        this.content.style.height = r.split(":")[1] + "px";
    }
}
new exitMe_gui_projectEditor();