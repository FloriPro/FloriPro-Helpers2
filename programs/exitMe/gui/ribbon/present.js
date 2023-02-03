new (class {
    constructor() {
    }
    getName() {
        return "Present";
    }
    getPos() {
        return 40;
    }
    getFunctions() {
        return {
            "start": { "type": "button", "change": this.start },
        }
    }
    start() {

    }
})();