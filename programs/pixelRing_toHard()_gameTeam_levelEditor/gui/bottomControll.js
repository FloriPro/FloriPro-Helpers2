class exitMe_gui_bottomControll extends System.program.default {
    /**
     * 
     * @param {[HtmlWindow, exitMe_gui]} param0 
     */
    async init([window, gui]) {
        this.window = window;
        this.gui = gui;
        this.programs = [];

        this.bar = await this.window.getHtmlElement("bottomControll");
        this.loadBar();

        this.setInterval(this.updateInfos.bind(this), 500);
    }

    async loadBar() {
        this.bar.innerHTML = "";

        var i = 0;
        var scripts = await SystemFileSystem.getFiles(this.PATH.folder() + "/bottomControll");
        for (var x of scripts) {
            var prog = await System.run(this.PATH.folder() + "/bottomControll/" + x);
            this.programs.push(prog);
            var elements = await prog.getElements(this.gui);

            for (var element of elements) {
                var div = document.createElement("div");
                div.className = "bottomControllElement";

                var label = document.createElement("label");
                label.innerHTML = element.name;
                div.appendChild(label);

                var input;
                if (element.type == "slider") {
                    input = document.createElement("input");
                    input.type = "range";
                    input.min = element.min;
                    input.max = element.max;
                    input.step = element.step || 0.01;
                    input.setAttribute("bottomcontroller", i)
                    input.value = await element.get(this.gui);
                    input.oninput = async () => {
                        await element.change(this.gui, input.value);
                    }
                }

                div.appendChild(input);
                this.bar.appendChild(div);
                i++;
            }
        }
    }

    async updateInfos() {
        var i = 0;
        for (var x of this.programs) {
            var elements = await x.getElements(this.gui);
            for (var element of elements) {
                if (element.type == "slider") {
                    var input = this.bar.querySelector("[bottomcontroller='" + i + "']");
                    input.value = await element.get(this.gui);
                }
                i++;
            }
        }
    }
}
new exitMe_gui_bottomControll();