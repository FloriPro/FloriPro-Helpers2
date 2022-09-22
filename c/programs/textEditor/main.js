class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init(file) {
        this.button1Clicks = 0;
        this.windowUserCanResize = true;
        this.windowShowTitle = false;


        console.log("started as id " + this.id);
        this.window = await SystemHtml.WindowHandler.createWindow("Text editor",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(450, 500)
                await this.window.size.userCanResize(false)
                await this.loadPrism()

                if (file != undefined) {
                    (await this.window.getHtmlElement("fileName")).innerText = file;
                    this.window.getHtml().querySelector("#editing").value = (await SystemFileSystem.getFileString(file)).replace("\r\n","\n");
                    this.window.getHtml().querySelector("#editing").oninput()
                }

            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }
    async loadPrism() {
        var styleSheet = document.createElement("style")
        styleSheet.innerText = await SystemFileSystem.getFileString("c/programs/textEditor/text/prism.css")
        document.head.appendChild(styleSheet)
        var styleSheet = document.createElement("style")
        styleSheet.innerText = await SystemFileSystem.getFileString("c/programs/textEditor/text/prism2.css")
        document.head.appendChild(styleSheet)

        try {
            eval(await SystemFileSystem.getFileString("c/programs/textEditor/text/prism.js"))
            //eval(await getFile("c/programs/text/prismaddon.js"))
        } catch (e) {
            console.error(e);
        }
        Prism.highlightElement(this.window.getHtml().querySelector('.highlighting-content'));
    }
}
new program();