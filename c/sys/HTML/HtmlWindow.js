
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
                this.transitionTime = 50;
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
                
                this.parent.getHtml().style.transition = this.transitionTime + "ms";
                await this.setSize(window.innerWidth, window.innerHeight);
                await delay(this.transitionTime);
                this.parent.getHtml().style.transition = "0s";
                
                this.parent.appearence.showTitle(false);

                SystemHtml.WindowHandler.updateWindowLayering();
            }
            async notMax() {
                this.fullMax = false;
                this.max = false;
                var t = "normal";

                this.parent.setPosition(this.maxBefore[t]["pos"][0], this.maxBefore[t]["pos"][1]);

                this.parent.getHtml().style.transition = this.transitionTime + "ms";
                this.setSize(this.maxBefore[t]["size"][0], this.maxBefore[t]["size"][1]);
                await delay(this.transitionTime);
                this.parent.getHtml().style.transition = "0s";

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
                    this.parent.getHtml().style.transition = this.transitionTime + "ms";
                    await this.setSize(window.innerWidth, window.innerHeight - 35);
                    await delay(this.transitionTime);
                    this.parent.getHtml().style.transition = "0s";
                }
            }
            async setInnerSize(x, y) {
                await this.setSize(x, y + 40)
            }
            async disableOverflow() {
                this.parent.getHtml().querySelector(".content").style.overflow = "hidden";
            }
            async showOverflow() {
                this.parent.getHtml().querySelector(".content").style.overflow = "auto";
            }
        }(this)
        this.appearence = new class {
            constructor(parent) {
                this.transitionTime = 200;
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
            async minimize() {
                var h = this.parent.getHtml();

                this.parent.getHtml().style.transition = this.transitionTime + "ms";
                var o = h.style.top
                h.style.top = (parseInt(o) + (window.innerHeight / 4)) + "px";
                h.style.opacity = "0";
                h.style.MozTransform = 'scale(0.5)';
                h.style.WebkitTransform = 'scale(0.5)';

                this.shown = false;
                SystemHtml.WindowHandler.updateTaskBar();

                await delay(this.transitionTime);
                h.style.top = o;
                this.parent.getHtml().style.transition = "0s";
                h.style.opacity = "1";

                h.style.display = "none";
            }
            async show() {
                if (this.shown != true) {
                    this.shown = true;

                    var h = this.parent.getHtml();
                    var o = h.style.top
                    h.style.top = (parseInt(o) + (window.innerHeight / 4)) + "px";
                    h.style.transition = this.transitionTime + "ms";
                    h.style.opacity = "0";
                    h.style.display = "";
                    await delay(1);
                    h.style.top = o;
                    h.style.MozTransform = "scale(1)";
                    h.style.WebkitTransform = "scale(1)";
                    h.style.opacity = "1";
                    await delay(this.transitionTime);
                    h.style.transition = "0s";
                }
            }
            async toggleMinimize() {
                if (this.show) {
                    await this.minimize();
                } else {
                    await this.show();
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
HtmlWindow;