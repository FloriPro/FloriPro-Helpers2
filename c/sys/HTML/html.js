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
                    console.log(event)
                    var val = ""
                    if (event.srcElement.className == "StartMenuSelector") {
                        val = event.composedPath()[0].attributes['key'].value;
                    } else {
                        val = event.composedPath()[1].attributes['key'].value;
                    }
                    console.log(val);
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
        }, [this])
    }
    async removeWindow(id) {
        remove(this.usedWindowId, id);
    }
    async createWindow(name) {
        var id = this.getFreeId();
        this.usedWindowId.push(id);
        var w = new Window(id, name);
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
    
    constructor(id, name) {
        this.#id = id;
        this.load(id, name)
        this.close = () => {
            console.log("close action not defined!");
            return true;
        }
    }
    async load(id, name) {
        var windowStr = await SystemFileSystem.getFileString("c/sys/HTML/window.html");

        windowStr = windowStr.replace("%%id%%", "" + id)
        windowStr = windowStr.replace("%%name%%", name)
        document.querySelector("#stuff").insertAdjacentHTML('beforeend', windowStr);

        System.eventHandler.addEventHandler("mousedown", (event, args) => {
            if (event.srcElement.classList.contains("window")) {
                console.log("resize")
            }
            if (event.srcElement.classList.contains("title-bar")) {
                SystemHtml.WindowHandler.moving = true;
                SystemHtml.WindowHandler.movingWindowId = args[0];
            }
            if (event.srcElement.classList.contains("close")) {
                console.log("close")
            }
        }, [id])
        System.eventHandler.addEventHandler("mouseup", (event) => {
            if (SystemHtml.WindowHandler.moving == true) {
                SystemHtml.WindowHandler.moving = false
            }
        })
    }
    async addHtmlEventListener(type, handler) {
        console.warn("todo: window HtmlEventListener");
    }
    getHtml() {
        return document.querySelector(".window_" + this.#id);
    }
    setContent(html) {
        console.warn("window.setContent TODO");
    }
}


SystemHtml = new Html();