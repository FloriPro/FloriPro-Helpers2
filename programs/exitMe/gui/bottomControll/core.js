new (class {
    getElements(gui) {
        return [
            {
                type: "slider",
                get: this.getZoom.bind(this),
                change: this.setZoom.bind(this),
                name: "Zoom",
                min: 0.1,
                max: 3,
            }
        ]
    }

    /**
     * @param {exitMe_gui_projectEditor} editor 
     */
    getZoom(editor) {
        return editor.zoom;
    }

    /**
     * @param {exitMe_gui_projectEditor} editor 
     */
    setZoom(editor, value) {
        editor.zoom = value;
        editor.applyZoom();
    }
})();