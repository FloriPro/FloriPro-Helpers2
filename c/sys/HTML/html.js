class Html {
    constructor() {
        this.htmlEventList = {}
        this.htmlEventListThis = {}
        this.loadSystem();
    }
    async loadSystem() {
        console.log("initializing HTML");
        var body = await SystemFileSystem.getFileString("c/sys/HTML/body.html")

        //check if new or old style
        if ((await System.options.get("settings"))["newStyle"] != undefined && (await System.options.get("settings"))["newStyle"][0] != false) {
            this.newStyle = true;
            var style = await SystemFileSystem.getFileString("c/sys/HTML/style.css")
        } else {
            this.newStyle = false;
            var style = await SystemFileSystem.getFileString("c/sys/HTML/styleOld.css")
        }

        //load body
        document.body.innerHTML = body;

        var _StartMenuButton = document.querySelector("#startMenuButton")
        var _StartMenu = document.querySelector("#StartMenu");
        var _StartMenuPrograms = document.querySelector("#StartMenuPrograms");
        var _StartMenuFastButtons = document.querySelector("#startMenuFastButtons");
        var _taskbar = document.querySelector("#taskbar");

        //disable zoom
        var meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
        document.head.appendChild(meta);

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

            if (!event.composedPath().includes(_StartMenu) && !event.composedPath().includes(_StartMenuButton) && _StartMenu.style.display == "") {
                startMenuButton_Toggle();
            }
            else if (event.target == _StartMenuButton.querySelector("span")) {
                startMenuButton_Toggle();
                return true;
            }

            if (this.elementArrayContainsClass(event.composedPath(), "taskbar-programList")) {
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
            if (event.composedPath().includes(document.querySelector("#minimizeAllWindows"))) {
                for (var x of Object.keys(this.WindowHandler.windows)) {
                    this.WindowHandler.windows[x].appearence.minimize();
                }
                this.WindowHandler.updateTaskBar();
            }
        }, [_StartMenuButton, _StartMenu]);

        this.WindowHandler = new WindowHandler();
        await this.WindowHandler.init();
        this.ContextMenu = new ContextMenu();

        async function startMenuButton_Toggle() {
            if (_StartMenu.style.display != "") {
                _StartMenu.style.display = "";
                await delay(1);
                _StartMenu.style.opacity = "1";
                _StartMenu.style.height = "";
                await delay(400);
            } else {
                _StartMenu.style.height = "0px";
                _StartMenu.style.opacity = "0";
                await delay(400);
                _StartMenu.style.display = "none";
            }
        }

        //background image
        System.settings.addSettingsUpdater("backgroundImage", () => {
            backgroundImgLoader();
        });
        async function backgroundImgLoader() {
            document.querySelector("#all").style.background = 'url("' + SystemFileSystem.toImg(await SystemFileSystem.getFileString((await System.options.get("settings"))["backgroundImage"][0])) + '") center center / cover no-repeat';
        }
        backgroundImgLoader();

        //other imgs
        //document.querySelector("#startMenuButton").style.padding = "0";
        document.querySelector("#startMenuButton").querySelector("span").style.background = 'url("' + SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/sys/imgs/gray.webp")) + '") center center / cover no-repeat';
        document.querySelector("#startMenuButton").querySelector("span").innerHTML = "";
        //document.querySelector("#startMenuButton").querySelector("span").style.height = "35px";
        //document.querySelector("#startMenuButton").querySelector("span").style.width = "35px";

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

        var observer = new MutationObserver(function (mutations) {
            var i = document.querySelectorAll("*[imgsrc]");
            for (var x of i) {
                var imgsrc = x.getAttribute("imgsrc");
                x.removeAttribute("imgsrc");

                //run it async so it doesn't block the rest of the code
                (async (x, imgsrc) => {
                    if (await SystemFileSystem.fileExists(imgsrc)) {
                        var fileType = "png";
                        if (imgsrc.endsWith(".svg")) {
                            fileType = "svg+xml";
                        }
                        x.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString(imgsrc), fileType);
                    } else {
                        x.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/sys/imgs/noIco.webp"));
                    }
                })(x, imgsrc);
            }
        });

        observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });

        //Desktop
        this.desktop = new Desktop();

        //Small Notifications in the bottom right corner
        if (this.newStyle) {
            this.notifications = new SmallNotifications();
        } else {
            this.notifications = new notificationsBackwardsCompatability();
        }
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
        if (event.type == "click" && System.eventHandler.longClick == true && System.eventHandler.onmobile) {
            if (Date.now() - System.eventHandler.mouseDownTime > 500) {
                return;
            }
        }
        SystemHtml.htmlEventParser(event)
    }
    /**
     * 
     * @param {Event} event 
     */
    htmlEventParser(event) {
        //var id = event.target.getAttribute("windowid")
        var id = null;
        for (var element of event.composedPath()) {
            if (element != undefined && element != document && element != window) {
                if (element.getAttribute("windowid") != null) {
                    id = element.getAttribute("windowid");
                    break;
                }
            }
        }

        //check if window is focused
        if (this.WindowHandler.focusedWindow != parseInt(id)) {
            //this.WindowHandler.focus(id);
            return;
        }

        //var element = event.target.getAttribute("windowelement");
        for (var element of event.composedPath()) {
            if (element != undefined && element != document && element != window) {
                if (element.getAttribute("windowelement") != null) {
                    element = element.getAttribute("windowelement")
                    var name = element + "__" + id;
                    if (Object.keys(this.htmlEventList).includes(name)) {

                        var eventType = event.type;
                        eventType = eventType.replace("on", "");

                        if (this.htmlEventList[name][eventType] == undefined) {
                            continue;
                        }
                        for (var element of this.htmlEventList[name][eventType]) {
                            if (this.htmlEventListThis[name] == undefined) {
                                element[0](element, id, element[1], event);
                            } else {
                                this.htmlEventListThis[name].x = element[0];
                                this.htmlEventListThis[name].x(element, id, element[1], event);
                            }
                        }
                    }
                }
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
            var hrnum = 0;
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
                    if (Object.keys(dat).length > 0) {
                        eventButtons["hr" + hrnum] = ["hr", null];
                        hrnum++;
                    }
                }
            }
            if (Object.keys(eventButtons).length > 0) {
                delete eventButtons["hr" + (hrnum - 1)];
            }

            this.showContext(eventButtons, [event.clientX, event.clientY]);
        }, []);
    }

    showContext(eventButtons, position) {
        console.log(eventButtons)
        //close all contextmenus
        for (var x of document.querySelectorAll(".contextmenu")) {
            x.remove();
        }

        if (Object.keys(eventButtons).length == 0) {
            var div = document.createElement("div");
            div.className = "contextmenu"
            div.style.top = (position[1] - 10) + "px";
            div.style.left = (position[0] - 10) + "px";

            div.style.width = "20px";
            div.style.height = "20px";
            div.style.backgroundColor = "#ffb3b3ba";
            div.style.borderRadius = "0%";
            div.style.border = "1px solid rgba(0,0,0,1)";

            div.style.transform = "scale(0)";
            div.style.transition = "transform 100ms ease-in-out";

            setTimeout(() => {
                div.style.transform = "scale(1)";
            }, 10);
            setTimeout(() => {
                div.style.transform = "scale(0)";
            }, 100);

            setTimeout(() => {
                div.remove();
            }, 200);

            document.body.appendChild(div);
            return;
        }

        var div = document.createElement("div");
        div.className = "contextmenu"
        div.style.top = position[1] + "px";
        div.style.left = position[0] + "px";

        for (var x of Object.keys(eventButtons)) {
            if (eventButtons[x][0] == "hr") {
                var hr = document.createElement("hr");
                div.appendChild(hr);
                continue;
            }
            div.appendChild(this.createContextButton(x, eventButtons[x]));
        }

        document.body.appendChild(div);

        if (div.offsetHeight + parseInt(div.style.top) > window.innerHeight) {
            div.style.top = window.innerHeight - div.offsetHeight - 1 + "px";
        }
        if (div.offsetWidth + parseInt(div.style.left) > window.innerWidth) {
            div.style.left = window.innerWidth - div.offsetWidth + "px";
        }

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
    /**
     * 
     * @param {{[name:string]:()=>{}[]}} dat 
     */
    async specific(dat) {
        await delay(10);
        var u = {}
        for (var x of Object.keys(dat)) {
            u[x] = [dat[x][0], dat[x][1]];
        }
        this.showContext(u, [System.eventHandler.mouse.x, System.eventHandler.mouse.y]);
    }
}

