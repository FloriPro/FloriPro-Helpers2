class sys {
    constructor() {
        this.options = new options();
        this.program = new systemProgramHandler();
        this.settings = new settingsHandler()
        this.network = new Network();
        this.console = new MyConsole();
        this.path = Path;
        this.SystemFileSystem = SystemFileSystem;
    }
    async createEvents() {
        this.eventHandler = new eventHandler();
        this.eventHandler.construct();
    }
    /**
     * run a javascript file
     */
    async run(path) {
        var dec = `var PATH=new System.path('${path}');`;
        try {
            return eval(dec + "\n" + await SystemFileSystem.getFileString(path));
        } catch (e) {
            console.error(e);
        }
    }
    /**
     * gives a random alphanumeric string
     * @param {number} length 
     * @returns {string} random alphanumeric string
     */
    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    /**
     * opens a file with the right program
     * @param {string} path
     */
    async open(path) {
        var o = await System.options.get("fileExtensionOpener")
        var p = path.split("/")
        var ap = p[p.length - 1].split(".");
        var fileEnding = ap[ap.length - 1]

        var programToOpen = o["_default"]
        if (Object.keys(o).includes(fileEnding)) {
            programToOpen = o[fileEnding];
        }
        System.program.runProgram(programToOpen, path);
    }
    /**
     * gives you the class of the libary
     * @param {string} name libary name
     * @returns {Promise<typeof Class>}
     */
    async getLib(name) {
        var path = (await System.options.get("libs"))[name];
        if (path == undefined) {
            console.warn("Could not find lib");
            return class { };
        }
        var lib = System.run(path);
        return lib;
    }
}
class MyConsole {
    constructor() {
        var OldConsoledebug = console.debug;
        console.debug = (...dat) => {

            //handle other
            if (dat[dat.length - 1] == "no-event") {
                dat.splice(dat.length - 1);
                OldConsoledebug(...dat);
                return;
            } else {
                OldConsoledebug(...dat);
                System.console.add("debug", ...dat);
            }
        }
        var OldConsoletrace = console.trace;
        console.trace = (...dat) => {

            //handle other
            if (dat[dat.length - 1] == "no-event") {
                dat.splice(dat.length - 1);
                OldConsoletrace(...dat);
                return;
            } else {
                OldConsoletrace(...dat);
                var error = new Error();
                System.console.add("trace", dat, error);
            }
        }
        var OldConsoleerror = console.error;
        console.error = (...dat) => {

            //handle other
            if (dat[dat.length - 1] == "no-event") {
                dat.splice(dat.length - 1);
                OldConsoleerror(...dat);
                return;
            } else {
                OldConsoleerror(...dat);
                System.console.add("error", ...dat);
            }
        }
        var OldConsoleinfo = console.info;
        console.info = (...dat) => {

            //handle other
            if (dat[dat.length - 1] == "no-event") {
                dat.splice(dat.length - 1);
                OldConsoleinfo(...dat);
                return;
            } else {
                OldConsoleinfo(...dat);
                System.console.add("info", ...dat);
            }
        }
        var OldConsolelog = console.log;
        console.log = (...dat) => {

            //handle other
            if (dat[dat.length - 1] == "no-event") {
                dat.splice(dat.length - 1);
                OldConsolelog(...dat);
                return;
            } else {
                OldConsolelog(...dat);
                System.console.add("log", ...dat);
            }
        }
        var OldConsolewarn = console.warn;
        console.warn = (...dat) => {

            //handle other
            if (dat[dat.length - 1] == "no-event") {
                dat.splice(dat.length - 1);
                OldConsolewarn(...dat);
                return;
            } else {
                OldConsolewarn(...dat);
                System.console.add("warn", ...dat);
            }
        }

        /**
         * @type { [string, *][] }
         */
        this.logs = [];

        this.listeners = {};
    }
    /**
     * Internal method
     * @param {string} type 
     * @param  {...any} dat 
     * @returns 
     */
    add(type, ...dat) {
        if (dat.length != 1 && type != "trace") {
            var d = dat.join(" ");
        } else {
            var d = dat[0];
        }
        this.logs.push([type, d]);
        if (Object.keys(this.logs).length > 100) {
            this.logs.splice(0, 1);
        }

        for (var k of Object.keys(this.listeners)) {
            var updateListener = this.listeners[k];
            try {
                if (type == "trace") {
                    updateListener[0]([type, dat[0], dat[1]], updateListener[1]);
                } else {
                    updateListener[0]([type, d], updateListener[1]);
                }
            } catch (e) {
                delete this.listeners[k];
                console.error(e);
                return;
            }
        }
    }
    /**
     * add an event listener on any console log
     * @param {([type,loggedObject]:[string, any], variable:any)} callback gets called
     * @param {*} variable 
     * @returns 
     */
    addListener(callback, variable) {
        var id = System.makeid(100);
        this.listeners[id] = [callback, variable];
        return id;
    }
    /**
     * remove an event listener
     * @param {string} id event listener id
     */
    removeListener(id) {
        delete this.listeners[id];
    }
    /**
     * returns a list of all last 100 console logs
     * @returns {string[]}
     */
    getString() {
        var out = []
        for (var x of this.logs) {
            out.push(x[1]);
        }
        return out;
    }
    /**
     * returns a list of all last 100 console logs
     * @returns 
     */
    get() {
        return this.logs;
    }
}

