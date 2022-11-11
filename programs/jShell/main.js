class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.button1Clicks = 0;
        this.windowUserCanResize = true;
        this.windowShowTitle = false;

        console.log("started as id " + this.id);
        /**
         * @type HtmlWindow
         */
        this.window = await SystemHtml.WindowHandler.createWindow("jShell",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(500, 300);
                await this.window.size.userCanResize(true);

                await this.window.addHtmlEventListener("onkeyup", "consoleInput", (_, __, ___, event) => {
                    //console.log(event);
                    if (event.keyCode == 13) {
                        console.log('JShell>' + event.target.value);
                        try {
                            var r = eval(event.target.value);
                            if (r == undefined) {
                                console.debug('> undefined');
                            } else {
                                console.log('> ' + r);
                            };
                        } catch (e) {
                            console.error(e);
                        }
                        event.target.value = '';
                    }
                }, this, undefined);
                this.consoleEventId = System.console.addListener((dat, self) => { self.update(dat); }, this);

                for (var x of System.console.get()) {
                    this.update(x);
                }
            });
        this.window.close = () => {
            try {
                System.console.removeListener(this.consoleEventId);
            } catch {
                console.error("could not stop listener!");
            }
            this.stop();
            return true
        }

    }
    async update(dat) {
        var color = "white"
        switch (dat[0]) {
            case "debug":
                color = "gray";
                break;

            case "info":
            case "log":
                color = "white";
                break;

            case "warn":
                color = "rgb(222, 167, 0)";
                break;

            case "error":
                color = "rgb(255, 0, 0)";
                break;

            default:
                break;
        }
        var p = document.createElement("p");
        p.style.color = color;


        p.innerText = dat[1];
        (await this.window.getHtmlElement("consoleLog")).prepend(p);
    }
}
new program();