class WindowHandler {
    async init() {
        this.iframeConnections = {};

        this.windowsCreated = 1;

        this.resize = false;
        this.resizeWindowId = -1;
        this.resizePosition = "";

        this.moving = false;
        this.movingFullscreen = false;

        this.usedWindowId = [];
        /** @type {{[id: number]: HtmlWindow}} */
        this.windows = {};

        this.windowLayering = [];

        /**
         * @type {presets}
         */
        this.presets = new (await System.run("c/sys/HTML/presets.js"))();

        this.resizeAnimator = new resizeAnimator();

        System.eventHandler.addEventHandler("mousemove", async (event, a) => {
            if (SystemHtml.WindowHandler.moving == true) {
                /**
                 * @type {HtmlWindow}
                 */
                var wind = a[0].getWindowById(this.movingWindowId);
                if (SystemHtml.WindowHandler.movingFullscreen == false) {
                    var element = wind.getHtml();

                    var y = parseInt(element.style.top) + event.movementY;
                    var x = parseInt(element.style.left) + event.movementX;
                    wind.setPosition(x, y);
                }

                if (event.shiftKey == true) {
                    await this.windowShiftKeyOverlay(wind, event, true);
                } else {
                    this.windowShiftKeyOverlay(wind, event, false);
                }
            }
            else if (SystemHtml.WindowHandler.resize == true) {
                /**
                 * @type {HtmlWindow}
                 */
                var window = a[0].getWindowById(this.resizeWindowId);
                var rp = SystemHtml.WindowHandler.resizePosition;
                switch (rp) {
                    case "top":
                        //window.setSize(window.width, window.height - event.movementY);
                        window.addWindowSize(0, -event.movementY);
                        window.addPosition(0, event.movementY);
                        //window.setPosition(window.x, window.y + event.movementY);
                        break;
                    case "bottom":
                        //window.setSize(window.width, window.height + event.movementY);
                        window.addWindowSize(0, event.movementY);
                        break;
                    case "left":
                        //window.setSize(window.width - event.movementX, window.height);
                        //window.setPosition(window.x + event.movementX, window.y);
                        window.addWindowSize(-event.movementX, 0);
                        window.addPosition(event.movementX, 0);
                        break;
                    case "right":
                        //window.setSize(window.width + event.movementX, window.height);
                        window.addWindowSize(event.movementX, 0);
                        break;
                    case "topleft":
                        //window.setSize(window.width - event.movementX, window.height - event.movementY);
                        //window.setPosition(window.x + event.movementX, window.y + event.movementY);
                        window.addWindowSize(-event.movementX, -event.movementY);
                        window.addPosition(event.movementX, event.movementY);
                        break;
                    case "topright":
                        //window.setSize(window.width + event.movementX, window.height - event.movementY);
                        //window.setPosition(window.x, window.y + event.movementY);
                        window.addWindowSize(event.movementX, -event.movementY);
                        window.addPosition(0, event.movementY);
                        break;
                    case "bottomleft":
                        //window.setSize(window.width - event.movementX, window.height + event.movementY);
                        //window.setPosition(window.x + event.movementX, window.y);
                        window.addWindowSize(-event.movementX, event.movementY);
                        window.addPosition(event.movementX, 0);
                        break;
                    case "bottomright":
                        //window.setSize(window.width + event.movementX, window.height + event.movementY);
                        window.addWindowSize(event.movementX, event.movementY);
                        break;
                }

                //window.addWindowSize(event.movementX, event.movementY);
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

                if (!SystemHtml.WindowHandler.getWindowById(id)) { return }
                //resize
                var distanceFromBorder = SystemHtml.WindowHandler.getWindowById(id).getDistanceFromBorder(event.clientX, event.clientY);
                if (SystemHtml.WindowHandler.getWindowById(id).canUserResize && SystemHtml.WindowHandler.moving == false && ((event.target.classList.contains("window") && distanceFromBorder < 8) || distanceFromBorder < 3)) { // event.target.classList.contains("window")
                    SystemHtml.WindowHandler.putWindowOnTop(id);
                    SystemHtml.WindowHandler.resize = true;
                    SystemHtml.WindowHandler.resizeWindowId = id;

                    //top, bottom, left, right, topleft, topright, bottomleft, bottomright
                    //SystemHtml.WindowHandler.resizePosition;
                    var [wx, wy] = SystemHtml.WindowHandler.getWindowById(id).getPosition();
                    var [ww, wh] = SystemHtml.WindowHandler.getWindowById(id).size.getSize();
                    var [mx, my] = [event.clientX, event.clientY];
                    var [rx, ry] = [mx - wx, my - wy];

                    SystemHtml.WindowHandler.resizePosition = "";
                    var p = []
                    if (ry < 10) {
                        SystemHtml.WindowHandler.resizePosition += "top";
                        p.push("top");
                    } else if (ry > wh - 10) {
                        SystemHtml.WindowHandler.resizePosition += "bottom";
                        p.push("bottom");
                    }
                    if (rx < 10) {
                        SystemHtml.WindowHandler.resizePosition += "left";
                        p.push("left");
                    } else if (rx > ww - 10) {
                        SystemHtml.WindowHandler.resizePosition += "right";
                        p.push("right");
                    }
                    if (SystemHtml.WindowHandler.resizePosition == "") {
                        SystemHtml.WindowHandler.resizePosition = "center";
                    }

                    SystemHtml.WindowHandler.resizeAnimator.add(id, event.clientX, event.clientY, SystemHtml.WindowHandler.resizePosition, p);

                    //iframs not clickable
                    this.iframeNoClick()
                }
                //move
                else if (event.target.classList.contains("title-bar") || SystemHtml.elementArrayContainsClass(event.composedPath(), "title-bar-left")) {
                    SystemHtml.WindowHandler.putWindowOnTop(id);
                    SystemHtml.WindowHandler.moving = true;

                    SystemHtml.WindowHandler.movingFullscreen = SystemHtml.WindowHandler.getWindowById(id).size.max

                    SystemHtml.WindowHandler.movingWindowId = id;

                    //iframs not clickable
                    this.iframeNoClick()
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

                if (event.shiftKey == true) {
                    this.setWindowShiftKey(currentwindow, event, x, y)
                } else {
                    var [x, y] = SystemHtml.WindowHandler.checkupWindowPosition(currentwindow, x, y);
                    currentwindow.setPosition(x, y);
                }
                document.querySelector("#moveWindowOverlay").style.display = "none";

                SystemHtml.WindowHandler.moving = false;
                SystemHtml.WindowHandler.movingFullscreen = false;

                //reactivate iframes
                var ifr = document.querySelectorAll("iframe");
                for (var iframe of ifr) {
                    if (iframe.getAttribute("noEV") == "true") {
                        iframe.style.pointerEvents = "";
                        iframe.removeAttribute("noEV");
                    }
                }
            } if (SystemHtml.WindowHandler.resize == true) {
                SystemHtml.WindowHandler.resize = false;

                var currentwindow = a[0].getWindowById(this.resizeWindowId);
                var element = currentwindow.getHtml();
                var [x, y] = currentwindow.getPosition();
                var [x, y] = SystemHtml.WindowHandler.checkupWindowPosition(currentwindow, x, y);
                currentwindow.setPosition(x, y);

                var ifr = document.querySelectorAll("iframe");
                for (var iframe of ifr) {
                    if (iframe.getAttribute("noEV") == "true") {
                        iframe.style.pointerEvents = "";
                        iframe.removeAttribute("noEV");
                    }
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
            for (var id of Object.keys(SystemHtml.WindowHandler.windows)) {
                if (SystemHtml.WindowHandler.windows[id] != undefined && SystemHtml.WindowHandler.windows[id].size.max == true) {
                    SystemHtml.WindowHandler.windows[id].size.updateMax();
                    setTimeout(SystemHtml.WindowHandler.windows[id].size.updateMax.bind(SystemHtml.WindowHandler.windows[id].size), 200);
                    setTimeout(SystemHtml.WindowHandler.windows[id].size.updateMax.bind(SystemHtml.WindowHandler.windows[id].size), 1000);
                }
            }
        });
        System.eventHandler.addEventHandler("keydown", (event, args) => {
            //alt + Enter
            if (event.altKey && event.key == "Enter") {
                var k = Object.keys(this.windowLayering)

                if (k.length == 1) {
                    this.focus(k[0]);
                    return;
                }

                if (k.length <= 1) {
                    return;
                }

                var id = this.windowLayering[k[k.length - 2]];
                if (this.windows[id] == undefined) {
                    return;
                }

                this.focus(id);

                event.preventDefault();
                return true;
            }
        });

        window.addEventListener('message', async function (e) {
            if (isJson(e.data)) {
                var data = JSON.parse(e.data);
                if (data["id"] != undefined) {
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
                }
            }
        });
    }

    checkupWindowPosition(currentwindow, x, y) {
        if (x < +175 - currentwindow.size.getSize()[0]) { x = +175 - currentwindow.size.getSize()[0]; }
        if (y < -10) { y = -10; }

        if (x > window.innerWidth - 150) { x = window.innerWidth - 150 };
        if (y > window.innerHeight - 40 - 35) { y = window.innerHeight - 40 - 35 };

        return [x, y];
    }

    /**
     * 
     * @param {HtmlWindow} wind 
     * @param {*} event 
     * @param {*} show 
     * @returns 
     */
    async windowShiftKeyOverlay(wind, event, show) {
        function setPosition(x, y) {
            el.style.left = (x + 12) + "px";
            el.style.top = (y + 12) + "px";
        }
        function setSize(w, h) {
            el.style.width = (w - 24) + "px";
            el.style.height = (h - 24) + "px";
        }

        var el = document.querySelector("#moveWindowOverlay");
        if (show == false) {
            if (el.style.display != "none") {
                el.style.display = "none";
                el.style.transition = "none";
            }
            return
        }

        if (el.style.display != "block") {
            el.style.display = "block";
            el.style.opacity = "0";
            if (wind.size.max) {
                setPosition(-12, -12);
                setSize(window.innerWidth, window.innerHeight - 35);
            } else {
                setPosition(wind.getPosition()[0], wind.getPosition()[1])
                setSize(wind.size.getSize()[0], wind.size.getSize()[1])
            }

            await new Promise(resolve => {
                setTimeout(() => {
                    el.style.transition = "0.5s";
                    el.style.opacity = "1";
                }, 10);
            });
        }

        var taskbarbottomsize = 35;
        if (SystemHtml.newStyle) {
            taskbarbottomsize = 93;
        }
        var taskbarbottomsizehalf = taskbarbottomsize / 2;

        if (event.pageY < window.innerHeight * 0.6 && event.pageY > window.innerHeight * 0.4 && event.pageX < window.innerWidth * 0.6 && event.pageX > window.innerWidth * 0.4) {
            setPosition(-12, -12);
            setSize(window.innerWidth + 24, window.innerHeight - taskbarbottomsize + 24);
            return;
        }

        //left
        if (event.pageX < window.innerWidth * 0.5) {
            //top
            if (event.pageY < window.innerHeight * 0.4) {
                setPosition(0, 0);
                setSize(window.innerWidth * 0.5, (window.innerHeight * 0.5) - taskbarbottomsizehalf);
            }
            //middle
            else if (event.pageY < window.innerHeight * 0.6) {
                setPosition(0, 0);
                setSize(window.innerWidth * 0.5, window.innerHeight - taskbarbottomsize);
            }
            //bottom
            else {
                setPosition(0, window.innerHeight * 0.5 - taskbarbottomsizehalf);
                setSize(window.innerWidth * 0.5, (window.innerHeight * 0.5) - taskbarbottomsizehalf);
            }
        }

        //right
        else {
            //top
            if (event.pageY < window.innerHeight * 0.4) {
                setPosition(window.innerWidth * 0.5, 0);
                setSize(window.innerWidth * 0.5, (window.innerHeight * 0.5) - taskbarbottomsizehalf);
            }
            //middle
            else if (event.pageY < window.innerHeight * 0.6) {
                setPosition(window.innerWidth * 0.5, 0);
                setSize(window.innerWidth * 0.5, window.innerHeight - taskbarbottomsize);
            }
            //bottom
            else {
                setPosition(window.innerWidth * 0.5, window.innerHeight * 0.5 - taskbarbottomsizehalf);
                setSize(window.innerWidth * 0.5, (window.innerHeight * 0.5) - taskbarbottomsizehalf);
            }
        }
    }

    /**
     * 
     * @param {HtmlWindow} wind 
     * @param {*} event 
     * @param {*} x 
     * @param {*} y 
     */
    setWindowShiftKey(wind, event, x, y) {
        //middle
        if (event.pageY < window.innerHeight * 0.6 && event.pageY > window.innerHeight * 0.4 && event.pageX < window.innerWidth * 0.6 && event.pageX > window.innerWidth * 0.4) {
            wind.size.setMax();
        } else {
            wind.size.notMax();
        }

        var taskbarbottomsize = 35;
        if (SystemHtml.newStyle) {
            taskbarbottomsize = 93;
        }
        var taskbarbottomsizehalf = taskbarbottomsize / 2;

        //left
        if (event.pageX < window.innerWidth * 0.5) {
            //top
            if (event.pageY < window.innerHeight * 0.4) {
                wind.setPosition(0, 0);
                wind.size.setSize(window.innerWidth * 0.5, (window.innerHeight * 0.5) - taskbarbottomsizehalf);
            }
            //middle
            else if (event.pageY < window.innerHeight * 0.6) {
                wind.setPosition(0, 0);
                wind.size.setSize(window.innerWidth * 0.5, window.innerHeight - taskbarbottomsize);
            }
            //bottom
            else {
                wind.setPosition(0, window.innerHeight * 0.5 - taskbarbottomsizehalf);
                wind.size.setSize(window.innerWidth * 0.5, (window.innerHeight * 0.5) - taskbarbottomsizehalf);
            }
        }

        //right
        else {
            //top
            if (event.pageY < window.innerHeight * 0.4) {
                wind.setPosition(window.innerWidth * 0.5, 0);
                wind.size.setSize(window.innerWidth * 0.5, (window.innerHeight * 0.5) - taskbarbottomsizehalf);
            }
            //middle
            else if (event.pageY < window.innerHeight * 0.6) {
                wind.setPosition(window.innerWidth * 0.5, 0);
                wind.size.setSize(window.innerWidth * 0.5, window.innerHeight - taskbarbottomsize);
            }
            //bottom
            else {
                wind.setPosition(window.innerWidth * 0.5, window.innerHeight * 0.5 - taskbarbottomsizehalf);
                wind.size.setSize(window.innerWidth * 0.5, (window.innerHeight * 0.5) - taskbarbottomsizehalf);
            }
        }
    }

    iframeNoClick() {
        var ifr = document.querySelectorAll("iframe");
        for (var iframe of ifr) {
            if (iframe.style.pointerEvents != "none") {
                iframe.style.pointerEvents = "none";
                iframe.setAttribute("noEV", "true");
            }
        }
    }
    removeWindow(id) {
        SystemHtml.removeAllEvents(id);

        var h = this.windows[id].getHtml()
        h.className = "window _remove";
        h.style.transition = "250ms";
        h.style.MozTransform = 'scale(0.75)';
        h.style.WebkitTransform = 'scale(0.75)';
        h.style.opacity = "0";
        setTimeout(() => {
            h.remove();
        }, 250);
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
        /**
         * @type {HtmlWindow}
         */
        var w = new (await System.run("c/sys/HTML/HtmlWindow.js"))(id);
        w.onReady = readyCallback

        var c = new class {
            constructor() {
            }
        }();
        var finishPromise = new Promise((resolve, reject) => {
            c.resolve = resolve;
        });
        await w.load(id, name, finishPromise);
        c.resolve();
        this.windowsCreated++;
        if (20 * this.windowsCreated >= (window.innerWidth - 50) / 10 || 20 * this.windowsCreated >= (window.innerHeight - 50) / 10) {
            this.windowsCreated = 1;
        }
        w.setPosition(20 * this.windowsCreated, 20 * this.windowsCreated);
        w.getHtml().offsetHeight;

        this.windows[id] = w;
        SystemHtml.WindowHandler.focus(id).then(() => {
            this.updateWindowLayering();
        });
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
                } else {
                    win.ontop = false;
                }
                i++;
            }
        }

        if (this.focusedWindow != undefined && this.getWindowById(this.focusedWindow) != undefined) {
            if (this.getWindowById(this.focusedWindow).size.fullMax && this.getWindowById(this.focusedWindow).appearence.shown) {
                this.hideTaskbar();
            } else {
                this.showTaskbar();
            }
        }
        this.updateTaskBar();
    }
    async hideTaskbar() {
        //document.querySelector("#taskbar").style.height = "0";
        document.querySelector("#taskbar").style.bottom = "-70px";
        document.querySelector("#taskbar").style.opacity = "0";
        await delay(200)
        document.querySelector("#taskbar").style.display = "none";
    }
    async showTaskbar() {
        document.querySelector("#taskbar").style.display = "";
        await delay(10);
        //document.querySelector("#taskbar").style.height = "";
        document.querySelector("#taskbar").style.bottom = "";
        document.querySelector("#taskbar").style.opacity = "";
        await delay(200)
        document.querySelector("#taskbar").style.display = "";
    }

