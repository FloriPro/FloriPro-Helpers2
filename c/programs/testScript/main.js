class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        console.log("started as id " + this.id);
        this.window = await SystemHtml.WindowHandler.createWindow("test",
            async () => {
                console.log("ready")
                console.log(this);
                await this.window.setContent(`<p>hi</p><script>document.addEventListener("click",()=>{console.log("click")})</script>`);
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
}
new program();