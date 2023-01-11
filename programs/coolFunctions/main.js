class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.charts = [];
        this.sysargs = {};

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
                    b.onclick = this.addChart.bind(this, name);
                    select.append(b);
                }

                await this.window.addHtmlEventListener("click", "back", async () => {
                    (await this.window.getHtmlElement("select")).style.display = "";
                    (await this.window.getHtmlElement("draw")).style.display = "none";
                    this.charts = [];
                    this.sysargs = {};
                });
                await this.window.addHtmlEventListener("click", "addchart", async () => {
                    (await this.window.getHtmlElement("select")).style.display = "";
                    (await this.window.getHtmlElement("draw")).style.display = "none";
                });

                await System.getLib("chartjs");
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async randomColor() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    async addChart(name) {
        var c = await System.run("c/programs/coolFunctions/functions/" + name + ".js");
        var functio = new c();

        var information = functio.get();

        var args = [];
        for (var x of information.arguments) {
            console.log(x.name);
            console.log(this.sysargs);
            if (this.sysargs[x.name] != undefined) {
                args.push(this.sysargs[x.name]);
                continue;
            }
            if (x.type == "number") {
                args.push(await SystemHtml.WindowHandler.presets.createNumSelect("Argument " + x.name, x.name));
            }

            if (x.name == "start" || x.name == "length") {
                this.sysargs[x.name] = args[args.length - 1];
            }
        }

        console.log(args);

        var data = functio.run(...args);

        var dat = []
        var lab = [];

        for (var x of data) {
            dat.push(x.data);
            lab.push(x.label);
        }


        this.charts.push({
            label: information.title,
            data: dat,
            fill: false,
            tension: 0.0,
            borderColor: await this.randomColor(),
        })

        this.loadChart(lab, information.type);
    }

    async loadChart(labels, type) {
        if (this.currentChart != undefined)
            this.currentChart.destroy();

        this.currentChart = new Chart(await this.window.getHtmlElement("myChart"), {
            type: type,
            data: {
                labels: labels,
                datasets: this.charts
            },
            responsive: true,
            maintainAspectRatio: false
        });

        (await this.window.getHtmlElement("select")).style.display = "none";
        (await this.window.getHtmlElement("draw")).style.display = "";
    }
}
new program();