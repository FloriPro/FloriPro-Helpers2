class Html {
    constructor() {
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
                if (event.srcElement != _StartMenu) {
                    var val = ""
                    if (event.srcElement.className == "StartMenuSelector") {
                        val = event.composedPath()[0].attributes['key'].value;
                    } else {
                        val = event.composedPath()[1].attributes['key'].value;
                    }
                    System.run(val)
                }
                return true;
            }
        }, [_StartMenuButton, _StartMenu, _taskbar]);

        this.WindowHandler = new WindowHandler();

        function startMenuButton_Toggle() {
            console.log("toggle")
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
}

class WindowHandler {
    constructor() {
        this.moving = false;
        this.usedWindowId = [];
        this.windows = {}


        System.eventHandler.addEventHandler("mousemove", (event, a) => {
            if (SystemHtml.WindowHandler.moving == true) {
                var element = a[0].getWindowById(this.movingWindowId).getHtml()
                element.style.top = parseInt(element.style.top) + event.movementY + 'px';
                element.style.left = parseInt(element.style.left) + event.movementX + 'px';
            }
            else if (SystemHtml.WindowHandler.resize == true) {
                var element = a[0].getWindowById(this.movingWindowId).addWindowSize(event.movementX, event.movementY);
            }
        }, [this])
    }
    async removeWindow(id) {
        this.windows[id].getHtml().remove();
        this.windows[id] = undefined;
        remove(this.usedWindowId, id);
    }
    async createWindow(name, readyCallback) {
        var id = this.getFreeId();
        this.usedWindowId.push(id);
        var w = new Window(id);
        w.onReady = readyCallback
        w.load(id, name);
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
    #id

    constructor(id) {
        this.sizeX = 200;
        this.sizeY = 100;
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
     * sets the x/y size of the window, if defined
     * @param {number | undefined} x 
     * @param {number | undefined} y 
     */
    async setSize(x, y) {
        this.sizeX = x;
        this.sizeY = y;
        this.getHtml().style.width = this.sizeX + "px";
        this.getHtml().style.height = this.sizeY + "px";
    }
    async htmlSizing() {
        this.sizeX = null;
        this.sizeY = null;
        this.getHtml().style.width = "fit-content";
        this.getHtml().style.height = "fit-content";
    }
    userCanResize(yn) {
        this.canUserResize = yn;
    }

    async rename() { //TODO
        console.log("rename todo");
    }
    async load(id, name) {
        var windowStr = await SystemFileSystem.getFileString("c/sys/HTML/window.html");

        windowStr = windowStr.replace("%%id%%", "" + id)
        windowStr = windowStr.replace("%%name%%", name)
        document.querySelector("#stuff").insertAdjacentHTML('beforeend', windowStr);

        System.eventHandler.addEventHandler("mousedown", (event, args) => {
            //if this window
            if (SystemHtml.elementArrayContainsClass(event.composedPath(), "window_" + args[0])) {
                if (SystemHtml.WindowHandler.getWindowById(args[0]).canUserResize && event.srcElement.classList.contains("window") && SystemHtml.WindowHandler.moving == false) {
                    console.log("resize")
                    SystemHtml.WindowHandler.resize = true;
                    SystemHtml.WindowHandler.resizeWindowId = args[0];
                }
                else if (event.srcElement.classList.contains("title-bar") || SystemHtml.elementArrayContainsClass(event.composedPath(), "title-bar-text")) {
                    SystemHtml.WindowHandler.moving = true;
                    SystemHtml.WindowHandler.movingWindowId = args[0];
                }
                if (event.srcElement.classList.contains("close")) {
                    if (SystemHtml.WindowHandler.getWindowById(args[0]).close()) {
                        console.log("remove window")
                        SystemHtml.WindowHandler.removeWindow(args[0])
                    }
                }
            }
        }, [id])
        System.eventHandler.addEventHandler("mouseup", (event) => {
            if (SystemHtml.WindowHandler.moving == true) {
                SystemHtml.WindowHandler.moving = false
            } if (SystemHtml.WindowHandler.resize == true) {
                SystemHtml.WindowHandler.resize = false
            }
        })


        this.setSize(this.sizeX, this.sizeY);
        setTimeout(this.onReady, 1);
    }

    /**
     * Only used by the programm for resizing
     * @param {number} sizeX 
     * @param {number} sizeY 
     */
    addWindowSize(sizeX, sizeY) {
        this.sizeX += sizeX;
        this.sizeY += sizeY;
        if (sizeX != "automatic") {
            this.getHtml().style.width = this.sizeX + "px";
            this.getHtml().style.height = this.sizeY + "px";
        }
        this.onResize();
    }

    async addHtmlEventListener(type, handler) {
        console.warn("todo: window HtmlEventListener");
    }
    getHtml() {
        return document.querySelector(".window_" + this.#id);
    }
    async setContent(htmlstr) {
        var html = this.getHtml();
        var cont = html.querySelector(".content")
        cont.innerHTML = htmlstr;


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
}


SystemHtml = new Html();