    updateTaskBar() {
        var programList = document.querySelector("#taskbar-programList");
        var realyNeeded = [];
        for (var x of Object.keys(this.windows)) {
            var div = programList.querySelector(".programListElement[windowid='" + this.windows[x].getId() + "']");
            if (div == null) {
                div = this.createTaskBarProgram(this.windows[x].getTitle(), this.windows[x].ontop, this.windows[x].getId(), this.windows[x]);
                programList.append(div);
                this.slowCreateTaskbar(div);
            } else {
                this.setTaskbarDivValues(this.windows[x].getTitle(), this.windows[x].ontop, this.windows[x].getId(), this.windows[x], div);
            }
            realyNeeded.push(div);
        }

        for (var x of document.querySelectorAll(".programListElement:not(.remove)")) {
            if (!realyNeeded.includes(x)) {
                this.slowRemoveTaskbar(x);
            }
        }
    }

    /**
     * 
     * @param {HTMLDivElement} element 
     */
    async slowRemoveTaskbar(element) {
        element.className = "programListElement remove"
        element.setAttribute("windowid", -1);

        element.querySelector("p").style.color = "transparent";
        element.style.maxWidth = "0";
        element.style.padding = "0";
        await delay(200);
        element.remove();
    }
    /**
     * 
     * @param {HTMLDivElement} element 
     */
    async slowCreateTaskbar(element) {
        await delay(1);
        element.style.maxWidth = "";
        element.style.padding = "";
    }

