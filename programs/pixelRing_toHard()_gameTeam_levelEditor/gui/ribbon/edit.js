new (class {
    constructor() {
        this.element = null;
    }
    getName() {
        return "Edit";
    }
    getPos() {
        return 20;
    }
    /**
     * @param {{type:string, data:string|any, pos:{x:number,y:number}, size:{width:number,height:number}, styling:any}} element
     */
    getFunctions(element) {
        this.element = element;

        if (element == null) {
            return {};
        }
        if (element.type == "hitbox") {
            return {
                "_descriptor": "Hitbox Type: World, Fall, NextLevel, Grace",
                "Hitbox Type": {
                    "type": "text",
                    "change": this.hitboxType.bind(this),
                    "get": this.getHitboxType.bind(this),
                },
                "_separator": "",
                "_descriptor2": "Exact Position",
                "X": {
                    "type": "number",
                    "change": this.x.bind(this),
                    "get": this.getX.bind(this),
                },
                "Y": {
                    "type": "number",
                    "change": this.y.bind(this),
                    "get": this.getY.bind(this),
                },
                "Width": {
                    "type": "number",
                    "change": this.width.bind(this),
                    "get": this.getWidth.bind(this),
                },
                "Height": {
                    "type": "number",
                    "change": this.height.bind(this),
                    "get": this.getHeight.bind(this),
                },
            }
        }
        else if (element.type == "enemySpawn") {
            return {
                "_descriptor": "Enemy Type: 0-9",
                "Enemy Type": {
                    "type": "text",
                    "change": this.enemyType.bind(this),
                    "get": this.getEnemyType.bind(this),
                },
                "_separator2": "",
                "_descriptor3": "Spawn Timeout",
                "Spawn Timeout": {
                    "type": "number",
                    "change": this.spawnTimeout.bind(this),
                    "get": this.getSpawnTimeout.bind(this),
                },
                "_separator": "",
                "_descriptor2": "Exact Position",
                "X": {
                    "type": "number",
                    "change": this.xEnemy.bind(this),
                    "get": this.getXEnemy.bind(this),
                },
                "Y": {
                    "type": "number",
                    "change": this.yEnemy.bind(this),
                    "get": this.getYEnemy.bind(this),
                }
            }
        }
        else {
            return {};
        }
    }

    getEnemyType() {
        return this.element.data.type;
    }
    enemyType(editor, el) {
        editor.elements[editor.nowEditing].data.type = el.value;
        editor.reloadElement(editor.nowEditing);
    }

    getSpawnTimeout() {
        return this.element.data.spawnTimeout;
    }
    spawnTimeout(editor, el) {
        editor.elements[editor.nowEditing].data.spawnTimeout = el.value;
        editor.reloadElement(editor.nowEditing);
    }
    getXEnemy() {
        return this.element.pos.x + 5;
    }
    xEnemy(editor, el) {
        editor.elements[editor.nowEditing].pos.x = parseInt(el.value) - 5;
        editor.reloadElement(editor.nowEditing);
        editor.setContentChanger();
    }
    getYEnemy() {
        return this.element.pos.y + 5;
    }
    yEnemy(editor, el) {
        editor.elements[editor.nowEditing].pos.y = parseInt(el.value) - 5;
        editor.reloadElement(editor.nowEditing);
        editor.setContentChanger();
    }



    getX() {
        return this.element.pos.x;
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     * @param {*} el 
     */
    x(editor, el) {
        editor.elements[editor.nowEditing].pos.x = el.value;
        editor.reloadElement(editor.nowEditing);
        editor.setContentChanger();
    }
    getY() {
        return this.element.pos.y;
    }
    y(editor, el) {
        editor.elements[editor.nowEditing].pos.y = el.value;
        editor.reloadElement(editor.nowEditing);
        editor.setContentChanger();
    }
    getWidth() {
        return this.element.size.width;
    }
    width(editor, el) {
        editor.elements[editor.nowEditing].size.width = el.value;
        editor.reloadElement(editor.nowEditing);
        editor.setContentChanger();
    }
    getHeight() {
        return this.element.size.height;
    }
    height(editor, el) {
        editor.elements[editor.nowEditing].size.height = el.value;
        editor.reloadElement(editor.nowEditing);
        editor.setContentChanger();
    }

    getHitboxType() {
        return this.element.data;
    }
    /**
     * @param {exitMe_gui_projectEditor} editor 
     * @param {HTMLInputElement} element 
     */
    hitboxType(editor, color) {
        editor.elements[editor.nowEditing].data = color.value;
        //update background color
        var types = {
            "World": "#00ff00",
            "Fall": "#ff0000",
            "NextLevel": "#0000ff",
            "Grace": "#ffff00",
            "default": "#000000",
        }
        editor.elements[editor.nowEditing].styling.backgroundColor = types[color.value] || types["default"];

        editor.reloadElement(editor.nowEditing);
    }
})();