class Network {
    constructor() {

    }
    /**
     * @param {RequestInfo | URL} input 
     * @param {...RequestInit} init 
     * @returns {Promise<Response>}
     */
    fetch(input, ...init) {
        return fetch(input, ...init);
    }
}
class Path {
    constructor(path) {
        this.path = path
    }
    /**
     * [folder1, folder2, folder3, file]
     * @returns {string[]}
     */
    sections() {
        return this.path.split("/");
    }
    /**
     * name of the file
     * @returns {string}
     */
    file() {
        return this.sections()[this.sections().length - 1]
    }
    /**
     * path to the file
     * @returns {string}
     */
    folder() {
        return this.sections().slice(0, -1).join("/");
    }
}
class systemProgramHandler {
    constructor() {
        this.programRegister = {};
        this.default = standardProg;
    }
    /**
     * @param {string} name name of the program/libary
     * @returns {Promise<boolean>} true if the program/libary exists, false otherwise
     */
    async installed(name) {
        var libs = await System.options.get("libs");
        var programs = await System.options.get("programs");
        if (Object.keys(libs).includes(name)) {
            return true;
        }
        if (Object.keys(programs).includes(name)) {
            return true;
        }
        return false;
    }
    /**
     * starts a program form a file
     * @param {string} path the path to the program
     * @param {*} args a argument that gets passed to the program when it is started
     * @returns {Promise<program>} the created program
     */
    async runProgram(path, args) {
        return await this.runProgramString(await SystemFileSystem.getFileString(path), path, args)
    }
    /**
     * starts a program from the string provided in "dat"
     * @param {string} dat the program string to start
     * @param {string} path the path to the program
     * @param {*} args a argument that gets passed to the program when it is started
     * @returns {Promise<program>} the created program
     */
    async runProgramString(dat, path, args) {
        if (path == undefined) {
            path = "c";
        }
        try {
            var r = await eval(dat)
        } catch (e) {
            console.error(e);
        }
        var id = this.findFreeId();

        this.programRegister[id] = r;
        r.id = id;
        r.PATH = new System.path(path);
        try {
            r.init(args);
        } catch (e) {
            console.error(e);
        }
        return r;
    }

    /**
     * uses installPackage to install the package from this github repository
     * @param {string} name 
     * @param {boolean} overwrite should overwrite if allready exists
     * @return {Promise<boolean>} was the package installed successfully
     */
    async easyPackageInstall(name, overwrite) {

        if (await System.program.installed(name) && overwrite != true) {
            return false;
        }
        var l = await SystemHtml.WindowHandler.presets.createLoading("Installing " + name, "Downloading " + name);
        await System.program.installPackage(await (await System.network.fetch(`programs/${name}.json`)).text(), true, l, false, name);
        return true;
    }