    /**
     * 
     * @param {string} name 
     * @param {boolean} ontop 
     * @param {number} id 
     * @param {HtmlWindow} window 
     * @returns 
     */
    createTaskBarProgram(name, ontop, id, window) {
        var programDiv = document.createElement("div");
        programDiv.style.maxWidth = "0";
        programDiv.style.padding = "0";
        programDiv.contextscript = () => {
            return {
                "close": (event) => {
                    SystemHtml.WindowHandler.getWindowById(event.target.getAttribute("windowid")).makeClose();
                },
                "minimize": (event) => {
                    SystemHtml.WindowHandler.getWindowById(event.target.getAttribute("windowid")).appearence.minimize();
                }
            }
        }
        var titleElement = document.createElement("p");
        programDiv.append(titleElement);

        var img = document.createElement("img");
        programDiv.append(img);


        this.setTaskbarDivValues(name, ontop, id, window, programDiv);
        return programDiv;
    }
    /**
     * 
     * @param {string} name 
     * @param {boolean} ontop 
     * @param {number} id
     * @param {HtmlWindow} window 
     * @param {HTMLDivElement} programDiv 
     */
    setTaskbarDivValues(name, ontop, id, window, programDiv) {
        programDiv.className = "programListElement";
        if (window.appearence.shown) {
            if (ontop) { programDiv.className += " selected" }
        } else {
            programDiv.className += " hidden"
        }
        programDiv.onclick = () => {
            if (SystemHtml.WindowHandler.getWindowById(id).ontop && SystemHtml.WindowHandler.getWindowById(id).appearence.shown) {
                SystemHtml.WindowHandler.getWindowById(id).appearence.minimize();
            }
            else {
                SystemHtml.WindowHandler.focus(id);
            }
        }

        var titleElement = programDiv.querySelector("p");
        titleElement.innerText = name;

        programDiv.setAttribute("windowid", id);
        programDiv.append(titleElement);

        //image
        var img = programDiv.querySelector("img");
        if (window.appearence.logo == null) {
            img.style.display = "none";
        } else {
            if (window.appearence.logoType == "file") {
                img.style.display = "";
                var al = async (img, path) => {
                    if (await SystemFileSystem.fileExists(path)) {
                        img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString(path));
                    } else {
                        img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/sys/imgs/noIco.webp"));
                    }
                }
                al(img, window.appearence.logo);
            }
            else if (window.appearence.logoType == "string") {
                img.style.display = "";
                img.src = window.appearence.logo;
            } else {
                img.style.display = "none";
            }
        }
    }
    async focus(id) {
        this.getWindowById(id).appearence.show();
        this.putWindowOnTop(id);
    }
}

