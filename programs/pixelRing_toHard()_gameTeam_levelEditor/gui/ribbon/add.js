new (class {
    constructor() {
    }
    getName() {
        return "Elements";
    }
    getPos() {
        return 30;
    }
    getFunctions() {
        return {
            "Hitbox": { "type": "button", "change": this.hitbox },
            "Enemy Spawn": { "type": "button", "change": this.enemySpawn },
        }
    }
    /**
     * 
     * @param {exitMe_gui_projectEditor} editor 
     */
    async hitbox(editor) {
        editor.createElement({
            "type": "hitbox",
            "data": "World",
            "pos": {
                x: 10,
                y: 10
            },
            "size": {
                "width": 100,
                "height": 100
            },
            "styling": {
                "backgroundColor": "#00ff00",
            }
        });
    }

    /**
     * 
     * @param {exitMe_gui_projectEditor} editor
     */
    async enemySpawn(editor) {
        editor.createElement({
            "type": "enemySpawn",
            "data": {
                "spawnTimeout": 3,
                "type": "0"
            },
            "pos": {
                x: 10,
                y: 10
            },
            "size": {
                "width": 10,
                "height": 10
            },
            "styling": {
                "backgroundColor": "#ff0000"
            },
            "noResize": true,
        });
    }
})();