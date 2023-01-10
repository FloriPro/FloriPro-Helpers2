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
        this.window = await SystemHtml.WindowHandler.createWindow("Cool Functions",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setSize(300, 200)
                this.window.size.userCanResize(true)

                //load charts
                var select = await this.window.getHtmlElement("select");
                var files = await SystemFileSystem.getFiles(this.PATH.folder() + "/functions");
                for (var x of files) {
                    var name = x.split(".")[0];

                    var b = document.createElement("button");
                    b.innerText = name;
                    b.onclick = this.openChart.bind(this, name);
                    select.append(b);
                }

                await this.window.addHtmlEventListener("click", "back", async () => {
                    (await this.window.getHtmlElement("select")).style.display = "";
                    (await this.window.getHtmlElement("draw")).style.display = "none";
                })

                await System.getLib("chartjs");
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async openChart(name) {
        var c = await System.run("c/programs/coolFunctions/functions/" + name + ".js");
        var functio = new c();

        var information = functio.get();

        var args = [];
        for (var x of information.arguments) {
            if (x.type == "number") {
                args.push(await SystemHtml.WindowHandler.presets.createNumSelect("Argument " + x.name, x.name));
            }
        }

        var data = functio.run(...args);

        var dat = []
        var lab = [];

        for (var x of data) {
            dat.push(x.data);
            lab.push(x.label);
        }

        this.loadChart(lab, dat, information.title, information.type);
    }

    async loadChart(labels, data, title, type) {
        if (this.currentChart != undefined)
            this.currentChart.destroy();

        this.currentChart = new Chart(await this.window.getHtmlElement("myChart"), {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.0
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        });

        (await this.window.getHtmlElement("select")).style.display = "none";
        (await this.window.getHtmlElement("draw")).style.display = "";
    }
}
new program();