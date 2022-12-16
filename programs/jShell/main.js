class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.returnObjects = {};

        this.loadStyle()


        /**
         * @type HtmlWindow
         */
        this.window = await SystemHtml.WindowHandler.createWindow("jShell",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")
                
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(500, 300);
                await this.window.size.userCanResize(true);

                await this.window.addHtmlEventListener("onkeyup", "consoleInput", (_, __, ___, event) => {
                    //console.log(event);
                    if (event.keyCode == 13) {
                        console.log('JShell>' + event.target.value);
                        try {
                            var r = eval(event.target.value);
                            if (r == undefined) {
                                console.debug('> undefined');
                            } else {
                                var id = System.makeid(100);
                                this.returnObjects[id] = r;
                                console.log('> ' + r + "__jshellLookup" + id);
                            };
                        } catch (e) {
                            console.error(e);
                        }
                        event.target.value = '';
                    }
                }, this, undefined);
                this.consoleEventId = System.console.addListener((dat, self) => { self.update(dat); }, this);

                for (var x of System.console.get()) {
                    this.update(x);
                }
            });
        this.window.close = () => {
            try {
                System.console.removeListener(this.consoleEventId);
            } catch {
                console.error("could not stop listener!");
            }
            this.stop();
            return true
        }

    }

    async loadStyle() {
        if (window.jShellInitialized == undefined) {
            var styleSheet = document.createElement("style")
            styleSheet.innerText = await SystemFileSystem.getFileString(this.PATH.folder() + "/style.css");
            document.head.appendChild(styleSheet)
            window.jShellInitialized = true;
        }
    }
    /**
     * @param {[string,any]} dat 
     */
    async update(dat) {
        var color = "aqua";
        switch (dat[0]) {
            case "debug":
                color = "gray";
                break;

            case "info":
            case "log":
                color = "white";
                break;

            case "warn":
                color = "rgb(222, 167, 0)";
                break;

            case "trace":
                await this.printStack(dat[2]);
                color = "white";
                break;

            case "error":
                color = "rgb(255, 0, 0)";
                break;

            default:
                break;
        }
        var p = document.createElement("p");
        p.style.color = color;

        var text = dat[1];
        if (typeof text == "string" && text.includes("__jshellLookup")) {
            text = text.split("__jshellLookup")[0];
            p.setAttribute("jshell_lookup", dat[1].split("__jshellLookup")[1]);
        } else {
            var id = System.makeid(100);
            this.returnObjects[id] = dat[1];
            p.setAttribute("jshell_lookup", id);
        }
        p.title = "click for more information";

        p.addEventListener("click", (event) => { this.openObject(event) });

        p.innerText = text + "";
        (await this.window.getHtmlElement("consoleLog")).prepend(p);
    }

    async printStack(dat) {
        dat.type = "trace";
        var p = document.createElement("p");
        p.style.color = "gray";

        var id = System.makeid(100);
        this.returnObjects[id] = dat;
        p.setAttribute("jshell_lookup", id);

        p.title = "click for more information";
        p.addEventListener("click", (event) => { this.openObject(event) });

        p.innerText = "Stack";
        (await this.window.getHtmlElement("consoleLog")).prepend(p);
    }

    openObject(event) {
        var lookup = event.target.getAttribute("jshell_lookup");
        new ObjectAnalyser(this.returnObjects[lookup], this.PATH, "", undefined);
    }
}
class ObjectAnalyser {
    constructor(obj, path, otherAnalysersBefore, parent) {
        this.parent = parent;
        this.PATH = path;
        this.obj = obj;
        this.lookup = {};
        this.run()
        this.otherAnalysersBefore = otherAnalysersBefore + "/" + this.obj.constructor.name;
    }
    async run() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("ObjectAnalyser",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/objAnalyze.html"));
                await this.window.size.setSize(600, 600);
                await this.window.size.userCanResize(true);

                (await this.window.getHtmlElement("path")).innerText = this.otherAnalysersBefore;

                this.parseDat();
            });
        this.window.close = () => {
            return true
        }
    }
    async parseDat() {
        //console.log(this.obj);
        //console.log(this.obj.constructor);
        //console.log("name: " + this.obj.constructor.name);
        (await this.window.getHtmlElement("classname")).innerText = this.obj.constructor.name;

        var pn = Object.getOwnPropertyNames(this.obj);
        for (var m of pn) {
            try {
                await this.genObject(this.obj[m], m);
            } catch (e) {
                //TODO: automatically detect, when to load from parent!
                console.warn("insecting from parent!")
                //trying to access it from parent
                var p = this.parent.getObject(m)
                if (p != undefined) {
                    await this.genObject(p, m);
                }
            }
        }

        await this.genObject(Object.getPrototypeOf(this.obj), "[[ Prototype ]]")
    }

    getObject(m) {
        try {
            return this.obj[m];
        } catch {
            if (this.parent == undefined) {
                return null;
            }
            return this.parent.getObject(m);
        }
    }

    async genObject(obj, m) {
        try {
            var attributeElem = await this.window.getHtmlElement("attributes")

            var p = document.createElement("p");
            var name = document.createElement("span");
            name.innerText = m + ": ";
            name.style.color = "red";

            var value = document.createElement("span");

            if (typeof obj == "object" && obj != null) {
                value.innerText = obj.constructor.name + " | " + obj;
                value.setAttribute("objLookup", this.genLookup(obj))
            }
            else {
                value.innerText = obj + "";
                value.setAttribute("objLookup", this.genLookup(obj));
            }

            //if value is verry long
            if (value.innerText.length > 3 + 55) {
                value.innerText = value.innerText.slice(0, 0 + 55) + "...";
                value.removeAttribute("objLookup");
                //value.setAttribute("objLookup", null);
                value.setAttribute("big", this.genLookup(obj));
                value.classList.add("opText");
            }
            p.classList.add("objLookup");

            value.classList.add("jshellValue")
            value.setAttribute("name", m);
            name.setAttribute("name", m);
            p.setAttribute("name", m);

            p.append(name);
            p.append(value);
            attributeElem.append(p)

            name.setAttribute("objLookup", this.genLookup(obj))
            p.setAttribute("objLookup", this.genLookup(obj))
            p.addEventListener("click", async (event) => {
                var lookup = event.target.getAttribute("objLookup");
                if (lookup != null) {
                    new ObjectAnalyser(this.getLookup(lookup), this.PATH, this.otherAnalysersBefore, this);
                } else {
                    var big = event.target.getAttribute("big");

                    await SystemFileSystem.setFileString("c/_temp/big.txt", this.getLookup(big) + "");
                    await System.program.runProgram("c/programs/textEditor/main.js", "c/_temp/big.txt")
                    //SystemHtml.WindowHandler.presets.createInformation("Big of '" + event.target.getAttribute("name") + "'", this.getLookup(big) + "");
                }
            });

            p.contextscript = () => {
                return {
                    "copy as text": (event) => {
                        navigator.clipboard.writeText(obj + "");
                    },
                    "to global variable": async (event) => {
                        window[await SystemHtml.WindowHandler.presets.createStringSelect("Name", "Global Variable Name:")] = obj;
                    }
                };
            }
        } catch (e) {
            console.error(e);
        }
    }

    genLookup(element) {
        var id = System.makeid(100);
        this.lookup[id] = element;
        return id;
    }
    getLookup(id) {
        return this.lookup[id];
    }
}
new program();