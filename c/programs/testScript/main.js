class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        console.log("started as id " + this.id);
        this.window = await SystemHtml.WindowHandler.createWindow("test");
        this.window.close = () => { 
            this.stop()
            return true
        }
    }
}
new program();