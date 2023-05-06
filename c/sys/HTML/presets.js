class presets {
    constructor() {
    }
    /**
     * @param {string} title Title
     * @returns {Promise<string> | undefined} selected File / undefined
     */
    async createFileSelect(title) {
        var f = new fileSelectPreset()
        if (title == undefined) {
            title = "Select"
        }
        return await f.load(title);
    }
    /**
     * @param {string} title Title
     * @returns {Promise<string | undefined>} selected File / undefined
     */
    async createFileCreate(title) {
        var f = new fileCreatePreset()
        if (title == undefined) {
            title = "Select"
        }
        return await f.load(title);
    }
    /**
     * @param {string} title 
     * @returns {Promise<string | undefined>} selected Folder / undefined
     */
    createFolderSelect(title, usePromise = true) {
        var f = new folderSelectPreset()
        if (title == undefined) {
            title = "Select"
        }
        return f.load(title, usePromise);
    }
    /**
     * 
     * @param {string} title 
     * @param {string} text 
     * @returns {Promise<string | undefined>} completes, when the window is closed
     */
    async createNumSelect(title, text) {
        if (title == undefined) { title = "Select" }
        if (text == undefined) { text = "Please select" }
        var f = new numSelectPreset()
        return await f.load(title, text);
    }
    /**
     * 
     * @param {string} title
     * @param {string} text
     * @returns {Promise<loadingPreset>} completes, when the window is closed
     */
    async createLoading(title, text) {
        if (title == undefined) { title = "Loading" }
        if (text == undefined) { text = "Loading" }
        var f = new loadingPreset();
        await await f.load(title, text);
        return f;
    }
    /**
     * 
     * @param {string} title 
     * @param {string} text 
     * @returns {Promise<string | undefined>} completes, when the window is closed
     */
    async createStringSelect(title, text) {
        if (title == undefined) { title = "Select" }
        if (text == undefined) { text = "Please select" }
        var f = new stringSelectPreset()
        return await f.load(title, text);
    }
    /**
     * 
     * @param {string} title 
     * @param {string} text 
     * @returns {Promise<boolean>} completes, when the window is closed
     */
    async createConfirm(title, text) {
        if (title == undefined) { title = "Select" }
        if (text == undefined) { text = "Please select" }
        var f = new confirmPreset()
        return await f.load(title, text);
    }
    /**
     * 
     * @param {string} title 
     * @param {string} text 
     * @returns {Promise<void>} completes, when the window is closed
     */
    async createInformation(title, text) {
        if (title == undefined) { title = "Information" }
        if (text == undefined) { text = "Information" }
        var f = new informationPreset()
        return await f.load(title, text);
    }
    /**
     * creates a contextMenu (normaly when you rightclick) at the cursor, the user can easly decide, what he wants.<br>-
     * <b>It currently doesn't resolve/reject the promise, when the select is closed!</b>
     * @param {string} textYes 
     * @param {string} textNo 
     * @returns {Promise<boolean>}
     */
    async createFastConfirm(textYes, textNo) {
        return new Promise((resolve, reject) => {
            var b = {}
            b[textYes] = [() => { resolve(true); }, undefined];
            b[textNo] = [() => { resolve(false); }, undefined];
            SystemHtml.ContextMenu.showContext(b, [System.eventHandler.mouse.x - 10, System.eventHandler.mouse.y - 10]);
        });
    }

    async createSelect(title, options) {
        var f = new selectPreset()
        if (title == undefined) {
            title = "Select"
        }
        return await f.load(title, options);
    }
}

