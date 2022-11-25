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
        var _StartMenuPrograms = document.querySelector("#StartMenuPrograms");
        var _StartMenuFastButtons = document.querySelector("#startMenuFastButtons");
        var _taskbar = document.querySelector("#taskbar");

        //load StartMenu
        await this.loadStartMenu(_StartMenuPrograms);


        //load style
        var styleSheet = document.createElement("style");
        styleSheet.innerText = style;
        document.head.appendChild(styleSheet);

        //add event listeners
        System.eventHandler.addEventHandler("click", (event, a) => {
            var _StartMenuButton = a[0];
            var _StartMenu = a[1];
            var _StartMenuPrograms = a[1].querySelector("#StartMenuPrograms");

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

            if (event.composedPath().includes(_StartMenuPrograms)) {
                if (event.target != _StartMenuPrograms) {
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
            if (event.composedPath().includes(_StartMenuFastButtons)) {
                if (event.target != _StartMenuPrograms) {
                    var val = ""
                    if (event.target.className == "StartMenuFastButton") {
                        val = event.composedPath()[0].attributes['key'].value;
                    }
                    startMenuButton_Toggle();
                    System.run(val);
                }
                return true;
            }
        }, [_StartMenuButton, _StartMenu]);

        this.WindowHandler = new WindowHandler();
        this.ContextMenu = new ContextMenu();

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

        System.eventHandler.addEventHandler("keydown", async (event) => {
            if (event.key == "F5") {
                event.preventDefault();
                if (event.ctrlKey) {
                    if (await SystemHtml.WindowHandler.presets.createFastConfirm("reset everything", "cancel")) {
                        System.run("c/sys/functions/reset.js");
                    }
                }
            }
        })
    }
    async updateStartmenu() {
        SystemHtml.loadStartMenu(document.querySelector("#StartMenuPrograms"))
    }
    async loadStartMenu(_StartMenu) {
        _StartMenu.innerHTML = "";
        document.querySelector("#startMenuFastButtons").innerHTML = "";
        //var s = await System.options.get("startMenu");
        var s = await System.options.get("programs");
        for (var n of Object.keys(s)) {
            var d = document.createElement("div")
            d.className = "StartMenuSelector"
            d.setAttribute("key", s[n]["run"])

            var p = document.createElement("p");
            p.innerText = s[n]["name"];
            d.append(p)

            var hr = document.createElement("hr")
            d.append(hr)

            _StartMenu.append(d);
        }

        var s = await System.options.get("StartMenuButtons");
        for (var n of Object.keys(s)) {
            var d = document.createElement("button")
            d.className = "StartMenuFastButton"
            d.setAttribute("key", s[n]["click"])
            d.setAttribute("tooltip", s[n]["tooltip"])
            d.innerText = n;

            document.querySelector("#startMenuFastButtons").append(d);
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

        var element = event.target.getAttribute("windowelement");
        if (element != undefined) {
            var name = element + "__" + id;

            var eventType = event.type;
            eventType = eventType.replace("on", "");

            for (var x of this.htmlEventList[name][eventType]) {
                this.htmlEventListThis[name].x = x[0];
                this.htmlEventListThis[name].x(element, id, x[1], event);
            }
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
class ContextMenu {
    constructor() {
        this.ContextEvent = class {
            constructor(element, ogEvent) {
                this.target = element;
                this.originalEvent = ogEvent;
            }
        }

        System.eventHandler.addEventHandler("mousedown", (event) => {
            if (event.target.className == "contextmenubutton") {
                event.target.onclick();
            }

            //close all contextmenus
            for (var x of document.querySelectorAll(".contextmenu")) {
                x.remove();
            }
        });
        System.eventHandler.addEventHandler("contextmenu", (event) => {
            var eventButtons = {};
            var path = event.composedPath().reverse();
            for (var pathElement of path) {
                if (pathElement != document && pathElement != window) {
                    var contextScript = pathElement.contextscript
                    var contextDat = pathElement.getAttribute("contextdat");

                    var dat = {};

                    if (contextScript != null) {
                        var cs = contextScript(pathElement);
                        if (cs != undefined) {
                            for (var x of Object.keys(cs)) {
                                dat[x] = [cs[x], new this.ContextEvent(pathElement, event)];
                            }
                        }
                    }
                    if (contextDat != null) {
                        var cs = eval("(" + contextDat + ")");
                        if (cs != undefined) {
                            for (var x of Object.keys(cs)) {
                                dat[x] = [cs[x], new this.ContextEvent(pathElement, event)];
                            }
                        }
                    }

                    for (var x of Object.keys(dat)) {
                        eventButtons[x] = dat[x];
                    }
                }
            }
            this.showContext(eventButtons, [event.clientX, event.clientY]);
        }, []);
    }

    showContext(eventButtons, position) {
        //close all contextmenus
        for (var x of document.querySelectorAll(".contextmenu")) {
            x.remove();
        }

        var div = document.createElement("div");
        div.className = "contextmenu"
        div.style.top = position[1] + "px";
        div.style.left = position[0] + "px";

        for (var x of Object.keys(eventButtons)) {
            div.appendChild(this.createContextButton(x, eventButtons[x]));
        }

        document.body.appendChild(div);
    }
    createContextButton(name, information) {
        var button = document.createElement("button");
        button.className = "contextmenubutton"
        button.innerText = name;
        button.onclick = (event) => {
            information[0](information[1]);
        }

        return button;
    }
}

class WindowHandler {
    constructor() {
        this.iframeConnections = {};

        this.windowsCreated = 1;

        this.moving = false;
        this.usedWindowId = [];
        /** @type {{[id:number]:HtmlWindow}} */
        this.windows = {};

        this.windowLayering = [];

        this.presets = new presets();

        System.eventHandler.addEventHandler("mousemove", (event, a) => {
            if (SystemHtml.WindowHandler.moving == true) {
                /**
                 * @type {HtmlWindow}
                 */
                var window = a[0].getWindowById(this.movingWindowId);
                var element = window.getHtml();

                var y = parseInt(element.style.top) + event.movementY;
                var x = parseInt(element.style.left) + event.movementX;
                window.setPosition(x, y);
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

                    //iframs not clickable
                    this.iframeNoClick()
                }
                //move
                else if (event.target.classList.contains("title-bar") || SystemHtml.elementArrayContainsClass(event.composedPath(), "title-bar-text")) {
                    if (!SystemHtml.WindowHandler.getWindowById(id).size.max) {
                        SystemHtml.WindowHandler.putWindowOnTop(id);
                        SystemHtml.WindowHandler.moving = true;
                        SystemHtml.WindowHandler.movingWindowId = id;

                        //iframs not clickable
                        this.iframeNoClick()
                    }
                }
            }
        });
        System.eventHandler.addEventHandler("mouseup", (event, a) => {
            if (SystemHtml.WindowHandler.moving == true) {
                //check if out of bounds
                /**
                 * @type {HtmlWindow}
                 */
                var currentwindow = a[0].getWindowById(this.movingWindowId);
                var element = currentwindow.getHtml();

                var y = parseInt(element.style.top) + event.movementY;
                var x = parseInt(element.style.left) + event.movementX;



                if (x < +175 - currentwindow.size.getSize()[0]) { x = +175 - currentwindow.size.getSize()[0]; }
                if (y < -10) { y = -10; }

                if (x > window.innerWidth - 150) { x = window.innerWidth - 150 };
                if (y > window.innerHeight - 50 - 39) { y = window.innerHeight - 50 - 39 };
                currentwindow.setPosition(x, y);

                SystemHtml.WindowHandler.moving = false;


                var ifr = document.querySelectorAll("iframe");
                for (var iframe of ifr) {
                    iframe.style.pointerEvents = "";
                }
            } if (SystemHtml.WindowHandler.resize == true) {
                SystemHtml.WindowHandler.resize = false;


                var ifr = document.querySelectorAll("iframe");
                for (var iframe of ifr) {
                    iframe.style.pointerEvents = "";
                }
            }
        }, [this]);
        System.eventHandler.addEventHandler("click", (event, args) => {
            //if window
            if (SystemHtml.elementArrayContainsClass(event.composedPath(), "window")) {
                //get id
                var el = null;
                for (var x of event.composedPath()) { if (x.classList.contains("window")) { el = x; break; } }
                if (el == null) { console.error("windowClickEvent could not be fired because no window was found!"); return; }
                for (var x of el.classList) { if (x.startsWith("window_")) { el = x.replace("window_", "") } }
                var id = el;

                //focus window
                if (parseInt(id) != SystemHtml.WindowHandler.focusedWindow) {
                    if (SystemHtml.WindowHandler.windows[parseInt(id)] != undefined) {
                        SystemHtml.WindowHandler.focus(id);
                        return;
                    }
                }

                //close
                if (event.target.classList.contains("close")) {
                    SystemHtml.WindowHandler.getWindowById(id).makeClose()
                }
                //maximize
                if (event.target.classList.contains("maximize")) {
                    SystemHtml.WindowHandler.getWindowById(id).size.maxToggle();
                }
                //minimize
                if (event.target.classList.contains("minimize")) {
                    SystemHtml.WindowHandler.getWindowById(id).appearence.toggleMinimize();

                }
            }
        });
        System.eventHandler.addEventHandler("resize", (event, args) => {
            //update fullscreen windows
            for (var id in Object.keys(SystemHtml.WindowHandler.windows)) {
                if (SystemHtml.WindowHandler.windows[id] != undefined && SystemHtml.WindowHandler.windows[id].size.max == true) {
                    SystemHtml.WindowHandler.windows[id].size.updateMax();
                }
            }
        });

        window.addEventListener('message', async function (e) {
            var data = JSON.parse(e.data);
            var x = SystemHtml.WindowHandler.iframeConnections[data["id"]]

            if (data["type"] == "prompt") {
                var r = await SystemHtml.WindowHandler.presets.createStringSelect(data["text"], data["text"]);
                x.contentWindow.postMessage(JSON.stringify({ "type": "return", "id": data["returnid"], "return": r }), x.src);
            }
            else if (data["type"] == "confirm") {
                var r = await SystemHtml.WindowHandler.presets.createConfirm(data["text"], data["text"]);
                x.contentWindow.postMessage(JSON.stringify({ "type": "return", "id": data["returnid"], "return": r }), x.src);
            }
            else if (data["type"] == "alert") {
                SystemHtml.WindowHandler.presets.createInformation(data["text"], data["text"]);
            }
        });
    }
    iframeNoClick() {
        var ifr = document.querySelectorAll("iframe");
        for (var iframe of ifr) {
            iframe.style.pointerEvents = "none";
        }
    }
    async removeWindow(id) {
        SystemHtml.removeAllEvents(id);
        this.windows[id].getHtml().remove();
        delete this.windows[id]
        remove(this.usedWindowId, id);
        remove(this.windowLayering, id);
        this.updateWindowLayering();
    }
    /**
     * @async
     * @param {string} name Name of the window
     * @param {()=>void} readyCallback gets called, when the window is ready to be set
     * @returns {Promise<HtmlWindow>} Created window
     */
    async createWindow(name, readyCallback) {
        var id = this.getFreeId();
        this.usedWindowId.push(id);
        this.windowLayering.push(id);
        var w = new HtmlWindow(id);
        w.onReady = readyCallback
        await w.load(id, name);

        this.windowsCreated++;
        if (20 * this.windowsCreated >= (window.innerWidth - 50) / 10 || 20 * this.windowsCreated >= (window.innerHeight - 50) / 10) {
            this.windowsCreated = 1;
        }
        w.setPosition(20 * this.windowsCreated, 20 * this.windowsCreated)

        this.windows[id] = w;

        this.updateWindowLayering();

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
    /**
     * Get Window by id
     * @param {number} id id of the window
     * @returns {HtmlWindow} requested window
     */
    getWindowById(id) {
        return this.windows[id];
    }
    /**
     * @returns {HtmlWindow}
     */
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
        var windowLayeringWithoutHidden = []
        for (var x of this.windowLayering) {
            if (this.getWindowById(x) != undefined && this.getWindowById(x).appearence.shown) {
                windowLayeringWithoutHidden.push(x);
            }
        }

        var i = 1;
        for (var x of windowLayeringWithoutHidden) {
            var win = this.getWindowById(x)

            if (win != undefined) {
                win.setLayer(i);
                if (i == windowLayeringWithoutHidden.length) {
                    var b = win.ontop;
                    win.ontop = true;
                    win.getHtml().style.filter = "";
                } else {
                    win.ontop = false;
                    win.getHtml().style.filter = "brightness(0.98)";
                }
                i++;
            }
        }

        if (this.focusedWindow != undefined && this.getWindowById(this.focusedWindow) != undefined) {
            if (this.getWindowById(this.focusedWindow).size.fullMax) {
                document.querySelector("#taskbar").style.display = "none";
            } else {
                document.querySelector("#taskbar").style.display = "";
            }
        }
        this.updateTaskBar();
    }
    updateTaskBar() {
        var programList = document.querySelector("#taskbar-programList");
        programList.innerHTML = "";
        for (var x of Object.keys(this.windows)) {
            var p = this.createTaskBarProgram(this.windows[x].getTitle(), this.windows[x].ontop, this.windows[x].getId(), this.windows[x]);

            programList.append(p);
        }
    }
    createTaskBarProgram(name, ontop, id, window) {
        var programDiv = document.createElement("div");
        programDiv.className = "programListElement";
        if (window.appearence.shown) {
            if (ontop) { programDiv.className += " selected" }
        } else {
            if (ontop) { programDiv.className += " hidden" }
        }
        programDiv.onclick = () => {
            SystemHtml.WindowHandler.focus(id);
        }

        var titleElement = document.createElement("p");
        titleElement.innerText = name;

        programDiv.append(titleElement);
        return programDiv
    }
    focus(id) {
        this.getWindowById(id).appearence.show();
        this.putWindowOnTop(id);
    }
}

class HtmlWindow {
    #id;
    #sizeX;
    #sizeY;

    makeClose() {
        if (SystemHtml.WindowHandler.getWindowById(this.#id).close()) {
            this.remove();
        }
    }
    /**
     * remove the window
     */
    remove() {
        SystemHtml.WindowHandler.removeWindow(this.#id)
    }

    constructor(id) {
        this.ontop = true;
        this.size = new class {
            constructor(parent) {
                /**
                 * @type {HtmlWindow}
                 */
                this.parent = parent;
                this.max = false;
                this.fullMax = false;

                this.maxBefore = { "normal": { "pos": [20, 20], "size": [100, 100], "userResize": true, "showTitle": true }, "fullmax": {}, "max": {} };
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
            getSize() {
                return [this.parent.#sizeX, this.parent.#sizeY]
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
                    this.parent.getHtml().querySelector(".maximize").style.display = "";
                    this.parent.getHtml().style.padding = "12px"
                } else {
                    this.parent.getHtml().querySelector(".maximize").style.display = "none";
                    this.parent.getHtml().style.padding = "0px"
                }
            }
            async maxToggle() {
                var m = !this.max;
                if (m) {
                    await this.setMax();
                } else {
                    this.notMax();
                }
            }
            async setfullMax() {
                var t = "normal";
                if (this.max) t = "max";
                if (this.fullMax) t = "fullmax";

                this.maxBefore[t]["size"] = await this.getSize();
                this.maxBefore[t]["pos"] = this.parent.getPosition();
                this.maxBefore[t]["userResize"] = this.parent.canUserResize
                this.maxBefore[t]["showTitle"] = this.parent.appearence.title;

                this.fullMax = true;
                this.max = true;

                this.userCanResize(false);
                this.parent.getHtml().querySelector(".maximize").style.display = "";
                this.parent.setPosition(0, 0);
                await this.setSize(window.innerWidth, window.innerHeight);
                this.parent.appearence.showTitle(false);

                SystemHtml.WindowHandler.updateWindowLayering();
            }
            async notMax() {
                this.fullMax = false;
                this.max = false;
                var t = "normal";

                this.parent.setPosition(this.maxBefore[t]["pos"][0], this.maxBefore[t]["pos"][1]);
                this.setSize(this.maxBefore[t]["size"][0], this.maxBefore[t]["size"][1]);
                this.userCanResize(this.maxBefore[t]["userResize"]);
                this.parent.appearence.showTitle(this.maxBefore[t]["showTitle"]);
                SystemHtml.WindowHandler.updateWindowLayering();
            }
            async setMax() {
                var t = "normal";
                if (this.max) { t = "max" };
                if (this.fullMax) { t = "fullmax" };

                this.maxBefore[t]["size"] = await this.getSize();
                this.maxBefore[t]["pos"] = this.parent.getPosition();
                this.maxBefore[t]["userResize"] = this.parent.canUserResize;

                this.parent.appearence.showTitle(this.maxBefore["normal"]["showTitle"]);
                this.maxBefore[t]["showTitle"] = this.parent.appearence.title;

                this.fullMax = false;
                this.max = true;

                await this.updateMax();
                SystemHtml.WindowHandler.updateWindowLayering();
            }
            async updateMax() {
                this.userCanResize(false);
                this.parent.getHtml().querySelector(".maximize").style.display = "";
                this.parent.setPosition(0, 0);
                if (this.fullMax) {
                    await this.setSize(window.innerWidth, window.innerHeight);
                } else {
                    await this.setSize(window.innerWidth, window.innerHeight - 39);
                }
            }
        }(this)
        this.appearence = new class {
            constructor(parent) {
                /**
                 * @type {HtmlWindow}
                 */
                this.parent = parent;
                this.title = true;
                this.shown = true;
            }
            showTitle(yn) {
                this.title = yn;
                var h = this.parent.getHtml();
                if (yn) {
                    h.querySelector(".title-bar").style.display = "";
                    h.querySelector(".contentBody").style.height = "calc(100% - 40px)";
                } else {
                    h.querySelector(".title-bar").style.display = "none";
                    h.querySelector(".contentBody").style.height = "calc(100% - 0px)";
                }
            }
            minimize() {
                var h = this.parent.getHtml();
                h.style.display = "none";
                this.shown = false;
                SystemHtml.WindowHandler.updateTaskBar();
            }
            show() {
                var h = this.parent.getHtml();
                h.style.display = "";

                this.shown = true;
            }
            toggleMinimize() {
                if (this.show) {
                    this.minimize();
                } else {
                    this.show();
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

    /**
     * returns the window id
     * @returns {number}
     */
    getId() {
        return this.#id
    }

    /**
     * sets the window position
     * @param {number} x 
     * @param {number} y 
     */
    setPosition(x, y) {
        var element = this.getHtml()/*
        if (x < 0) { x = 0; }
        if (y < 0) { y = 0; }

        if (x > window.innerWidth - 50) { x = window.innerWidth - 50 };
        if (y > window.innerHeight - 40 - 39) { y = window.innerHeight - 40 - 39 };*/

        element.style.left = x + 'px';
        element.style.top = y + 'px';
    }
    /**
     * returns position
     * @returns {[number,number]} [x,y]
     */
    getPosition() {
        var element = this.getHtml()
        return [parseInt(element.style.left), parseInt(element.style.top)]
    }
    /**
     * renames the window
     * @param {string} name 
     */
    async rename(name) {
        this.getHtml().querySelector(".window-name").innerText = name;
    }
    async load(id, name) {
        var windowStr = await SystemFileSystem.getFileString("c/sys/HTML/window.html");

        windowStr = windowStr.replace("%%id%%", "" + id).replace("%%id%%", "" + id)
        windowStr = windowStr.replace("%%name%%", name)
        document.querySelector("#stuff").insertAdjacentHTML('beforeend', windowStr);
        document.querySelector(".window_" + id).contextscript = (event) => {
            if (SystemHtml.WindowHandler.getWindowById(event.getAttribute("windowId")).size.fullMax) {
                r["size normal"] = (clickEvent) => {
                    SystemHtml.WindowHandler.getWindowById(clickEvent.target.getAttribute("windowId")).size.notMax();
                    console.log(clickEvent)
                }
            }
            return r;
        }
        document.querySelector(".window_" + id).querySelector(".title-bar").contextscript = (event) => {
            return {
                "close": (clickEvent) => {
                    SystemHtml.WindowHandler.getWindowById(clickEvent.target.parentNode.parentNode.getAttribute("windowId")).makeClose()
                    console.log(clickEvent)
                },
                "minimize": (clickEvent) => {
                    SystemHtml.WindowHandler.getWindowById(clickEvent.target.parentNode.parentNode.getAttribute("windowId")).appearence.minimize();
                    console.log(clickEvent)
                },
                "maximize": (clickEvent) => {
                    SystemHtml.WindowHandler.getWindowById(clickEvent.target.parentNode.parentNode.getAttribute("windowId")).size.setMax()
                    console.log(clickEvent)
                },
                "fullmax": (clickEvent) => {
                    SystemHtml.WindowHandler.getWindowById(clickEvent.target.parentNode.parentNode.getAttribute("windowId")).size.setfullMax()
                    console.log(clickEvent)
                }
            }
        }


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
    /**
     * sets the Dom of the Window and parses it
     * @param {string} htmlstr 
     */
    async setContent(htmlstr) {
        var html = this.getHtml();
        var cont = html.querySelector(".content")
        cont.innerHTML = htmlstr;
        await this.parseNewHtml();
    }

    /**
     * get the title of this window
     * @returns {string} title of this window
     */
    getTitle() {
        return this.getHtml().querySelector(".window-name").innerText;
    }

    /**
     * returns this element
     * @param {string} tag only alphanumeric string
     * @returns {Promise<HTMLElement>}
     */
    async getHtmlElement(tag) {
        return this.getHtml().querySelector('*[windowElement="' + tag + '"]')
    }
    /**
     * returns this element
     * @param {string} tag only alphanumeric string
     * @returns {Promise<NodeListOf<HTMLElement>>}
     */
    async getHtmlElements(tag) {
        return this.getHtml().querySelectorAll('*[windowElement="' + tag + '"]')
    }

    /**
     * 
     * @param {string} event Html element Event (e.g. onclick) 
     * @param {string} htmlElementTag Html Element "element" tag ('<div element="tagofdoom"></div>': 'tagofdoom') 
     * @param {(variable, id, ?, event)} callback run when the event is triggered
     * @param {ThisType} t the class to run the callback function in
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
    /**
     * removes **ALL** event listeners on *this* window
     */
    async removeAllEventListeners() {
        SystemHtml.removeAllEvents(this.#id);
    }
    /**
     * needs to be called, *before* adding an event to an Element added *not* by {@link setContent}
     */
    async parseNewHtml() {
        var e = this.getHtml().querySelectorAll("*[element]")
        for (var x of e) {
            //only searchable the first time
            x.setAttribute("windowElement", x.getAttribute("element"));
            x.removeAttribute("element");

            x.setAttribute("windowId", this.#id);
        }

        var e = this.getHtml().querySelectorAll("iframe:not([iframeChanged])");
        for (var x of e) {
            x.onload = () => {
                var id = System.makeid(10);
                SystemHtml.WindowHandler.iframeConnections[id] = x;
                x.contentWindow.postMessage(JSON.stringify({ "type": "newConnection", "src": e.src, "id": id, "origin": location.origin }), x.src);
            }
            x.setAttribute("iframeChanged", "true");
        }
    }
    /**
     * sets the z-index to id ≙ layer
     * @param {number} id 
     */
    async setLayer(id) {
        (await this.getHtml()).style.zIndex = id;
    }
}

class presets {
    constructor() {
    }
    /**
     * @param {string} title Title
     * @returns {Promise<string> | undefined} selected File / undefined
     */
    async createFileSelect(title) {
        var f = new fileSelectPreset()
        if (title == undefined) {
            title = "Select"
        }
        return await f.load(title);
    }
    /**
     * @param {string} title Title
     * @returns {Promise<string> | undefined} selected File / undefined
     */
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
    async createInformation(title, text) {
        if (title == undefined) { title = "Information" }
        if (text == undefined) { text = "Information" }
        var f = new informationPreset()
        return await f.load(title, text);
    }
    async createFastConfirm(textYes, textNo) {
        return new Promise((resolve, reject) => {
            var b = {}
            b[textYes] = [() => { resolve(true); }, undefined];
            b[textNo] = [() => { resolve(false); }, undefined];
            SystemHtml.ContextMenu.showContext(b, [System.eventHandler.mouse.x - 10, System.eventHandler.mouse.y - 10]);

        });
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

            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
    async create() {
        await this.window.removeAllEventListeners();
        //add event listeners
        await this.window.addHtmlEventListener("click", "back", this.back, this)
        await this.window.addHtmlEventListener("onclick", "cancel", () => {
            //read data
            this.returnFunction(undefined)

            //close and return
            this.window.remove()
        }, this);



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

            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
    async create() {
        await this.window.removeAllEventListeners();
        //add event listeners
        await this.window.addHtmlEventListener("onclick", "cancel", () => {
            //read data
            this.returnFunction(undefined)

            //close and return
            this.window.remove()
        }, this);
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
        /**
         * @type {HtmlWindow}
         */
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
    /**
     * sets the percentage of the window
     * @param {number} proc percentage to set
     */
    async setNum(proc) {
        var p = await this.window.getHtmlElement("p");
        p.innerText = proc + "%"
    }
    /**
     * sets the text of the window
     * @param {string} text text to set
     */
    async setText(text) {
        (await this.window.getHtmlElement("text")).innerText = text;
    }
    /**
     * close window
     */
    stop() {
        this.window.remove();
    }
}
class informationPreset {
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
                await this.window.setContent('<p element="text"></p><button element="ok">Ok</button>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.setSize(400, 200);
                await this.window.size.userCanResize(true);

                //add event listeners
                var r = (await this.window.getHtmlElement("text"))
                r.contextscript = (target) => {
                    return {
                        "copy": async (event) => {
                            await navigator.clipboard.writeText(event.target.innerText);
                        }
                    }
                }

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

var SystemHtml = new Html();//for "tsc" ///--remove--
SystemHtml = new Html();