    /**
     * installs a package. Can allso display the progress in a window
     * @param {string} data package
     * @param {boolean} display show prograss in a window
     * @param {loadingPreset} displayWindow the window to display the progress
     */
    async installPackage(data, display, displayWindow, showInstallInfo, name) {
        if (name == undefined) { name = "?"; }

        await displayWindow.setNum(25);
        await displayWindow.setText("Installing " + name);

        if (showInstallInfo == undefined) {
            showInstallInfo = display;
        }

        var pdata = JSON.parse(data);
        await SystemFileSystem.unpackPackage(pdata);
        if (display == true) await displayWindow.setNum(50);
        var location = await SystemFileSystem.getFileString("c/_temp/installLocation.dat");
        await SystemFileSystem.moveInFolder("c/_temp", location);
        await delay(100);
        console.log("running install " + name);
        if (display == true) await displayWindow.setNum(75);
        var ret = await (await System.run(location + "/install.js"));

        if (showInstallInfo == true) {
            if (ret) {
                SystemHtml.WindowHandler.presets.createInformation("Installed", "Succesfully installed!");
            } else {
                SystemHtml.WindowHandler.presets.createInformation("Installed", "Unexpected response!");
            }

        }
        if (display == true) {
            await displayWindow.setNum(100);
            delay(250);
            displayWindow.stop();
        }
        console.log("finished installation " + name);
    }
    /**
     * finds a free id for a now program
     * @returns {number}
     */
    findFreeId() {
        var i = 0;
        var k = Object.keys(this.programRegister)
        while (k.includes("" + i)) {
            i++;
        }
        return i;
    }
    /**
     * stop the with id named program
     * @param {number} id 
     */
    stop(id) {
        this.programRegister[id].isStopping();
        delete this.programRegister[id]
    }
    /**
     * get the program of the given id
     * @param {number} id 
     * @return {standardProg}
     */
    get(id) {
        return this.programRegister[id];
    }
}

class standardProg {
    constructor() {
        this.id = -1;
    }
    /**
     * gets called, when the system has initialized the program
     * @param {string[]} args 
     */
    init() {

    }
    /**
     * called by the program to stop itself
     */
    stop() {
        System.program.stop(this.id)
    }

    /**
     * called when program gets killed
     */
    isStopping() {

    }
}

class options {
    /**
     * returns the data of an option (allways a dict)
     * @param {string} option name of the option whitch contains a dict of values
     * @returns {Promise<{ [any: string]: any }} dict of the values of the option
     */
    async get(option) {
        var d = SystemFileSystem.getFileJson("c/sys/options/" + option + ".json");
        return d;
    }
    /**
     * adds something to the dict of an option
     * @param {string} option 
     * @param {string} name 
     * @param {*} data
     * @param {string | undefined} overwrite optional
     */
    async addValue(option, name, data, overwrite) {
        var d = await SystemFileSystem.getFileJson("c/sys/options/" + option + ".json");
        if (d[name] == undefined || overwrite == true) {
            d[name] = data;
            await SystemFileSystem.setFileString("c/sys/options/" + option + ".json", JSON.stringify(d))
            return true;
        } else {
            console.warn("no overwrite")
            return false;
        }
    }
}