class selectPreset {
    constructor() {
    }
    async load(title, options) {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent('<div element="list"></div><hr><button element="ok">ok</button><button element="cancel">cancel</button>');

                await this.window.size.setSize(400, 200);
                this.window.size.userCanResize(true)

                //add event listeners
                await this.window.addHtmlEventListener("onclick", "cancel", () => {
                    //read data
                    this.returnFunction(undefined)

                    //close and return
                    this.window.remove()
                }, this);
                await this.window.addHtmlEventListener("onclick", "ok", async () => {
                    //read data
                    this.returnFunction(this.selected)

                    //close and return
                    this.window.remove()
                }, this);

                var list = await this.window.getHtmlElement("list");
                for (var x of options) {
                    var b = document.createElement("button");
                    b.innerText = x;
                    b.setAttribute("element", x);
                    list.append(b);

                    this.window.parseNewHtml();
                    await this.window.addHtmlEventListener("onclick", x, async (_, __, v, e) => {
                        this.selected = v;

                        for (var x of list.children) {
                            x.style.backgroundColor = "";
                        }
                        e.target.style.backgroundColor = "aqua";
                    }, this, x);
                }
            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
}

class fileSelectPreset {
    constructor() {
    }
    async load(title) {
        this.path = "c";
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent(`
                <button element="back">...</button>
                <hr>
                <div element="folderList">
                    <p>pls remove</p>
                </div>
                <div element="fileList">
                    <p>pls remove</p>
                </div>
                <hr>
                <button element="cancel">cancel</button>`);
                await this.create();

                await this.window.size.setSize(500, 300);
                await this.window.size.userCanResize(true)

            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
    async create() {
        await this.window.removeAllEventListeners();
        //add event listeners
        await this.window.addHtmlEventListener("click", "back", this.back, this)
        await this.window.addHtmlEventListener("onclick", "cancel", () => {
            //read data
            this.returnFunction(undefined)

            //close and return
            this.window.remove()
        }, this);



        var folderStuff = await this.window.getHtmlElement("folderList")
        folderStuff.innerHTML = "";
        var fileStuff = await this.window.getHtmlElement("fileList")
        fileStuff.innerHTML = "";

        var i = 0
        for (var x of await SystemFileSystem.getFolders(this.path)) {
            var b = document.createElement("button")
            b.innerText = x + "/";
            b.setAttribute("element", i + "_el")
            folderStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button1, this, [x, i])
            i++;
        }
        for (var x of await SystemFileSystem.getFiles(this.path)) {
            var b = document.createElement("button")
            b.innerText = x;
            b.setAttribute("element", i + "_el")
            fileStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button2, this, [x, i])
            i++;
        }
    }
    async button1(_, __, vars) {
        this.path += "/" + vars[0];
        this.create()
    }
    async button2(_, __, vars) {
        this.returnFunction(this.path + "/" + vars[0]);
        this.window.remove()
    }
    async back() {
        var p = this.path.split("/")
        var p = p.slice(0, -1);
        if (p.length == 0) {
            p = ["c"];
        }
        this.path = p.join("/");
        this.create()
    }
}
class fileCreatePreset {
    constructor() {
    }
    async load(title) {
        this.path = "c";
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent(`
                <button element="back">...</button>
                <hr>
                <div element="folderList">
                    <p>pls remove</p>
                </div>
                <div element="fileList">
                    <p>pls remove</p>
                </div>
                <hr>
                <input type="text" element="name" placeholder="file name"></input>
                <button element="ok">ok</button>
                <button element="cancel">cancel</button>`);
                await this.create();

                await this.window.size.setSize(500, 300);
                await this.window.size.userCanResize(true)

            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
    async create() {
        await this.window.removeAllEventListeners();
        //add event listeners
        await this.window.addHtmlEventListener("onclick", "cancel", () => {
            //read data
            this.returnFunction(undefined)

            //close and return
            this.window.remove()
        }, this);
        await this.window.addHtmlEventListener("click", "back", this.back, this)
        await this.window.addHtmlEventListener("click", "ok", this.ok, this)



        var folderStuff = await this.window.getHtmlElement("folderList")
        folderStuff.innerHTML = "";
        var fileStuff = await this.window.getHtmlElement("fileList")
        fileStuff.innerHTML = "";

        var i = 0
        for (var x of await SystemFileSystem.getFolders(this.path)) {
            var b = document.createElement("button")
            b.innerText = x + "/";
            b.setAttribute("element", i + "_el")
            folderStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button1, this, [x, i])
            i++;
        }
        for (var x of await SystemFileSystem.getFiles(this.path)) {
            var b = document.createElement("button")
            b.innerText = x;
            b.setAttribute("element", i + "_el")
            fileStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", this.button2, this, [x, i])
            i++;
        }
    }
    async ok() {
        var name = (await this.window.getHtmlElement("name")).value;

        //if file exists
        if (await SystemFileSystem.fileExists(this.path + "/" + name)) {
            if (!await SystemHtml.WindowHandler.presets.createConfirm("Overwrite", "Overwrite this file?")) {
                //cancel
                return;
            }
        }

        //return
        this.returnFunction(this.path + "/" + name);
        this.window.remove()
    }
    async button1(_, __, vars) {
        this.path += "/" + vars[0];
        this.create()
    }
    async button2(_, __, vars) {
        if (await SystemHtml.WindowHandler.presets.createConfirm("Overwrite", "Overwrite this file?")) {
            this.returnFunction(this.path + "/" + vars[0]);
            this.window.remove()
        }
    }
    async back() {
        var p = this.path.split("/")
        var p = p.slice(0, -1);
        if (p.length == 0) {
            p = ["c"];
        }
        this.path = p.join("/");
        this.create()
    }
}

