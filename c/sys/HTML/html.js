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

            if (!event.composedPath().includes(_StartMenu) && !event.composedPath().includes(_StartMenuButton)) {
                _StartMenu.style.display = "none";
            }
            else if (event.target == _StartMenuButton.querySelector("span")) {
                startMenuButton_Toggle();
                return true;
            }

            if (this.elementArrayContainsClass(event.composedPath(), "taskbar-programList")) {
                //console.log("taskbar stuff");
                //console.log(event);
                //return true;
                return false;
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
        }, [_StartMenuButton, _StartMenu]);

        this.WindowHandler = new WindowHandler();

        function startMenuButton_Toggle() {
            if (_StartMenu.style.display != "") {
                _StartMenu.style.display = "";
            } else {
                _StartMenu.style.display = "none";
            }
        }

        //background image
        System.settings.addSettingsUpdater("backgroundImage", () => {
            console.log("update")
            backgroundImgLoader();
        })

        async function backgroundImgLoader() {
            document.querySelector("#all").style.background = 'url("' + SystemFileSystem.toImg(await SystemFileSystem.getFileString((await System.options.get("settings"))["backgroundImage"][0])) + '") center center / cover no-repeat';
        }
        backgroundImgLoader();
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

        //check if window is focused
        if (this.WindowHandler.focusedWindow != parseInt(id)) {
            //this.WindowHandler.focus(id);
            return;
        }

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
        this.windows = {};

        this.windowLayering = [];

        this.presets = new presets();

        System.eventHandler.addEventHandler("mousemove", (event, a) => {
            if (SystemHtml.WindowHandler.moving == true) {
                var element = a[0].getWindowById(this.movingWindowId).getHtml()
                //var [x, y] = a[0].getWindowById(this.movingWindowId).getPosition()
                //a[0].getWindowById(this.movingWindowId).setPosition(x + event.movementX, y + event.movementY);
                var y = parseInt(element.style.top) + event.movementY
                var x = parseInt(element.style.left) + event.movementX
                if (x < 0) { x = 0; }
                if (y < 0) { y = 0; }
                element.style.top = y + 'px';
                element.style.left = x + 'px';
            }
            else if (SystemHtml.WindowHandler.resize == true) {
                var element = a[0].getWindowById(this.resizeWindowId).addWindowSize(event.movementX, event.movementY);
            }
        }, [this])

        System.eventHandler.addEventHandler("mousedown", (event, args) => {
            //if window
            if (SystemHtml.elementArrayContainsClass(event.composedPath(), "window")) {
                //get id
                var el = null;
                for (var x of event.composedPath()) { if (x.classList.contains("window")) { el = x; break; } }
                if (el == null) { console.error("windowMouseDownEvent could not be fired because no window was found!"); return; }
                for (var x of el.classList) { if (x.startsWith("window_")) { el = x.replace("window_", "") } }
                var id = el;

                //resize
                if (SystemHtml.WindowHandler.getWindowById(id).canUserResize && event.target.classList.contains("window") && SystemHtml.WindowHandler.moving == false) {
                    SystemHtml.WindowHandler.putWindowOnTop(id);
                    SystemHtml.WindowHandler.resize = true;
                    SystemHtml.WindowHandler.resizeWindowId = id;
                }
                //move
                else if (event.target.classList.contains("title-bar") || SystemHtml.elementArrayContainsClass(event.composedPath(), "title-bar-text")) {
                    SystemHtml.WindowHandler.putWindowOnTop(id);
                    SystemHtml.WindowHandler.moving = true;
                    SystemHtml.WindowHandler.movingWindowId = id;
                }
                //close
                if (event.target.classList.contains("close")) {
                    SystemHtml.WindowHandler.getWindowById(id).makeClose()
                }
            }
        });
        System.eventHandler.addEventHandler("mouseup", (event) => {
            if (SystemHtml.WindowHandler.moving == true) {
                SystemHtml.WindowHandler.moving = false
            } if (SystemHtml.WindowHandler.resize == true) {
                SystemHtml.WindowHandler.resize = false
            }
        });
        System.eventHandler.addEventHandler("click", (event, args) => {
            //if window
            if (SystemHtml.elementArrayContainsClass(event.composedPath(), "window")) {
                //get id
                var el = null;
                for (var x of event.composedPath()) { if (x.classList.contains("window")) { el = x; break; } }
                if (el == null) { console.error("windowMouseDownEvent could not be fired because no window was found!"); return; }
                for (var x of el.classList) { if (x.startsWith("window_")) { el = x.replace("window_", "") } }
                var id = el;


                if (parseInt(id) != SystemHtml.WindowHandler.focusedWindow) {
                    SystemHtml.WindowHandler.focus(id);
                    return;
                }
            }
        });
    }
    async removeWindow(id) {
        SystemHtml.removeAllEvents(id);
        this.windows[id].getHtml().remove();
        delete this.windows[id]
        remove(this.usedWindowId, id);
        remove(this.windowLayering, id);
        this.updateTaskBar();
    }
    async createWindow(name, readyCallback) {
        var id = this.getFreeId();
        this.usedWindowId.push(id);
        this.windowLayering.push(id);
        var w = new Window(id);
        w.onReady = readyCallback
        await w.load(id, name);
        w.setPosition(20, 20)

        this.windows[id] = w;

        this.updateWindowLayering();
        this.updateTaskBar();

        setTimeout(() => {
            this.focus(id);
        }, 1);
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

    get focusedWindow() {
        return this.windowLayering[this.windowLayering.length - 1];
    }

    putWindowOnTop(id) {
        id = parseInt(id);

        remove(this.windowLayering, id);
        this.windowLayering.push(id);

        this.updateWindowLayering();
    }
    updateWindowLayering() {
        var i = 1;
        for (var x of this.windowLayering) {
            this.getWindowById(x).setLayer(i);
            if (i == this.windowLayering.length) {
                var b = this.getWindowById(x).ontop;
                this.getWindowById(x).ontop = true;
                if (b != true) {
                    this.updateTaskBar();
                }
            } else {
                this.getWindowById(x).ontop = false;
            }
            i++;
        }
    }
    updateTaskBar() {
        var programList = document.querySelector("#taskbar-programList");
        programList.innerHTML = "";
        for (var x of Object.keys(this.windows)) {
            var p = this.createTaskBarProgram(this.windows[x].getTitle(), this.windows[x].ontop, this.windows[x].getId());
            programList.append(p);
        }
    }
    createTaskBarProgram(name, ontop, id) {
        var programDiv = document.createElement("div");
        programDiv.className = "programListElement";
        if (ontop) { programDiv.className += " selected" }
        programDiv.onclick = () => {
            SystemHtml.WindowHandler.focus(id);
        }

        var titleElement = document.createElement("p");
        titleElement.innerText = name;

        programDiv.append(titleElement);
        return programDiv
    }
    focus(id) {
        this.putWindowOnTop(id);
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
        this.ontop = true;
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
                    h.querySelector(".contentBody").style.height = "calc(100% - 43px)";
                } else {
                    h.querySelector(".title-bar").style.display = "none";
                    h.querySelector(".contentBody").style.height = "calc(100% - 0px)";
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
        if (x < 0) { x = 0; }
        if (y < 0) { y = 0; }
        element.style.left = x + 'px';
        element.style.top = y + 'px';
    }
    /**
     * returns position
     * @returns {[number,number]} [x,y]
     */
    getPosition() {
        var element = this.getHtml()
        return [parseInt(element.style.top), parseInt(element.style.left)]
    }

    async rename(name) { //TODO
        this.getHtml().querySelector(".window-name").innerText = name;
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

    getTitle() {
        return this.getHtml().querySelector(".window-name").innerText;
    }

    /**
     * returns this element
     * @param {string} tag only alphanumeric string
     * @returns {HTMLElement}
     */
    async getHtmlElement(tag) {
        return this.getHtml().querySelector('*[windowElement="' + tag + '"]')
    }
    /**
     * returns this element
     * @param {string} tag only alphanumeric string
     * @returns {NodeListOf<HTMLElement>}
     */
    async getHtmlElements(tag) {
        return this.getHtml().querySelectorAll('*[windowElement="' + tag + '"]')
    }

    /**
     * 
     * @param {string} event Html element Event (e.g. onclick) 
     * @param {string} htmlElementTag Html Element "element" tag ('<div element="tagofdoom"></div>': 'tagofdoom') 
     * @param {(variable)} callback run when the event is triggered
     * @param {class} t the class to run the callback function in
     * @param {*} variable one variable passed in the callback function
     */
    async addHtmlEventListener(event, htmlElementTag, callback, t, variable) {
        if (event == "click") {
            await this.addHtmlEventListener("onclick", htmlElementTag, callback, t, variable);
            //await this.addHtmlEventListener("ontouchstart", htmlElementTag, callback);
        } else {
            var e = await this.getHtmlElement(htmlElementTag)
            e[event] = SystemHtml.htmlEventHandler;
            SystemHtml.addHtmlEvent(htmlElementTag, this.#id, callback, event, t, variable)
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

    async setLayer(id) {
        (await this.getHtml()).style.zIndex = id;
    }
}

class presets {
    constructor() {
    }
    async createFileSelect(title) {
        var f = new fileSelectPreset()
        if (title == undefined) {
            title = "Select"
        }
        return await f.load(title);
    }
    async createFileCreate(title) {
        var f = new fileCreatePreset()
        if (title == undefined) {
            title = "Select"
        }
        return await f.load(title);
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
    async createStringSelect(title, text) {
        if (title == undefined) { title = "Select" }
        if (text == undefined) { text = "Please select" }
        var f = new stringSelectPreset()
        return await f.load(title, text);
    }
    async createConfirm(title, text) {
        if (title == undefined) { title = "Select" }
        if (text == undefined) { text = "Please select" }
        var f = new confirmPreset()
        return await f.load(title, text);
    }
}

class fileSelectPreset {
    constructor() {
    }
    async load(title) {
        this.path = "c";
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent(`
                <button element="back">...</button>
                <hr>
                <div element="folderList">
                    <p>pls remove</p>
                </div>
                <div element="fileList">
                    <p>pls remove</p>
                </div>
                <hr>
                <button element="cancel">cancel</button>`);
                await this.create();

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
    async create() {
        await this.window.removeAllEventListeners();
        await this.window.addHtmlEventListener("click", "back", this.back, this)



        var folderStuff = await this.window.getHtmlElement("folderList")
        folderStuff.innerHTML = "";
        var fileStuff = await this.window.getHtmlElement("fileList")
        fileStuff.innerHTML = "";

        var i = 0
        for (var x of await SystemFileSystem.getFolders(this.path)) {
            var b = document.createElement("button")
            b.innerText = x + "/";
            b.setAttribute("element", i + "_el")
            folderStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button1, this, [x, i])
            i++;
        }
        for (var x of await SystemFileSystem.getFiles(this.path)) {
            var b = document.createElement("button")
            b.innerText = x;
            b.setAttribute("element", i + "_el")
            fileStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button2, this, [x, i])
            i++;
        }
    }
    async button1(_, __, vars) {
        this.path += "/" + vars[0];
        this.create()
    }
    async button2(_, __, vars) {
        this.returnFunction(this.path + "/" + vars[0]);
        this.window.remove()
    }
    async back() {
        var p = this.path.split("/")
        var p = p.slice(0, -1);
        if (p.length == 0) {
            p = ["c"];
        }
        this.path = p.join("/");
        this.create()
    }
}
class fileCreatePreset {
    constructor() {
    }
    async load(title) {
        this.path = "c";
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent(`
                <button element="back">...</button>
                <hr>
                <div element="folderList">
                    <p>pls remove</p>
                </div>
                <div element="fileList">
                    <p>pls remove</p>
                </div>
                <hr>
                <input type="text" element="name" placeholder="file name"></input>
                <button element="ok">ok</button>
                <button element="cancel">cancel</button>`);
                await this.create();

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
    async create() {
        await this.window.removeAllEventListeners();
        await this.window.addHtmlEventListener("click", "back", this.back, this)
        await this.window.addHtmlEventListener("click", "ok", this.ok, this)



        var folderStuff = await this.window.getHtmlElement("folderList")
        folderStuff.innerHTML = "";
        var fileStuff = await this.window.getHtmlElement("fileList")
        fileStuff.innerHTML = "";

        var i = 0
        for (var x of await SystemFileSystem.getFolders(this.path)) {
            var b = document.createElement("button")
            b.innerText = x + "/";
            b.setAttribute("element", i + "_el")
            folderStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button1, this, [x, i])
            i++;
        }
        for (var x of await SystemFileSystem.getFiles(this.path)) {
            var b = document.createElement("button")
            b.innerText = x;
            b.setAttribute("element", i + "_el")
            fileStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button2, this, [x, i])
            i++;
        }
    }
    async ok() {
        var name = (await this.window.getHtmlElement("name")).value;

        //if file exists
        if (await SystemFileSystem.fileExists(this.path + "/" + name)) {
            if (!await SystemHtml.WindowHandler.presets.createConfirm("Overwrite", "Overwrite this file?")) {
                //cancel
                return;
            }
        }

        //return
        this.returnFunction(this.path + "/" + name);
        this.window.remove()
    }
    async button1(_, __, vars) {
        this.path += "/" + vars[0];
        this.create()
    }
    async button2(_, __, vars) {
        if (await SystemHtml.WindowHandler.presets.createConfirm("Overwrite", "Overwrite this file?")) {
            this.returnFunction(this.path + "/" + vars[0]);
            this.window.remove()
        }
    }
    async back() {
        var p = this.path.split("/")
        var p = p.slice(0, -1);
        if (p.length == 0) {
            p = ["c"];
        }
        this.path = p.join("/");
        this.create()
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
class stringSelectPreset {
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
                await this.window.setContent('<p element="text"></p><input element="input" type="text"><button element="ok">ok</button><button element="cancel">cancel</button>');

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
class confirmPreset {
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
                await this.window.setContent('<p element="text"></p><button element="ok">Yes</button><button element="cancel">No</button>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.setSize(400, 200);
                await this.window.size.userCanResize(true)

                //add event listeners
                await this.window.addHtmlEventListener("onclick", "cancel", () => {
                    //read data
                    this.returnFunction(false);

                    //close and return
                    this.window.remove()
                }, this);
                await this.window.addHtmlEventListener("onclick", "ok", async () => {
                    //read data
                    this.returnFunction(true);

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