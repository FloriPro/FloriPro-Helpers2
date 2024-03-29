class sys {
    constructor() {
        this.options = new options();
        this.program = new systemProgramHandler();
        this.settings = new settingsHandler()
        this.network = new Network();
        this.console = new MyConsole();
        this.notification = new Notifications();
        this.path = Path;
        this.SystemFileSystem = SystemFileSystem;
    }
    async createEvents() {
        this.eventHandler = new eventHandler();
        this.eventHandler.construct();
    }
    /**
     * run a javascript file
     * @param {string} path path to the file
     * @param {boolean} noPath if true, the path variable will not inserted at the beginning of the file
     * @returns {Promise<any>} the return value of the file
     */
    async run(path, noPath = false) {
        if (noPath == false) {
            var dec = `var PATH=new System.path('${path}');\n`;
        } else {
            var dec = "";
        }

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
        try {
            var lib = System.run(path);
        } catch (e) {
            console.error(e);
            return class { };
        }
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
     * @param {([type,loggedObject]:["debug" | "trace" | "error" | "info" | "log" | "warn", any], variable:any)} callback gets called
     * @param {*} variable 
     * @returns {string} console listener id
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
     * @param {RequestInit} init 
     * @returns {Promise<Response>}
     */
    fetch(input, init) {
        return fetch(input, init);
    }
    async informationalFetch_Text(url, opts = {}, onProgress, title = "Downlaoding...", text = "Downloading from " + url) {
        var w = await SystemHtml.WindowHandler.presets.createLoading(title, text);
        var p = new Promise(async function (res, rej) {
            var xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (var k in opts.headers || {}) {
                xhr.setRequestHeader(k, opts.headers[k]);
            }
            xhr.responseType = "arraybuffer";
            xhr.onload = (e) => {
                var uInt8Array = e.target.response;

                var data = SystemFileSystem.bufferToString(uInt8Array);

                res(data);
                w.stop();
            };
            xhr.onerror = (...e) => {
                rej(...e);
                w.stop();
            };
            if (xhr.upload && onProgress) {
                xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
            }
            xhr.onprogress = (e) => {
                w.setNum(Math.floor((e.loaded / e.total) * 100))
            }
            xhr.send(opts.body);
        });
        return await p;
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
        this.connect = new class {
            constructor(parent) {
                this.parent = parent;
            }

            /**
             * send a message to a publicly registered program
             * @param {string} name 
             * @param {*} message 
             * @returns {Promise<boolean | any>}
             */
            async send(name, message) {
                if (this.parent.publicPrograms[name]) {
                    return await this.parent.publicPrograms[name](message);
                }
                return false;
            }

            /**
             * 
             * @param {string} name 
             * @returns {boolean}
             */
            listenerExists(name) {
                return !!this.parent.publicPrograms[name];
            }
        }(this);
        this.publicPrograms = {};
        this.intervalHandlers = {};
    }

    /**
     * Install a libary
     * @param {string} name name of the libary
     * @param {boolean} overwrite overwrite the libary if it exists
     */
    async libInstall(name, overwrite) {
        //check if libary is already installed
        if (await System.program.installed(name) && overwrite != true) {
            return false;
        }

        //get libary path from online libs.json file
        var libs = JSON.parse(await (await System.network.fetch("libs/_.json")).text());
        if (!Object.keys(libs).includes(name)) {
            console.error("Libary " + name + " not found");
        }
        var path = libs[name].path;

        var l = await SystemHtml.WindowHandler.presets.createLoading("Installing Libary " + name, "Downloading " + name);
        await System.program.installPackage(await (await System.network.fetch(path)).text(), true, l, false, name, true, libs[name].version);

        //add libary to libs option
        await System.options.addValue("libs", name, "c/libs/" + name + "/run.js", true);

        return true;
    }

    /**
     * checks if a program/libary is installed
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
        //try {
        var r = await eval(dat)
        //} catch (e) {
        //    console.error(e);
        //}
        var id = this.findFreeId();

        this.programRegister[id] = r;
        r.id = id;
        r.PATH = new System.path(path);
        try {
            var i = r.init(args);
            r.initWait = i;
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
        if (overwrite != true && await System.program.installed(name)) {
            return false;
        }
        var l = await SystemHtml.WindowHandler.presets.createLoading("Installing " + name, "Downloading " + name);
        var programs = JSON.parse(await (await System.network.fetch("programs/_.json")).text());

        if (!Object.keys(programs).includes(name)) {
            var programs = JSON.parse(await (await System.network.fetch("libs/_.json")).text());
            await System.program.installPackage(await (await System.network.fetch(programs[name]["path"])).text(), true, l, false, name, true, programs[name].version);
        } else {
            await System.program.installPackage(await (await System.network.fetch(programs[name]["path"])).text(), true, l, false, name, false, programs[name].version);
        }

        return true;
    }
    /**
     * uses installPackage to install the package from this github repository
     * @param {string} url
     * @param {string} name 
     * @param {boolean} overwrite should overwrite if allready exists
     * @return {Promise<boolean>} was the package installed successfully
     */
    async easyPackageUrlInstall(url, name, overwrite, version) {
        if (overwrite != true && await System.program.installed(name)) {
            return false;
        }
        var l = await SystemHtml.WindowHandler.presets.createLoading("Installing " + name, "Downloading " + name);

        await System.program.installPackage(await (await System.network.fetch(url)).text(), true, l, false, name, false, version);

        return true;
    }

    /**
     * installs a package. Can allso display the progress in a window
     * @param {string} data package
     * @param {boolean} display show prograss in a window
     * @param {loadingPreset} displayWindow the window to display the progress
     * @param {boolean} showInstallInfo show the install info in the window
     * @param {string} name name of the package (needed for libs)
     * @param {boolean | undefined} isLib true, if the package is a libary
     * @param {string} version version of the package
     */
    async installPackage(data, display, displayWindow, showInstallInfo, name, isLib, version) {
        if (name == undefined) { name = "unknown"; }

        if (display == true) {
            await displayWindow.setNum(25);
            await displayWindow.setText("Installing " + name);
        }

        if (showInstallInfo == undefined) {
            showInstallInfo = display;
        }

        var pdata = JSON.parse(data);
        await SystemFileSystem.unpackPackage(pdata);
        if (display == true) await displayWindow.setNum(50);
        if (isLib == true) {
            var location = "c/libs/" + name;
        } else {
            var location = await SystemFileSystem.getFileString("c/_temp/installLocation.dat");
        }
        await SystemFileSystem.moveInFolder("c/_temp", location);
        await delay(100);
        console.log("running install " + name);
        if (display == true) await displayWindow.setNum(75);
        if (isLib != true) {
            var ret = await (await System.run(location + "/install.js"));
        }

        if (isLib == true) {
            await System.options.addValue("versions", "lib_" + name, version, true);
        } else {
            await System.options.addValue("versions", "prog_" + name, version, true);
        }

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
        //clear handlers
        try {
            if (this.intervalHandlers[id] != null) {
                for (var x of this.intervalHandlers[id]) {
                    clearInterval(x);
                }
            }
        } catch {
            console.error("could not stop handlers");
        }

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
    setInterval(callback, interval, variable, programId) {
        var intervalId = setInterval(this.handleInterval, interval, callback, programId, variable);
        if (this.intervalHandlers[programId] == undefined) {
            this.intervalHandlers[programId] = []
        }
        this.intervalHandlers[programId].push(intervalId);
    }
    handleInterval(callback, programId, variable) {
        System.program.programRegister[programId].x = callback
        System.program.programRegister[programId].x(variable);
    }

    /**
     * 
     * @param {(message:*)=>{}} message 
     * @param {string} name 
     * @returns {Promise<boolean>} true, if it succeded to add. False if it allready existed
     */
    async addPublicListener(message, name) {
        if (this.publicPrograms[name] != undefined) {
            return false;
        }

        this.publicPrograms[name] = message;
    }
}

class standardProg {
    constructor() {
        /**
         * @type {Path}
         */
        this.PATH;
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

    /**
     * adds a interval that gets called with the given variable every interval. The interval gets stopped when the program stops.
     * @param {(variable: *)=>{}} callback 
     * @param {number} interval ms
     * @param {*} variable 
     * @returns {number} interval id
     */
    setInterval(callback, interval, variable) {
        return System.program.setInterval(callback, interval, variable, this.id);
    }

    /**
     * 
     * @param {(message:*)=>{}} message 
     * @param {string} name 
     * @returns {Promise<boolean>} true, if it succeded to add. False if it allready existed
     */
    async setPublicListener(message, name) {
        return await System.program.addPublicListener(message, name);
    }
}

class options {
    /**
     * returns the data of an option (allways a dict) or null if it does not exist
     * @param {string} option name of the option whitch contains a dict of values
     * @returns {Promise<null | {[any: string]: any;}>} dict of the values of the option
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

    constructor() {
        setTimeout(this.init.bind(this), 100);
    }
    async init() {
        var p = await System.program.runProgram("c/sys/HTML/vip/vipVerify.js");
        this.vip = p;
        await p.initWait;
        this.vip.startAll();
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
            if (event.clientX == undefined || event.clientY == undefined) {
                event.clientX = toutches[0].pageX;
                event.clientY = toutches[0].pageY;
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
        if (type == "click" && replacement == false && System.eventHandler.onmobile) {
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
        if (name == undefined) {
            //when there is no name, it means that all settings have been updated or we don't know what setting has been updated
            for (var x in this.settingsUpdater) {
                this.settingUpdated(x);
            }

            //better also check if we have any json files, that have old/missing keys
            System.run("c/sys/functions/first/cleanupSettings.js");
        }

        if (this.settingsUpdater[name] == undefined) {
            return;
        }
        for (var x of this.settingsUpdater[name]) {
            x(name);
        }
    }
}
class Notifications {
    constructor() {

    }
    /**
     * 
     * @returns {Promise<false | Notification>} false if it failed, Notification if it worked
     */
    async desktopNotification(title, body, icon) {
        if (!window.Notification) {
            return false;
        }
        if (Notification.permission !== 'granted') {
            var p = await Notification.requestPermission();
            if (p !== 'granted') {
                return false;
            }
        }

        //notifications were granted
        var notification = new Notification(title, {
            body: body,
            icon: icon
        });
        return notification
    }
    /**
     * 
     * @returns {Promise<boolean>} true if permission was granted, false if it failed
     */
    async requestPermission() {
        if (!window.Notification) {
            return false;
        }
        if (Notification.permission !== 'granted') {
            var p = await Notification.requestPermission();
            if (p !== 'granted') {
                return false;
            }
        }
        return true;
    }
}
var Class = class { } //for "tsc" ///--remove--
var System = new sys();//for "tsc" ///--remove--
System = new sys();
