new (class {
    constructor() {
    }
    getName() {
        return "file";
    }
    getFunctions() {
        return {
            "saveProject": { "type": "button", "change": this.saveProject },
            "saveProjectAs": { "type": "button", "change": this.saveProjectAs },
            "closeProject": { "type": "button", "change": this.closeProject },
            "exit": { "type": "button", "change": this.exit }
        }
    }
    async saveProject() {
        console.warn("saveProject not implemented");
    }
    async saveProjectAs() {
        console.warn("saveProjectAs not implemented");
    }
    async closeProject() {
        console.warn("closeProject not implemented");
    }
    async exit() {
        console.warn("exit not implemented");
    }
})();