class Desktop {
    constructor() {
        this.#init();
    }
    async #init() {
        await this.buildDesktop();

        this.grid = true;
        if ((await System.options.get("settings"))["alignDeskopIconsToGrid"] != undefined && (await System.options.get("settings"))["alignDeskopIconsToGrid"][0] == false) {
            this.grid = false;
        }
        System.settings.addSettingsUpdater("alignDeskopIconsToGrid", async () => {
            this.grid = (await System.options.get("settings"))["alignDeskopIconsToGrid"][0]
        });

        this.drag = -1;
        this.didMove = false;
        await this.#events();
    }

    async buildDesktop() {
        this.desktopIcons = (await System.options.get("desktop"))["all"];
        document.querySelector("#Desktop").innerHTML = "";

        var i = 0;
        for (var x of Object.keys(this.desktopIcons)) {
            var y = this.desktopIcons[x]
            var div = await this.#genDesktopIcon(y["name"], y["icon"], i);

            //position
            div.style.left = y["position"][0] + "px";
            div.style.top = y["position"][1] + "px";

            document.querySelector("#Desktop").appendChild(div);
            i++;
        }

    }

    async #events() {
        System.eventHandler.addEventHandler("mousedown", (event, thi) => {
            if (SystemHtml.elementArrayContainsClass(event.composedPath(), "DesktopIcon")) {
                //get the main DesktopIcon element
                var el = null;
                for (var x of event.composedPath()) {
                    if (x.classList.contains("DesktopIcon")) {
                        el = x;
                        break;
                    }
                }


                thi.drag = parseInt(el.getAttribute("iconId"));
            }
        }, this);

        System.eventHandler.addEventHandler("click", async (event, thi) => {
            if (SystemHtml.elementArrayContainsClass(event.composedPath(), "DesktopIcon")) {
                //get the main DesktopIcon element
                var el = null;
                for (var x of event.composedPath()) {
                    if (x.classList.contains("DesktopIcon")) {
                        el = x;
                        break;
                    }
                }
                if (!thi.didMove) {
                    var path = thi.desktopIcons[el.getAttribute("iconId")]["run"];
                    if (await SystemFileSystem.fileExists(path)) {
                        System.run(path);
                    } else {
                        if (!path.startsWith("c/programs/")) {
                            SystemHtml.WindowHandler.presets.createInformation("Error", "The file '" + path + "' does not exist!")
                            return
                        }
                        var name = path.split("/")[2];
                        if (!await SystemHtml.WindowHandler.presets.createConfirm("Error", "The program '" + name + "' does not seem exist! Would you like to install it?")) {
                            return;
                        }

                        if (!await System.program.easyPackageInstall(name, true)) {
                            SystemHtml.WindowHandler.presets.createInformation("Error", "The program '" + name + "' could not be installed!")
                            return
                        }

                        if (await SystemFileSystem.fileExists(path)) {
                            this.buildDesktop();
                            System.run(path);
                        } else {
                            SystemHtml.WindowHandler.presets.createInformation("Error", "The program '" + name + "' did not link to this Connection!")
                        }
                    }
                }
                thi.didMove = false
            }
        }, this);

        System.eventHandler.addEventHandler("mouseup", (event, thi) => {
            if (thi.drag != -1) {
                var element = document.querySelector("#desktopIcon_" + thi.drag)

                if (thi.grid) {
                    element.style.left = (Math.round(parseInt(element.style.left) / 120) * 120 + 20) + "px";
                    element.style.top = (Math.round(parseInt(element.style.top) / (120 + 40)) * (120 + 40) + 20) + "px";
                }

                thi.desktopIcons[thi.drag]["position"] = [parseInt(element.style.left), parseInt(element.style.top)];
                thi.save();

                thi.drag = -1;
            }
        }, this);

        System.eventHandler.addEventHandler("mousemove", (event, thi) => {
            if (thi.drag != -1) {
                var element = document.querySelector("#desktopIcon_" + thi.drag)

                element.style.top = parseInt(element.style.top) + event.movementY + "px";
                element.style.left = parseInt(element.style.left) + event.movementX + "px";

                thi.didMove = true;
            }
        }, this);

        document.querySelector("#Desktop").contextscript = (event) => {
            return {
                "Create new": async () => {
                    var file = await SystemHtml.WindowHandler.presets.createFileSelect("File to run");
                    if (file == undefined) {
                        return;
                    }
                    var icon = await SystemHtml.WindowHandler.presets.createFileSelect("File to display as image (cancel for default image)");
                    var name = await SystemHtml.WindowHandler.presets.createStringSelect("Name", "Name of the link");
                    if (name == "" || name == undefined) {
                        name = "unnamed";
                    }

                    var d = (await System.options.get("desktop")).all;
                    d.push({
                        name: name,
                        icon: icon,
                        run: file,
                        position: [100, 100]
                    })
                    await System.options.addValue("desktop", "all", d, true);

                    await SystemHtml.desktop.buildDesktop()
                },
                "Refresh": async () => {
                    await SystemHtml.desktop.buildDesktop();
                },
                "Edit": async () => {
                    System.program.runProgram("c/programs/legacySettings/desktop.js");
                },
                "Settings": async () => {
                    System.program.runProgram("c/programs/settings/main.js");
                }
            }
        }
    }

    async save() {
        System.options.addValue("desktop", "all", this.desktopIcons, true);
    }

    async #genDesktopIcon(name, icon, id) {
        var div = document.createElement("div");
        div.className = "DesktopIcon";
        div.id = "desktopIcon_" + id;
        div.setAttribute("iconId", id);

        var text = document.createElement("p");
        text.className = "DesktopIconText";
        text.innerText = name;

        var img = document.createElement("img");
        img.className = "DesktopImg";

        if (icon == undefined || icon == "") {
            img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/sys/imgs/noIco.webp"));
        } else {
            if (await SystemFileSystem.fileExists(icon)) {
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString(icon));
            } else {
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/sys/imgs/noIco.webp"));
            }
        }
        img.style.width = "100px";
        img.style.height = "100px";

        div.appendChild(img);
        div.appendChild(text);

        div.contextscript = (event) => {
            return {
                "Delete": async () => {
                    if (await SystemHtml.WindowHandler.presets.createConfirm("Delete", "Are you sure you want to delete '" + name + "'?")) {
                        var d = (await System.options.get("desktop")).all;
                        d.splice(id, 1);
                        await System.options.addValue("desktop", "all", d, true);

                        await this.buildDesktop()
                    }
                },
                "File Location": async () => {
                    var d = (await System.options.get("desktop")).all;
                    var path = d[id]["run"];
                    if (await SystemFileSystem.fileExists(path)) {
                        var folder = path.split("/");
                        folder.pop();
                        folder = folder.join("/");
                        System.program.runProgram("c/programs/explorer/main.js", folder);
                    } else {
                        SystemHtml.WindowHandler.presets.createInformation("File Location", "The file is located at '" + path + "' but it does not exist!")
                    }
                },
                "Edit Link": async (event) => {
                    var id = event.target.getAttribute("iconid")
                    System.program.runProgram("c/programs/legacySettings/desktop.js", id);
                    //SystemHtml.WindowHandler.presets.createInformation("Error", "Not implemented yet!")
                }
            }
        }
        return div;
    }

    async existsLink(path) {
        for (var x of (await System.options.get("desktop")).all) {
            if (x.run == path) {
                return true;
            }
        }

        return false;
    }
    async addLink(run, name, icon) {
        var d = (await System.options.get("desktop")).all;
        d.push({
            name: name,
            icon: icon,
            run: run,
            position: [100, 100]
        })
        await System.options.addValue("desktop", "all", d, true);

        await this.buildDesktop()
    }
}