class folderSelectPreset {
    constructor() {
    }
    async load(title, usePromise = true) {
        this.path = "c";

        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent(`
                <button element="back">...</button>
                <hr>
                <div element="folderList">
                    <p>pls remove</p>
                </div>
                <hr>
                <button element="ok">ok</button>
                <button element="cancel">cancel</button>`);
                await this.create();

                await this.window.size.setSize(500, 300);
                this.window.size.userCanResize(true)

            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        if (usePromise) {
            return promise
        } else {
            this.promise = promise;
            return this
        }
    }
    async create() {
        (await this.window.getHtmlElement("ok")).style.display = "none";
        await this.window.removeAllEventListeners();
        //add event listeners
        await this.window.addHtmlEventListener("onclick", "cancel", () => {
            //read data
            this.returnFunction(undefined)

            //close and return
            this.window.remove()
        }, this);
        await this.window.addHtmlEventListener("click", "back", this.back, this)
        await this.window.addHtmlEventListener("click", "ok", this.ok, this)

        var folderStuff = await this.window.getHtmlElement("folderList")
        folderStuff.innerHTML = "";

        var i = 0
        for (var x of await SystemFileSystem.getFolders(this.path)) {
            var b = document.createElement("button")
            b.innerText = x + "/";
            b.setAttribute("element", i + "_el")
            folderStuff.append(b)

            await this.window.parseNewHtml();
            await this.window.addHtmlEventListener("click", i + "_el", async (_, __, v) => {
                (await this.window.getHtmlElement("ok")).style.display = "";
                this.selected = v[0];

                v[2].style.backgroundColor = "aqua";
                for (var x of v[2].parentElement.children) {
                    if (x != v[2]) {
                        x.style.backgroundColor = "";
                    }
                }
            }, this, [x, i, b])
            await this.window.addHtmlEventListener("ondblclick", i + "_el", this.button1, this, [x, i])
            await this.window.addHtmlEventListener("ondblclick", i + "_el", () => {
                console.log("dblclick")
            }, this, [x, i])
            i++;
        }
    }
    async ok() {
        //return
        this.returnFunction(this.path + "/" + this.selected);
        this.window.remove()
    }
    async button1(_, __, vars) {
        this.path += "/" + vars[0];
        this.create()
    }
    async back() {
        var p = this.path.split("/")
        var p = p.slice(0, -1);
        if (p.length == 0) {
            p = ["c"];
        }
        this.path = p.join("/");
        this.create()
    }
}

