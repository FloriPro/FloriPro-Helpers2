class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.button1Clicks = 0;
        this.windowUserCanResize = true;
        this.windowShowTitle = false;

        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("test",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(200, 300)
                await this.window.size.userCanResize(false)



                //add event listeners
                await this.window.addHtmlEventListener("click", "button1", this.button1, this)
                await this.window.addHtmlEventListener("click", "button2", () => { this.window.size.userCanResize(this.windowUserCanResize); this.windowUserCanResize = !this.windowUserCanResize; }, this);
                await this.window.addHtmlEventListener("click", "button3", () => { this.window.appearence.showTitle(this.windowShowTitle); this.windowShowTitle = !this.windowShowTitle; }, this);
                await this.window.addHtmlEventListener("click", "button4", () => { this.window.size.setfullMax() }, this);
                await this.window.addHtmlEventListener("click", "button5", () => { this.window.size.notMax() }, this);
                await this.window.addHtmlEventListener("click", "button6", () => { this.window.size.setMax() }, this);

                var exHere = await this.window.getHtmlElement("exHere")
                exHere.contextscript = () => { return { "test2": this.test2, "test3": this.test3 } };

            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async button1() {
        this.button1Clicks = this.button1Clicks + 1;
        var e = await this.window.getHtmlElement("button1return")
        e.innerText = "" + this.button1Clicks;
        console.log("button1 pressed!");
    }
    test2() {
        alert("2")
    }
    test3() {
        alert("3")
    }
}
new program();