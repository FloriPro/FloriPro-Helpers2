class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Information",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/information.html"));
                await this.window.size.setSize(200, 300);
                this.window.size.userCanResize(true);

                (await this.window.getHtmlElement("version")).innerText = VERSION;
                (await this.window.getHtmlElement("hasUpdated")).innerText = "";

                this.howToUseList = await this.window.getHtmlElement("howToUseList");
                this.howToUse = await SystemFileSystem.getFileJson(this.PATH.folder() + "/howToUse.json");
                for (var x of Object.keys(this.howToUse)) {
                    var b = document.createElement("button");
                    b.innerText = x;
                    b.setAttribute("element", x);
                    this.howToUseList.append(b)
                }
                await this.window.parseNewHtml();
                for (var x of Object.keys(this.howToUse)) {
                    await this.window.addHtmlEventListener("onclick", x, (e) => {
                        this.specificInfo(this.howToUse[e]);
                    }, this, x)
                }
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async specificInfo(data) {
        new class {
            /**
             * 
             * @param {{[a:any]:string}} data 
             */
            constructor(data) {
                this.data = data;
                this.init();
            }
            async init() {
                /**
                 * @type {HtmlWindow}
                 */
                this.window = await SystemHtml.WindowHandler.createWindow("Information",
                    //onready:
                    async () => {
                        //set html
                        await this.window.setContent(`<div element="data"></div>`);
                        await this.window.size.setSize(300, 500)
                        this.window.size.userCanResize(true)

                        var e = await this.window.getHtmlElement("data");
                        for (var x of this.data) {
                            if (x.type == "header") {
                                var el = document.createElement("p");
                                el.innerText = x.text;
                                el.style.fontWeight = "bold";
                                e.append(el);
                            }
                            else if (x.type == "text") {
                                var el = document.createElement("p");
                                el.innerText = x.text;
                                e.append(el);
                            }
                            else if (x.type == "image") {
                                var el = document.createElement("img");
                                el.style.maxWidth = "100%";
                                el.style.width = "300px";
                                el.style.minHeight = "10px";
                                el.style.backgroundColor = "aqua";
                                e.append(el);
                                var d = async (el, x) => {
                                    el.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString(x.path));

                                }
                                d(el, x);
                            }
                        }
                    });
                this.window.close = () => {
                    return true;
                }
            }
        }(data)
    }
}
new program();