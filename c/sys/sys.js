class sys {
    constructor() {
        this.options = new options();
        this.program = new program();
        this.path = Path;
    }
    async createEvents() {
        this.eventHandler = new eventHandler();
        this.eventHandler.construct();
    }
    async run(path) {
        var dec = `var PATH=new System.path('${path}');`;
        return eval(dec + "\n" + await SystemFileSystem.getFileString(path));
    }
}
class Path {
    constructor(path) {
        this.path = path
    }
    sections() {
        return this.path.split("/");
    }
    file() {
        return this.sections()[this.sections.length - 1]
    }
    folder() {
        return this.sections().slice(0, -1).join("/");
    }
}
class program {
    constructor() {
        this.programRegister = {};
        this.default = standardProg;
    }
    async runProgram(path) {
        return await this.runProgramString(await SystemFileSystem.getFileString(path), path)
    }
    async runProgramString(dat, path) {
        if (path == undefined) {
            path = "c";
        }
        var r = await eval(dat)
        var id = this.findFreeId();

        this.programRegister[id] = r;
        r.id = id;
        r.PATH = path;
        r.init();
    }
    /**
     * 
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
    stop(id) {
        this.programRegister[id].isStopping();
        delete this.programRegister[id]
    }
}

class standardProg {
    constructor() {
        this.id = -1;
        this.path = "c/programs/"
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
     * @returns {{string:*}} dict of the values of the option
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
        console.log(d)
        if (d[name] == undefined || overwrite == true) {
            d[name] = data;
            await SystemFileSystem.setFileString("c/sys/options/" + option + ".json", JSON.stringify(d))
            return true;
        } else {
            return false;
        }
    }
}

class eventHandler {
    constructor() {
        this.lifeMakerVars = {}
        this.handlers = {}
    }
    async construct() {
        this.replacementEvents = await System.options.get("eventReplacements");
        this.replacementEventsK = Object.keys(this.replacementEvents);

        this.shouldPrevent = await System.options.get("events");
        this.events = Object.keys(await System.options.get("events"));
        for (var x of this.events) {
            document.addEventListener(x, this.event);
            this.handlers[x] = []
        }
    }
    /**
     * 
     * @param {string} type 
     * @param {(event:Event)=>undefined | true} handler if return true: all further event's get canceld
     */
    addEventHandler(type, handler, vars) {
        if (this.events.includes(type)) {
            this.handlers[type].push([handler, vars]);
            return true;
        } else {
            console.warn("event " + type + "doesn't seem to exist!");
            return false;
        }
    }
    /**
     * handles every event that exists3
     * @param {Event} event 
     */
    event(event, type, replacement) {
        //special fonctions to make life easyer for mobile
        if (event.type == "touchmove" && event.movementX == undefined) {
            if (System.eventHandler.lifeMakerVars["mox"] == null) {
                System.eventHandler.lifeMakerVars["mox"] = event.touches[0].pageX;
                System.eventHandler.lifeMakerVars["moy"] = event.touches[0].pageY;
                event.movementX = 0;
                event.movementY = 0;
            } else {
                event.movementX = event.touches[0].pageX - System.eventHandler.lifeMakerVars["mox"];
                event.movementY = event.touches[0].pageY - System.eventHandler.lifeMakerVars["moy"];
                System.eventHandler.lifeMakerVars["mox"] = event.touches[0].pageX;
                System.eventHandler.lifeMakerVars["moy"] = event.touches[0].pageY;
            }
        }
        if (event.type == "touchend") {
            System.eventHandler.lifeMakerVars["mox"] = null;
        }

        if (replacement == undefined) { replacement = false; }
        if (type == undefined) { type = event.type }
        if (System.eventHandler.shouldPrevent[type]) {
            if (event.cancelable) {
                event.preventDefault();
            }
        }
        //console.log(type);
        for (var x of System.eventHandler.handlers[type]) {
            var r = x[0](event, x[1]);
            if (r == true) {
                console.log("canceld");
                return;
            }
        }

        if (System.eventHandler.replacementEventsK.includes(event.type) && replacement == false) {
            System.eventHandler.event(event, System.eventHandler.replacementEvents[event.type], true);
        }
    }
}

var s = new sys();
System = s;
