class sys {
    constructor() {
        this.options = new options();
        this.program = new program();
    }
    async createEvents() {
        this.eventHandler = new eventHandler();
        this.eventHandler.construct();
    }
    async run(path) {
        return eval(await SystemFileSystem.getFileString(path));
    }
}
class program {
    constructor() {
        this.programRegister = {};
        this.default = standardProg;
    }
    async runProgram(path) {
        return await this.runProgramString(await SystemFileSystem.getFileString(path))
    }
    async runProgramString(dat) {
        var r = await eval(dat)
        var id = this.findFreeId();

        this.programRegister[id] = r;
        r.id = id;
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
        this.handlers = {}
    }
    async construct() {
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
    event(event) {
        if (System.eventHandler.shouldPrevent[event.type]) {
            event.preventDefault();
        }
        //console.log(event.type);
        for (var x of System.eventHandler.handlers[event.type]) {
            var r = x[0](event, x[1]);
            if (r == true) {
                console.log("canceld");
                return;
            }
        }
    }
}

var s = new sys();
System = s;
