class Html {
    constructor() {
        this.htmlEventList = {}
        this.htmlEventListThis = {}
        this.loadSystem();
    }
    async loadSystem() {
        console.log("initializing HTML");
        var body = await SystemFileSystem.getFileString("c/sys/HTML/body.html")
        var style = await SystemFileSystem.getFileString("c/sys/HTML/style.css")

        //load body
        document.body.innerHTML = body;

        var _StartMenuButton = document.querySelector("#startMenuButton")
        var _StartMenu = document.querySelector("#StartMenu");
        var _taskbar = document.querySelector("#taskbar");

        //load StartMenu
        await this.loadStartMenu(_StartMenu)


        //load style
        var styleSheet = document.createElement("style");
        styleSheet.innerText = style;
        document.head.appendChild(styleSheet);

        //add event listeners
        System.eventHandler.addEventHandler("click", (event, a) => {
            var _StartMenuButton = a[0];
            var _StartMenu = a[1];
            var _taskbar = a[2];

            if (!event.composedPath().includes(_StartMenu) && !event.composedPath().includes(_StartMenuButton)) {
                _StartMenu.style.display = "none";
            } else if (event.target == _StartMenuButton.querySelector("span")) {
                startMenuButton_Toggle();
                return true;
            }
            if (event.target == _taskbar) {
                console.log("taskbar stuff");
                console.log(event);
                return true;
            }

            if (event.composedPath().includes(_StartMenu)) {
                if (event.target != _StartMenu) {
                    var val = ""
                    if (event.target.className == "StartMenuSelector") {
                        val = event.composedPath()[0].attributes['key'].value;
                    } else {
                        val = event.composedPath()[1].attributes['key'].value;
                    }
                    startMenuButton_Toggle();
                    System.run(val);
                }
                return true;
            }
        }, [_StartMenuButton, _StartMenu, _taskbar]);

        this.WindowHandler = new WindowHandler();

        function startMenuButton_Toggle() {
            if (_StartMenu.style.display != "") {
                _StartMenu.style.display = "";
            } else {
                _StartMenu.style.display = "none";
            }
        }

    }
    async loadStartMenu(_StartMenu) {
        _StartMenu.innerHTML = "";
        var s = await System.options.get("startMenu");
        for (var n of Object.keys(s)) {
            var d = document.createElement("div")
            d.className = "StartMenuSelector"
            d.setAttribute("key", s[n])

            var p = document.createElement("p");
            p.innerText = n;
            d.append(p)

            var hr = document.createElement("hr")
            d.append(hr)

            _StartMenu.append(d);
        }
    }

    elementArrayContainsClass(array, clas) {
        for (var x of array) {
            if (x.classList != undefined && x.classList.contains(clas)) {
                return true;
            }
        }
        return false
    }

    htmlEventHandler(event) {
        SystemHtml.htmlEventParser(event)
    }
    /**
     * 
     * @param {Event} event 
     */
    htmlEventParser(event) {
        var id = event.target.getAttribute("windowid")
        var element = event.target.getAttribute("windowelement")
        var name = element + "__" + id;

        var eventType = event.type;
        eventType = eventType.replace("on", "");

        for (var x of this.htmlEventList[name][eventType]) {
            this.htmlEventListThis[name].x = x[0];
            this.htmlEventListThis[name].x(element, id, x[1]);
        }
    }
    removeAllEvents(id) {
        var rm = []
        for (var x of Object.keys(this.htmlEventList)) {
            if (x.endsWith("__" + id)) {
                delete this.htmlEventList[x]
            }
        }

    }

    addHtmlEvent(elementTag, id, callback, eventType, t, variables) {
        eventType = eventType.replace("on", "");

        var name = elementTag + "__" + id;
        if (this.htmlEventList[name] == undefined)
            this.htmlEventList[name] = {}
        if (this.htmlEventList[name][eventType] == undefined)
            this.htmlEventList[name][eventType] = []

        this.htmlEventListThis[name] = t;
        this.htmlEventList[name][eventType].push([callback, variables])
    }
}

