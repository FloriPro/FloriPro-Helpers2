class exitMe_gui_ribbon extends System.program.default {
    /** 
     * @param {[HtmlWindow, exitMe_gui_projectEditor]} args
     */
    async init(args) {
        this.window = args[0];
        this.editor = args[1];

        this.currentELement = null;
    }

    async loadRibbons() {
        this.topRibbons = await SystemFileSystem.getFiles(this.PATH.folder() + "/ribbon");
        this.classes = {};
        var tel = await this.window.getHtmlElement("topBar");
        tel.innerHTML = "";

        for (var x of this.topRibbons) {
            var f = await System.run(this.PATH.folder() + "/ribbon/" + x,);
            this.classes[f.getName()] = f

            var r = document.createElement("button");
            r.setAttribute("element", "ribbonTop");
            r.setAttribute("index", this.topRibbons.indexOf(x));
            r.onclick = ((i) => {
                this.select(i);
            }).bind(this, this.topRibbons.indexOf(x));
            r.innerText = f.getName();

            tel.appendChild(r);
        }

        this.window.parseNewHtml();

        this.select(0);
    }

    setElement(element) {
        this.currentELement = element;
        this.loadBottomRibbons(this.selectedRibbon.innerText);
    }

    async loadBottomRibbons(name) {
        var bel = await this.window.getHtmlElement("toolSelect");
        bel.innerHTML = "";

        var functions = this.classes[name].getFunctions(this.currentELement);

        for (var x of Object.keys(functions)) {
            var r;
            if (functions[x].type == "button") {
                r = document.createElement("button");
                r.setAttribute("element", "ribbonBottom");
                r.onclick = functions[x].change.bind(this, this.editor);
                r.innerText = x;
            }
            else if (functions[x].type == "select") {
                r = document.createElement("select");
                r.setAttribute("element", "ribbonBottom");
                r.onchange = functions[x].change.bind(this, this.editor, r);
                r.selectedOptions = functions[x].get();
                for (var y of functions[x].options) {
                    var o = document.createElement("option");
                    o.innerText = y;
                    r.appendChild(o);
                }
            }
            else if (functions[x].type == "color") {
                r = document.createElement("input");
                r.setAttribute("element", "ribbonBottom");
                r.setAttribute("type", "color");
                r.set
                r.value = functions[x].get();
                r.onchange = functions[x].change.bind(this, this.editor, r);
            }
            else if (functions[x].type == "number") {
                r = document.createElement("input");
                r.setAttribute("element", "ribbonBottom");
                r.setAttribute("type", "number");
                r.value = functions[x].get();
                r.onchange = functions[x].change.bind(this, this.editor, r);
            }
            else if (functions[x].type == "text") {
                r = document.createElement("input");
                r.setAttribute("element", "ribbonBottom");
                r.setAttribute("type", "text");
                r.value = functions[x].get();
                r.onchange = functions[x].change.bind(this, this.editor, r);
            }
            else if (functions[x].type == "checkbox") {
                r = document.createElement("input");
                r.setAttribute("element", "ribbonBottom");
                r.setAttribute("type", "checkbox");
                r.checked = functions[x].get();
                r.onchange = functions[x].change.bind(this, this.editor, r);
            }

            bel.append(r);
            //var r = this.getRibbonBottomElement(x, this.functions[name][x].bind(this, this.editor))
            //bel.appendChild(r);
        }
        this.window.parseNewHtml();
    }


    async select(index) {
        if (this.selectedRibbon != undefined) {
            this.selectedRibbon.removeAttribute("selected");
        }
        this.selectedRibbon = this.window.getHtml().querySelector(`[windowelement="ribbonTop"][index="${index}"]`);
        this.selectedRibbon.setAttribute("selected", "");
        this.selectedRibbon.style.display = "";

        this.loadBottomRibbons(this.selectedRibbon.innerText);
    }
}

new exitMe_gui_ribbon();