class eventHandler {
    constructor() {
        this.lifeMakerVars = {}
        this.handlers = {}
        this.keysDown = {};
        this.mouse = { "x": 0, "y": 0 };
        this.mouseDownTime = -1;
        this.onmobile = false;
        this.longClick = false;
    }
    async construct() {
        this.replacementEvents = await System.options.get("eventReplacements");
        this.replacementEventsK = Object.keys(this.replacementEvents);

        this.shouldPrevent = await System.options.get("events");
        var e1 = Object.keys(await System.options.get("eventsDoc"));
        var e2 = Object.keys(await System.options.get("eventsWin"));
        this.events = e1.concat(e2);

        for (var x of e1) {
            document.addEventListener(x, this.event);
            this.handlers[x] = []
        }
        for (var x of e2) {
            window.addEventListener(x, this.event);
            this.handlers[x] = []
        }
        this.longClick = (await System.options.get("settings"))["long click for rightclick"][0]
    }
    /**
     * @param {string} type 
     * @param {(event: Event) => void | true} handler if return true: all further event's get canceld
     */
    addEventHandler(type, handler, vars) {
        if (this.events.includes(type)) {
            this.handlers[type].push([handler, vars]);
            return true;
        } else {
            console.warn("event " + type + " doesn't seem to exist!");
            return false;
        }
    }
    /**
     * handles every event that exists
     * @param {Event} event 
     */
    event(event, type, replacement) {
        if (type == undefined) { type = event.type }
        //special fonctions to make life easyer for mobile
        if ((type == "touchmove" || type == "touchend" || type == "touchstart") && (event.movementX == undefined || event.movementY == undefined)) {
            System.eventHandler.onmobile = true;
            var toutches = event.touches;

            if (toutches.length == 0) {
                toutches = [{ "pageX": System.eventHandler.lifeMakerVars["mox"], "pageY": System.eventHandler.lifeMakerVars["moy"] }]
            }

            if (System.eventHandler.lifeMakerVars["mox"] == null) {
                System.eventHandler.lifeMakerVars["mox"] = toutches[0].pageX;
                System.eventHandler.lifeMakerVars["moy"] = toutches[0].pageY;
                event.movementX = 0;
                event.movementY = 0;
            } else {
                event.movementX = toutches[0].pageX - System.eventHandler.lifeMakerVars["mox"];
                event.movementY = toutches[0].pageY - System.eventHandler.lifeMakerVars["moy"];
                System.eventHandler.lifeMakerVars["mox"] = toutches[0].pageX;
                System.eventHandler.lifeMakerVars["moy"] = toutches[0].pageY;
            }
        }
        if (type == "touchend") {
            System.eventHandler.lifeMakerVars["mox"] = null;
        }
        if (type == "keydown") {
            System.eventHandler.keysDown[event.code] = true;
        }
        if (type == "keyup") {
            System.eventHandler.keysDown[event.code] = false;
        }
        if (type == "mousemove") {
            System.eventHandler.mouse["x"] = event.clientX;
            System.eventHandler.mouse["y"] = event.clientY;
        }
        if ((type == "mousedown" && !System.eventHandler.onmobile) || (type == "mousedown" && replacement == true)) {
            System.eventHandler.mouse["x"] = event.clientX;
            System.eventHandler.mouse["y"] = event.clientY;
            //console.trace(type + " | " + replacement)
            /*
            if (type == "mousedown" && replacement == undefined) {
                debugger;
            }*/
            System.eventHandler.mouseDownTime = Date.now();
        }
        if (type == "mouseup") {
            System.eventHandler.mouse["x"] = event.clientX;
            System.eventHandler.mouse["y"] = event.clientY;
        }


        if (replacement == undefined) { replacement = false; }
        if (System.eventHandler.shouldPrevent[type]) {
            if (event.cancelable) {
                event.preventDefault();
            }
        }
        if (type == "click" && replacement == false) {
            //console.log("click " + (Date.now() - System.eventHandler.mouseDownTime))
            if (System.eventHandler.longClick == true && Date.now() - System.eventHandler.mouseDownTime > 500) {
                type = "contextmenu";
                event.preventDefault();
                System.eventHandler.mouseDownTime = -1;
                System.eventHandler.event(event, "contextmenu", true);
                return;
            }
        }


        for (var x of System.eventHandler.handlers[type]) {
            var r = x[0](event, x[1]);
            if (r == true) {
                return;
            }
        }

        if (System.eventHandler.replacementEventsK.includes(type) && replacement == false) {
            System.eventHandler.event(event, System.eventHandler.replacementEvents[type], true);
        }
    }
}
class settingsHandler {
    constructor() {
        this.settingsUpdater = {}
    }
    /**
     * calback gets called when the specified setting changes
     * @param {string} name the name of the setting to view
     * @param {(settingsName)} callback 
     */
    addSettingsUpdater(name, callback) {
        if (this.settingsUpdater[name] == undefined) {
            this.settingsUpdater[name] = [];
        }
        this.settingsUpdater[name].push(callback);
    }
    /**
     * gets called this when a setting changes.
     * Internal method
     * @param {string} name 
     * @returns 
     */
    settingUpdated(name) {
        if (this.settingsUpdater[name] == undefined) {
            return;
        }
        for (var x of this.settingsUpdater[name]) {
            x(name);
        }
    }
}
var Class = class { } //for "tsc" ///--remove--
var System = new sys();//for "tsc" ///--remove--
System = new sys();