class resizeAnimator {
    constructor() {
        this.currentHtml = undefined;
        this.enabled = true;
        this.loadSettings();
    }

    async loadSettings() {
        this.enabled = (await System.options.get("settings"))["resizeDirectionIndicator"][0];
    }

    add(id, clientX, clientY, resizePosition, resizePositionList) {
        if (!this.enabled) {
            return;
        }
        if (this.currentHtml != undefined) {
            this.currentHtml.remove();
        }

        var div = document.createElement("div");
        div.id = "resizeAnimator";
        div.style.position = "fixed";
        div.style.left = clientX + "px";
        div.style.top = clientY + "px";
        div.classList.add(resizePosition);
        div.classList.add(...resizePositionList.map(x => "own_" + x));

        setTimeout(() => {
            div.classList.add("animate");
            setTimeout(() => {
                div.remove();
            }, 500);
        }, 10);

        this.currentHtml = div;
        document.body.appendChild(div);
    }
}

class notificationsBackwardsCompatability {
    constructor() { }
    addNotification(options) {
        var fullOptions = { "title": "Notification", "text": "This is a notification", "icon": null, "onclick": () => { }, "onclose": () => { }, "timeout": 5000, };
        for (var x in options) {
            fullOptions[x] = options[x];
        }
        options = fullOptions;

        SystemHtml.WindowHandler.presets.createInformation(options.title, options.text);
    }
}