class WindowHandler {
    constructor() {
        this.moving = false;
        this.usedWindowId = [];
        this.windows = {}

        this.presets = new presets();

        System.eventHandler.addEventHandler("mousemove", (event, a) => {
            if (SystemHtml.WindowHandler.moving == true) {
                var element = a[0].getWindowById(this.movingWindowId).getHtml()
                element.style.top = parseInt(element.style.top) + event.movementY + 'px';
                element.style.left = parseInt(element.style.left) + event.movementX + 'px';
            }
            else if (SystemHtml.WindowHandler.resize == true) {
                var element = a[0].getWindowById(this.resizeWindowId).addWindowSize(event.movementX, event.movementY);
            }
        }, [this])

        System.eventHandler.addEventHandler("mousedown", (event, args) => {
            //var id = args[0]
            ////if this window
            //if (SystemHtml.elementArrayContainsClass(event.composedPath(), "window_" + id)) {

            if (SystemHtml.elementArrayContainsClass(event.composedPath(), "window")) {
                //get id
                var el = null;
                for (var x of event.composedPath()) { if (x.classList.contains("window")) { el = x; break; } }
                if (el == null) { console.error("windowMouseDownEvent could not be fired because no window was found!"); return; }
                for (var x of el.classList) { if (x.startsWith("window_")) { el = x.replace("window_", "") } }
                var id = el;


                if (SystemHtml.WindowHandler.getWindowById(id).canUserResize && event.target.classList.contains("window") && SystemHtml.WindowHandler.moving == false) {
                    SystemHtml.WindowHandler.resize = true;
                    SystemHtml.WindowHandler.resizeWindowId = id;
                }
                else if (event.target.classList.contains("title-bar") || SystemHtml.elementArrayContainsClass(event.composedPath(), "title-bar-text")) {
                    SystemHtml.WindowHandler.moving = true;
                    SystemHtml.WindowHandler.movingWindowId = id;
                }
                if (event.target.classList.contains("close")) {
                    SystemHtml.WindowHandler.getWindowById(id).makeClose()
                }
            }
            //}
        });
        System.eventHandler.addEventHandler("mouseup", (event) => {
            if (SystemHtml.WindowHandler.moving == true) {
                SystemHtml.WindowHandler.moving = false
            } if (SystemHtml.WindowHandler.resize == true) {
                SystemHtml.WindowHandler.resize = false
            }
        });
        System.eventHandler.addEventHandler("mouseup", (event) => {
            if (SystemHtml.WindowHandler.moving == true) {
                SystemHtml.WindowHandler.moving = false
            } if (SystemHtml.WindowHandler.resize == true) {
                SystemHtml.WindowHandler.resize = false
            }
        });
    }
    async removeWindow(id) {
        SystemHtml.removeAllEvents(id);
        this.windows[id].getHtml().remove();
        this.windows[id] = undefined;
        remove(this.usedWindowId, id);
    }
    async createWindow(name, readyCallback) {
        var id = this.getFreeId();
        this.usedWindowId.push(id);
        var w = new Window(id);
        w.onReady = readyCallback
        await w.load(id, name);
        w.setPosition(20, 20)

        this.windows[id] = w;
        return w;
    }
    getFreeId() {
        var i = 0;
        while (this.usedWindowId.includes(i)) {
            i++
        }
        return i;
    }
    getWindowById(id) {
        return this.windows[id];
    }
}

class Window {
    #id;
    #sizeX;
    #sizeY;

