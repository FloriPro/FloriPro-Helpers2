new (class {
    constructor() {
    }
    getName() {
        return "file";
    }
    getPos() {
        return 0;
    }
    getFunctions() {
        return {
            "saveProject": { "type": "button", "change": this.saveProject.bind(this) },
            "closeProject": { "type": "button", "change": this.closeProject },
            "export to file": { "type": "button", "change": this.exportToFile.bind(this) },
            "_separator": "",
            "pixel ratio": { "type": "text", "change": this.setPixelRatio.bind(this), "get": this.getPixelRatio }
        }
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     */
    async saveProject(editor) {
        var x = this.generateSaveFile(editor);
        SystemFileSystem.setFileString(editor.projectPath, JSON.stringify(x));
    }
    async exportToFile(editor) {
        var x = this.generateSaveFile(editor);
        var out = {
            "FENSTERGRÖSSE": [x.pixelRatio.split(":")],
            "HITBOXES": [],
            "ENEMYSSPAWN": [],
            "IMAGEPATHS": [
                ["background", "maps/map1/background.jpg"],
                ["foreground", "maps/map1/foreground.png"]
            ]
        }
        console.log(x);
        console.log(x.pages[0].elements);
        for (var y of x.pages[0].elements) {
            if (y.type == "hitbox") {
                out.HITBOXES.push([y.pos.x, y.pos.y, y.size.width, y.size.height, y.data]);
            }
            if (y.type == "enemySpawn") {
                out.ENEMYSSPAWN.push([y.pos.x + 5, y.pos.y + 5, y.data.spawnTimeout, y.data.type]);
            }
        };

        //gen to data
        var outstr = "";
        for (var x in out) {
            outstr += "#" + x + "\n";
            for (var y of out[x]) {
                outstr += y.join(",") + "\n";
            }
            outstr += "\n";
        }

        console.log(outstr);

        //download with standard html download
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outstr));
        element.setAttribute('download', "map.txt");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     */
    async closeProject(editor) {
        editor.gui.show("projectChoose");
    }

    /**
     * 
     * @param {exitMe_gui_projectEditor} editor
     */
    generateSaveFile(editor) {
        return editor.saveFile;
    }

    /**
     * @param {exitMe_gui_projectEditor} editor
     */
    setPixelRatio(editor, element) {
        editor.gui.project.pixelRatio = element.value;
        editor.gui.loadProjectSettings();
    }
    /**
     * @param {exitMe_gui_ribbon} ribbon
     */
    getPixelRatio(ribbon) {
        return ribbon.editor.gui.project.pixelRatio;
    }
})();