class SmallNotifications {
    constructor() {
        this.allCurrent = document.querySelector("#smallNotifications");
        this.popUp = document.querySelector("#smallNotificationsPopupList");
        document.querySelector("#smallNotificationsButton").onclick = () => { this.toggleAllCurrent(); };
        document.querySelector("#smallNotificationsTitleBarButtonsCloseButton").onclick = () => { this.toggleAllCurrent(); };

        this.allCurrentContainer = document.querySelector("#smallNotificationsNotificationsContainer");

        this.notifications = {};
        this.notificationId = 0;

        System.eventHandler.addEventHandler("click", (event, a) => {
            // hdie all current if clicked outside
            if (!event.target.closest("#smallNotifications") && !event.target.closest("#smallNotificationsButton") && !event.target.closest(".smallNotificationsNotification") && !event.target.closest(".notificationPopup")) {
                this.hideAllCurrent();
            }
        });
    }

    hideAllCurrent() {
        this.allCurrent.classList.remove("open");
    }

    toggleAllCurrent() {
        this.allCurrent.classList.toggle("open");
        if (this.allCurrent.classList.contains("open")) {
            this.loadAllCurrent();
            this.hideAllPopUp();
        }
    }

    hideAllPopUp() {
        for (var x in this.notifications) {
            if (this.notifications[x].popupdiv != undefined) {
                this.hideNotification(this.notifications[x].id);
            }
        }
    }

    loadAllCurrent() {
        this.allCurrentContainer.innerHTML = "";
        for (var x in this.notifications) {
            this.allCurrentContainer.appendChild(this.genNotificationAllCurrentDiv(this.notifications[x]));
        }
    }

