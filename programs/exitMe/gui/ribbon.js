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

        var poses = [];
        var c = {};
        for (var x of this.topRibbons) {
            var f = await System.run(this.PATH.folder() + "/ribbon/" + x,);
            this.classes[f.getName()] = f

            var p = f.getPos();
            poses.push(p);
            if (c[p] == undefined) {
                c[p] = [];
            }
            c[p].push(f.getName());
        }

        poses = poses.sort((a, b) => {
            return a - b;
        });

        var i = 0;
        for (var x of poses) {
            for (var y of c[x]) {
                var f = this.classes[y];

                var r = document.createElement("button");
                r.setAttribute("element", "ribbonTop");
                r.setAttribute("index", i);
                r.onclick = ((i) => {
                    this.select(i);
                }).bind(this, i);
                r.innerText = f.getName();

                tel.appendChild(r);
                i++;
            }
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

        var el = document.createElement("div");
        el.setAttribute("element", "toolSelectElement");
        bel.append(el)

        var functions = this.classes[name].getFunctions(this.currentELement);

        for (var x of Object.keys(functions)) {
            var r;
            if (x.startsWith("_separator")) {
                r = document.createElement("div");
                r.setAttribute("element", "seperator")

                bel.append(r);

                el = document.createElement("div");
                el.setAttribute("element", "toolSelectElement");
                bel.append(el)
                continue;
            } else if (x.startsWith("_descriptor")) {
                r = document.createElement("p");
                r.setAttribute("element", "descriptor");
                r.innerText = functions[x];
            }
            else if (functions[x].type == "button") {
                r = document.createElement("button");
                r.setAttribute("element", "ribbonBottom");
                r.onclick = functions[x].change.bind(this, this.editor);
                r.innerText = x;
            }
            else if (functions[x].type == "select") {
                r = document.createElement("select");
                r.setAttribute("element", "ribbonBottom");
                r.onchange = functions[x].change.bind(this, this.editor, r);
                r.selectedOptions = functions[x].get(this);
                for (var y of functions[x].options) {
                    var o = document.createElement("option");
                    o.innerText = y;
                    r.appendChild(o);
                }
            }
            else if (functions[x].type == "color") {
                var current = functions[x].get(this);
                r = document.createElement("div");
                var i = document.createElement("input");
                i.setAttribute("element", "ribbonBottom");
                i.setAttribute("type", "color");
                i.value = current.substring(0, 7);


                var alpha = document.createElement("input");
                alpha.setAttribute("element", "ribbonBottom");
                alpha.setAttribute("type", "range");
                alpha.setAttribute("min", "0");
                alpha.setAttribute("max", "1");
                alpha.setAttribute("step", "0.01");
                alpha.value = parseInt(current.substring(7, 9), 16) / 255;


                i.onchange = ((f, i, alpha) => {
                    var color = i.value;
                    var opacity = alpha.value;
                    opacity = Math.round(opacity * 255).toString(16);
                    if (opacity.length == 1)
                        opacity = "0" + opacity;
                    var rgbaCol = '#' + color.slice(-6, -4) + color.slice(-4, -2) + color.slice(-2) + opacity;
                    f.change.bind(this, this.editor, rgbaCol)();
                }).bind(this, functions[x], i, alpha);
                alpha.onchange = i.onchange;

                r.appendChild(i);

                if (functions[x].noalpha != true) {
                    r.appendChild(alpha);
                }
            }
            else if (functions[x].type == "number") {
                r = document.createElement("input");
                r.setAttribute("element", "ribbonBottom");
                r.setAttribute("type", "number");
                r.value = functions[x].get(this);
                r.onchange = functions[x].change.bind(this, this.editor, r);
            }
            else if (functions[x].type == "text") {
                r = document.createElement("input");
                r.setAttribute("element", "ribbonBottom");
                r.setAttribute("type", "text");
                r.value = functions[x].get(this);
                r.onchange = functions[x].change.bind(this, this.editor, r);
            }
            else if (functions[x].type == "checkbox") {
                var inp = document.createElement("input");
                inp.setAttribute("element", "ribbonBottom");
                inp.setAttribute("type", "checkbox");
                inp.checked = functions[x].get(this);
                inp.onchange = functions[x].change.bind(this, this.editor, inp);

                r = document.createElement("div");
                r.appendChild(inp);
                r.appendChild(document.createTextNode(x));
            }
            else if (functions[x].type == "file") {
                r = document.createElement("button");
                r.setAttribute("element", "ribbonBottom");
                r.onclick = (async (x) => {
                    var f = await SystemHtml.WindowHandler.presets.createFileSelect("Select an image File");
                    if (f != undefined) {
                        functions[x].change.bind(this)(this.editor, f);
                    } else {
                    }
                }).bind(this, x);
                r.innerText = x;
            }
            else if (functions[x].type == "stringAsk") {
                r = document.createElement("button");
                r.setAttribute("element", "ribbonBottom");
                r.onclick = (async (x) => {
                    var f = await SystemHtml.WindowHandler.presets.createStringSelect("URL", "Enter the URL of the image");
                    if (f != undefined) {
                        functions[x].change.bind(this)(this.editor, f);
                    } else {
                    }
                }).bind(this, x);
                r.innerText = x;
            }
            el.append(r);
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