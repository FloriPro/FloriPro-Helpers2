class exitMe_gui_projectEditor_util {
    /**
     * @param {{[id:string]:exitMe_gui_projectEditor_element}} elements
     * @returns {number}
     */
    getLayerMax(elements) {
        var max = -1;
        for (var x of Object.values(elements)) {
            if (x.layer > max) {
                max = x.layer;
            }
        }
        return max;
    }

    /**
     * sorts elements by layer
     * @param {exitMe_gui_projectEditor_element[]} elements 
     * @returns {exitMe_gui_projectEditor_element[]}
     */
    sortLayers(elements) {
        return elements.sort((a, b) => {
            return a.layer - b.layer;
        });
    }

    /**
     * @param {{[id:string]:exitMe_gui_projectEditor_element}} elements
     * @param {string} id
     * @param {number} layer
     * @returns {{[id:string]:exitMe_gui_projectEditor_element}}
     */
    setLayer(elements, id, layer) {
        for (var x of Object.keys(elements)) {
            if (elements[x].layer >= layer) {
                elements[x].layer++;
            }
        }
        elements[id].layer = layer;
        return elements;
    }

    /**
     * makes sure that the layers arent spaced out
     * @param {{[id:string]:exitMe_gui_projectEditor_element}} elements 
     * @returns {{[id:string]:exitMe_gui_projectEditor_element}}
     */
    capLayers(elements) {
        var layers = [];
        var e = {};
        for (var x of Object.values(elements)) {
            layers.push(x.layer);
            e[x.layer] = x.id;
        }

        layers.sort((a, b) => {
            return a - b;
        });

        var i = 0;
        for (var x of layers) {
            elements[e[x]].layer = i;
            i++;
        }
        return elements;
    }
    detectCollisions(elements) {
        var layers = [];
        for (var x of Object.values(elements)) {
            if (layers.includes(x.layer)) {
                console.warn("collision detected");
                console.log(x);
                return true;
            }

            layers.push(x.layer);
        }

        return false;
    }
}
new exitMe_gui_projectEditor_util();