    fillupOptions(options) {
        var fullOptions = {
            "title": "Notification",
            "text": "This is a notification",
            "icon": null,
            "onclick": () => { },
            "onclose": () => { },
            "timeout": 5000,
            "buttons": {}
        };
        //button:  {"uwu": () => { console.log("uwu"); }        


        for (var x in options) {
            fullOptions[x] = options[x];
        }

        return fullOptions;
    }

    async confirm(title, text, icon) {
        return await new Promise((resolve, reject) => {
            var id = this.addNotification({
                title: title,
                text: text,
                icon: icon,
                buttons: {
                    "Yes": () => {
                        resolve(true);
                    },
                    "No": () => {
                        resolve(false);
                    }
                }
            })
        })
    }

    addNotification(options) {
        options = this.fillupOptions(options);

        var id = this.notificationId;
        this.notificationId++;

        var div = this.genNotificationPopupDiv(options, id);
        this.popUp.appendChild(div);

        var notification = {
            options: options,
            id: id,
            popupdiv: div,
        }
        this.notifications[id] = notification;

        if (options.timeout != 0) {
            setTimeout(() => {
                if (this.notifications[id] != undefined) {
                    this.hideNotification(id);
                }
            }, options.timeout);
        }
        this.loadAllCurrent();
        if (this.allCurrent.classList.contains("open")) {
            this.hideNotification(id);
        }
        return id;
    }

    removeNotification(id) {
        if (this.notifications[id] != undefined) {
            if (this.notifications[id].popupdiv != null) {
                this.notifications[id].popupdiv.remove();
            }
            delete this.notifications[id];
        } else {
            console.error("Notification with id '" + id + "' does not exist!");
        }
        this.loadAllCurrent();
    }

    hideNotification(id) {
        if (this.notifications[id] == undefined) {
            console.error("Notification with id '" + id + "' does not exist!");
            return;
        }

        var notification = this.notifications[id];

        if (notification.popupdiv == null) {
            return;
        }

        notification.popupdiv.remove();
        notification.popupdiv = null;
    }

    editNotification(id, newOptions) {
        if (this.notifications[id] == undefined) {
            console.error("Notification with id '" + id + "' does not exist!");
            return;
        }

        var notification = this.notifications[id];
        var options = notification.options;
        for (var x in newOptions) {
            options[x] = newOptions[x];
        }


        this.notifications[id].options = options;

        if (notification.popupdiv != null) {
            var newDiv = this.genNotificationPopupDiv(options, id);
            notification.popupdiv.replaceWith(newDiv);
            notification.popupdiv = newDiv;
        }
        this.loadAllCurrent();
    }

    genNotificationPopupDiv(options, id) {
        var notificationPopup = document.createElement("div");
        notificationPopup.className = "notificationPopup";

        var notificationPopupTitleBar = document.createElement("div");
        notificationPopupTitleBar.className = "notificationPopupTitleBar";

        var notificationPopupTitleBarIcon = document.createElement("img");
        notificationPopupTitleBarIcon.className = "notificationPopupTitleBarIcon";
        notificationPopupTitleBarIcon.src = "";

        var notificationPopupTitle = document.createElement("p");
        notificationPopupTitle.className = "notificationPopupTitle";
        notificationPopupTitle.innerText = options.title;

        var notificationPopupTitleBarButtonsHC = document.createElement("div");
        notificationPopupTitleBarButtonsHC.className = "notificationPopupTitleBarButtonsHC";

        var notificationPopupTitleBarButtonsHideButton = document.createElement("div");
        notificationPopupTitleBarButtonsHideButton.className = "notificationPopupTitleBarButtonsHideButton";
        notificationPopupTitleBarButtonsHideButton.onclick = () => {
            this.hideNotification(id);
        }

        var notificationPopupTitleBarButtonsCloseButton = document.createElement("div");
        notificationPopupTitleBarButtonsCloseButton.className = "notificationPopupTitleBarButtonsCloseButton";
        notificationPopupTitleBarButtonsCloseButton.onclick = () => {
            this.removeNotification(id);
        }

        notificationPopupTitleBarButtonsHC.appendChild(notificationPopupTitleBarButtonsHideButton);
        notificationPopupTitleBarButtonsHC.appendChild(notificationPopupTitleBarButtonsCloseButton);

        var notificationPopupText = document.createElement("p");
        notificationPopupText.className = "notificationPopupText";
        notificationPopupText.innerText = options.text;

        var notificationPopupButtons = document.createElement("div");
        notificationPopupButtons.className = "notificationPopupButtons";

        for (var x in options.buttons) {
            var notificationPopupButton = document.createElement("p");
            notificationPopupButton.className = "notificationPopupButton";
            notificationPopupButton.innerText = x;
            notificationPopupButton.onclick = ((x) => {
                options.buttons[x]();
                this.removeNotification(id);
            }).bind(this, x);
            notificationPopupButtons.appendChild(notificationPopupButton);
        }

        notificationPopupTitleBar.appendChild(notificationPopupTitleBarIcon);
        notificationPopupTitleBar.appendChild(notificationPopupTitle);
        notificationPopupTitleBar.appendChild(notificationPopupTitleBarButtonsHC);

        notificationPopup.appendChild(notificationPopupTitleBar);
        notificationPopup.appendChild(notificationPopupText);
        notificationPopup.appendChild(notificationPopupButtons);

        return notificationPopup;
    }

    genNotificationAllCurrentDiv(notification) {
        var div = this.genNotificationPopupDiv(notification.options, notification.id);
        div.className = "smallNotificationsNotification";
        div.querySelector(".notificationPopupTitleBarButtonsHideButton").remove();
        div.querySelector(".notificationPopupTitleBarButtonsCloseButton").onclick = () => {
            this.removeNotification(notification.id);
            this.loadAllCurrent();
        }
        return div;
    }
}

var SystemHtml = new Html();//for "tsc" ///--remove--
SystemHtml = new Html();