    makeClose() {
        if (SystemHtml.WindowHandler.getWindowById(this.#id).close()) {
            this.remove();
        }
    }
    remove() {
        SystemHtml.WindowHandler.removeWindow(this.#id)
    }

    constructor(id) {
        this.size = new class {
            constructor(parent) {
                this.parent = parent;
            }
            /**
             * sets the x/y size of the window, if defined
             * @param {number | undefined} x 
             * @param {number | undefined} y 
             */
            async setSize(x, y) {
                this.parent.#sizeX = x;
                this.parent.#sizeY = y;
                this.parent.getHtml().style.width = this.parent.#sizeX + "px";
                this.parent.getHtml().style.height = this.parent.#sizeY + "px";
            }
            async htmlSizing() {
                this.parent.#sizeX = null;
                this.parent.#sizeY = null;
                this.parent.getHtml().style.width = "fit-content";
                this.parent.getHtml().style.height = "fit-content";
            }
            userCanResize(yn) {
                this.parent.canUserResize = yn;
                if (yn) {
                    this.parent.getHtml().style.padding = "12px"
                } else {
                    this.parent.getHtml().style.padding = "0px"
                }
            }
        }(this)
        this.appearence = new class {
            constructor(parent) {
                this.parent = parent;
                this.title = true;
            }
            showTitle(yn) {
                this.title = yn;
                var h = this.parent.getHtml();
                if (yn) {
                    h.querySelector(".title-bar").style.display = "";
                    h.querySelector(".content").style.height = "calc(100% - 43px)";
                } else {
                    h.querySelector(".title-bar").style.display = "none";
                    h.querySelector(".content").style.height = "calc(100% - 0px)";
                }
            }
        }(this)
        this.#sizeX = 200;
        this.#sizeY = 100;
        this.canUserResize = true;

        this.#id = id;
        this.close = () => {
            console.log("close action not defined!");
            return true;
        }
        this.onResize = () => {
            //didResize
        }
        this.onReady = () => {
            console.warn("unused ready");
        }
    }

    getId() {
        return this.#id
    }

    /**
     * sets the window position
     * @param {number} x 
     * @param {number} y 
     */
    setPosition(x, y) {
        var element = this.getHtml()
        element.style.top = x + 'px';
        element.style.left = y + 'px';
    }
    /**
     * returns position
     * @returns {[number,number]} [x,y]
     */
    getPosition() {
        var element = this.getHtml()
        return [parseInt(element.style.top), parseInt(element.style.left)]
    }

    async rename() { //TODO
        console.log("rename todo");
    }
    async load(id, name) {
        var windowStr = await SystemFileSystem.getFileString("c/sys/HTML/window.html");

        windowStr = windowStr.replace("%%id%%", "" + id)
        windowStr = windowStr.replace("%%name%%", name)
        document.querySelector("#stuff").insertAdjacentHTML('beforeend', windowStr);


        this.size.setSize(this.#sizeX, this.#sizeY);
        this.size.userCanResize(true);
        setTimeout(this.onReady, 1);
    }

    /**
     * Only used by the programm for resizing
     * @param {number} sizeX 
     * @param {number} sizeY 
     */
    addWindowSize(sizeX, sizeY) {
        this.#sizeX += sizeX;
        this.#sizeY += sizeY;
        if (sizeX != "automatic") {
            this.getHtml().style.width = this.#sizeX + "px";
            this.getHtml().style.height = this.#sizeY + "px";
        }
        this.onResize();
    }
    /**
     * 
     * @returns {HTMLDivElement}
     */
    getHtml() {
        return document.querySelector(".window_" + this.#id);
    }
    async setContent(htmlstr) {
        var html = this.getHtml();
        var cont = html.querySelector(".content")
        cont.innerHTML = htmlstr;
        await this.parseNewHtml();


        /*
        var defaultContent = await SystemFileSystem.getFileString("c/sys/HTML/content.html");
        var frame = document.createElement("iframe")
        frame.width = "300px"
        frame.height = "120px"
        frame.style.border = "none";
        frame.srcdoc = defaultContent.replace("<!--InjectHere-->", htmlstr
        
        var d = document.createElement("div");
        d.style.position = "absolute";
        d.style.width = "300px";
        d.style.height = "120px";
        d.style.background = "black";
        d.style.position = "absolute";
        d.style.pointerEvents = "none"
        
        cont.append(d);
        cont.append(frame);*/
        //console.warn("window.setContent TODO");
    }

    /**
     * returns this element
     * @param {string} tag only alphanumeric string
     * @returns {HTMLElement}
     */
    async getHtmlElement(tag) {
        return this.getHtml().querySelector('*[windowElement="' + tag + '"]')
    }

    async addHtmlEventListener(event, htmlElementTag, callback, t, variables) {
        if (event == "click") {
            await this.addHtmlEventListener("onclick", htmlElementTag, callback, t, variables);
            //await this.addHtmlEventListener("ontouchstart", htmlElementTag, callback);
        } else {
            var e = await this.getHtmlElement(htmlElementTag)
            e[event] = SystemHtml.htmlEventHandler;
            SystemHtml.addHtmlEvent(htmlElementTag, this.#id, callback, event, t, variables)
        }
    }
    async removeAllEventListeners() {
        SystemHtml.removeAllEvents(this.#id);
    }

    async parseNewHtml() {
        var e = this.getHtml().querySelectorAll("*[element]")
        for (var x of e) {
            //only searchable the first time
            x.setAttribute("windowElement", x.getAttribute("element"));
            x.removeAttribute("element");

            x.setAttribute("windowId", this.#id);
        }
    }
}

class presets {
    constructor() {
    }
    async createFileSelect() {
        var f = new fileSelectPreset()
        return await f.load();
    }
    async createNumSelect(title, text) {
        if (title == undefined) { title = "Select" }
        if (text == undefined) { text = "Please select" }
        var f = new numSelectPreset()
        return await f.load(title, text);
    }
    async createLoading(title, text) {
        if (title == undefined) { title = "Loading" }
        if (text == undefined) { text = "Loading" }
        var f = new loadingPreset();
        await await f.load(title, text);
        return f;
    }
}

class fileSelectPreset {
    constructor() {
    }
    async load() {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow("select",
            //onready:
            async () => {
                //set html
                await this.window.setContent('<div element="buttonArray"></div><button element="cancel">cancel</button>');
                var buttonArray = await this.window.getHtmlElement("buttonArray")

                for (var x of Object.keys(fastFileLookup)) {
                    var b = document.createElement("button")
                    b.innerText = x;
                    b.setAttribute("element", "f_" + x)
                    buttonArray.append(b)
                    await this.window.parseNewHtml();

                    await this.window.addHtmlEventListener("onclick", "f_" + x, (elementName) => {
                        //read data
                        elementName = elementName.slice(2)
                        this.returnFunction(elementName);

                        //close and return
                        this.window.remove()
                    }, this);
                }

                await this.window.size.setSize(500, 300);
                await this.window.size.userCanResize(true)

                //add event listeners
                await this.window.addHtmlEventListener("onclick", "cancel", () => {
                    //read data
                    this.returnFunction(undefined)

                    //close and return
                    this.window.remove()
                }, this);
            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
}
class numSelectPreset {
    constructor() {
    }
    async load(title, text) {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent('<p element="text"></p><input element="input" type="number"><button element="ok">ok</button><button element="cancel">cancel</button>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.setSize(400, 200);
                await this.window.size.userCanResize(true)

                //add event listeners
                await this.window.addHtmlEventListener("onclick", "cancel", () => {
                    //read data
                    this.returnFunction(undefined)

                    //close and return
                    this.window.remove()
                }, this);
                await this.window.addHtmlEventListener("onclick", "ok", async () => {
                    //read data
                    this.returnFunction((await this.window.getHtmlElement("input")).value)

                    //close and return
                    this.window.remove()
                }, this);
            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
}
class loadingPreset {
    constructor() {
    }
    async load(title, text) {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });
        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent('<p element="text"></p><p element="p">0%</p>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.htmlSizing();
                await this.window.size.userCanResize(false)
                this.returnFunction();
            });
        this.window.close = () => {
            return true
        }
        return promise;
    }
    async setNum(proc) {
        var p = await this.window.getHtmlElement("p");
        p.innerText = proc + "%"
    }
    stop() {
        this.window.remove()
    }
}

SystemHtml = new Html();