class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.cloudData = [];
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Word Cloud",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo("c/programs/wordcloud/logo.webp")

                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(400, 400);
                this.window.size.userCanResize(true);

                this.anychartContainerId = System.makeid(10);
                (await this.window.getHtmlElement("container")).id = this.anychartContainerId;

                await System.getLib("anychart");

                //context menu for word cloud to download image
                (await this.window.getHtmlElement("container")).contextscript = () => {
                    return {
                        "Download image": async () => {
                            await this.chart.saveAsPng();
                        }
                    }
                }

                this.loadAnyChart();
            });
        this.window.close = () => {
            this.stop()
            return true
        }

        /**
         * @type {HtmlWindow}
         */
        this.datawindow = await SystemHtml.WindowHandler.createWindow("Data input",
            //onready:
            async () => {
                //set html
                await this.datawindow.appearence.setLogo("c/programs/wordcloud/logo.webp")

                await this.datawindow.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/dataWindow.html"));
                await this.datawindow.size.setSize(400, 400);
                this.datawindow.size.userCanResize(true);

                this.datawindow.addHtmlEventListener("onclick", "addElement", async () => {
                    //get data from inputs
                    var wordToAdd = (await this.datawindow.getHtmlElement("wordToAdd")).value;
                    var wordSize = (await this.datawindow.getHtmlElement("wordSize")).value;

                    if (wordToAdd == "" || wordSize == "") {
                        return;
                    }

                    //add data to html element "allElements
                    var allElements = (await this.datawindow.getHtmlElement("allElements"));
                    var p = document.createElement("p");
                    p.innerText = wordToAdd + " - " + wordSize;
                    var span = document.createElement("span");
                    span.innerText = " X";
                    var xid = System.makeid(10);
                    span.setAttribute("element", "X_Remover_" + xid);
                    p.appendChild(span);

                    allElements.appendChild(p);
                    allElements.appendChild(document.createElement("br"));

                    await this.datawindow.parseNewHtml();
                    this.datawindow.addHtmlEventListener("onclick", "X_Remover_" + xid, this.xRmove, this);

                    //add data to array
                    this.cloudData.push({ "x": wordToAdd.toLowerCase(), "value": parseInt(wordSize) });
                    this.loadData(this.cloudData);

                    //clear inputs
                    (await this.datawindow.getHtmlElement("wordToAdd")).value = "";
                    (await this.datawindow.getHtmlElement("wordSize")).value = "";

                    //focus on wordToAdd
                    (await this.datawindow.getHtmlElement("wordToAdd")).focus();
                }, this);
            });
        this.datawindow.close = () => {
            return true;
        }
    }

    async xRmove(_, __, ___, e) {
        var p = e.target.parentElement;
        var text = p.innerText;
        var word = text.split(" - ")[0];
        var size = text.split(" - ")[1].split(" X")[0];

        //remove from array
        this.cloudData = this.cloudData.filter((e) => {
            return e.x != word || e.value != size;
        });
        this.loadData(this.cloudData);

        //remove from html
        p.remove();
        e.target.remove();
    }

    async loadAnyChart() {
        this.chart = anychart.tagCloud();

        this.chart.angles([0])
        this.chart.colorRange(false);
        this.chart.container(this.anychartContainerId);
        this.chart.draw();
    }

    async loadData(data) {
        this.chart.data([]);
        this.chart.data(data);
        this.chart.draw();
    }
}
new program();