class numSelectPreset {
    constructor() {
    }
    async load(title, text) {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent('<p element="text"></p><input element="input" type="number"><button element="ok">ok</button><button element="cancel">cancel</button>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.setSize(400, 200);
                await this.window.size.userCanResize(true)

                //add event listeners
                await this.window.addHtmlEventListener("onclick", "cancel", () => {
                    //read data
                    this.returnFunction(undefined)

                    //close and return
                    this.window.remove()
                }, this);
                await this.window.addHtmlEventListener("onclick", "ok", async () => {
                    //read data
                    this.returnFunction((await this.window.getHtmlElement("input")).value)

                    //close and return
                    this.window.remove()
                }, this);
            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
}
class stringSelectPreset {
    constructor() {
    }
    async load(title, text) {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent('<p element="text"></p><input element="input" type="text"><button element="ok">ok</button><button element="cancel">cancel</button>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.setSize(400, 200);
                await this.window.size.userCanResize(true)

                //add event listeners
                await this.window.addHtmlEventListener("onclick", "cancel", () => {
                    //read data
                    this.returnFunction(undefined)

                    //close and return
                    this.window.remove()
                }, this);
                await this.window.addHtmlEventListener("onclick", "ok", async () => {
                    //read data
                    this.returnFunction((await this.window.getHtmlElement("input")).value)

                    //close and return
                    this.window.remove()
                }, this);
            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
}
class confirmPreset {
    constructor() {
    }
    async load(title, text) {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent('<p element="text"></p><button element="ok">Yes</button><button element="cancel">No</button>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.setSize(400, 200);
                await this.window.size.userCanResize(true)

                //add event listeners
                await this.window.addHtmlEventListener("onclick", "cancel", () => {
                    //read data
                    this.returnFunction(false);

                    //close and return
                    this.window.remove()
                }, this);
                await this.window.addHtmlEventListener("onclick", "ok", async () => {
                    //read data
                    this.returnFunction(true);

                    //close and return
                    this.window.remove()
                }, this);
            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
}
class loadingPreset {
    constructor() {
    }
    async load(title, text) {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });
        //make window
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent('<p element="text"></p><p element="p">0%</p>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.htmlSizing();
                await this.window.size.userCanResize(false)
                this.returnFunction();
            });
        this.window.close = () => {
            return true
        }
        return promise;
    }
    /**
     * sets the percentage of the window
     * @param {number} proc percentage to set
     */
    async setNum(proc) {
        if (!this.window.getHtml()) return
        var p = await this.window.getHtmlElement("p");
        p.innerText = proc + "%"
    }
    /**
     * sets the text of the window
     * @param {string} text text to set
     */
    async setText(text) {
        if (!this.window.getHtml()) return
        (await this.window.getHtmlElement("text")).innerText = text;
    }
    /**
     * close window
     */
    stop() {
        this.window.remove();
    }
}
class informationPreset {
    constructor() {
    }
    async load(title, text) {
        var promise = new Promise((res, rej) => {
            this.returnFunction = res;
        });

        //make window
        this.window = await SystemHtml.WindowHandler.createWindow(title,
            //onready:
            async () => {
                //set html
                await this.window.setContent('<p element="text"></p><button element="ok">Ok</button><button element="copy">Copy</button>');

                (await this.window.getHtmlElement("text")).innerText = text;

                await this.window.size.setSize(400, 200);
                await this.window.size.userCanResize(true);

                //add event listeners
                var r = (await this.window.getHtmlElement("text"))
                r.contextscript = (target) => {
                    return {
                        "copy": async (event) => {
                            await navigator.clipboard.writeText(event.target.innerText);
                        }
                    }
                }

                await this.window.addHtmlEventListener("onclick", "ok", async () => {
                    //read data
                    this.returnFunction(true);

                    //close and return
                    this.window.remove()
                }, this);

                await this.window.addHtmlEventListener("onclick", "copy", async () => {
                    //read data
                    await navigator.clipboard.writeText(text);

                    //close and return
                    this.window.remove()
                }, this);
            });
        this.window.close = () => {
            this.returnFunction(null)
            return true
        }

        return promise
    }
}

//returns presets
presets;