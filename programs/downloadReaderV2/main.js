class downloadReaderProgram extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init(file) {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Download Reader",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                let style = await SystemFileSystem.getFileString(this.PATH.folder() + "/style.css")
                style = "<style>" + style + "</style>";

                await this.window.setContent((await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html")).replace("{{style}}", style).replaceAll("{{windowId}}", this.window.getId()));
                await this.window.size.setSize(400, 300)
                this.window.size.userCanResize(true)

                if (file != undefined) {
                    //TODO: load file
                }

                (await this.window.getHtmlElement("startupMessage")).style.display = "none";


                this.gui = new gui(this.window, this);
                this.api = new api();
                /**
                 * @type {database}
                 */
                this.database = new database();
            });
        this.window.close = () => {
            this.stop()
            return true
        }

        this.reader = new reader(this.PATH, this);
    }

    async getPage(url) {
        var id = this.gui.loader.add("Downloading page " + url);
        try {
            var p = await this.api.getPage(url);
        } catch (e) {
            alert(e);
            this.gui.loader.remove(id);
            return;
        }
        if (p.status != 'ok') {
            alert('Error');
            this.gui.loader.remove(id);
            return;
        }
        var reader = await this.reader.convertToReader(p.content, p.url);
        await this.database.addPage(reader.url, reader.content, reader.title);
        this.gui.updatePages();
        this.gui.loader.remove(id);
    }

    async showPage(url) {
        var id = this.gui.loader.add("Loading page " + url);
        var page = await this.database.getPage(url);
        if (!page) {
            alert('Error');
            this.gui.loader.remove(id);
            return;
        }
        this.gui.showPage(page.url, page.content, page.title, page.options);
        this.gui.loader.remove(id);
    }

    async reloadPage() {
        var id = this.gui.loader.add("Reloading page");
        var page = await this.database.getPage(this.gui.currentPage);
        this.gui.showPage(page.url, page.content, page.title, page.options);
        this.gui.loader.remove(id);
    }

    pageClicked(url) {
        this.gui.pageReader.optionsOpen = false;
        this.gui.pageReader.updateOptions();
        this.gui.openSelect({
            title: "Clicked link (" + url + ")",
            options: [
                {
                    text: "Open in browser",
                    action: () => {
                        window.open(url, '_blank');
                    }
                },
                {
                    text: "Download page",
                    action: () => {
                        this.getPage(url);
                    }
                },
                {
                    text: "Download and open page",
                    action: async () => {
                        await this.getPage(url);
                        this.showPage(url);
                    }
                }
            ]
        })
    }
}

class reader {
    constructor(path, controller) {
        this.PATH = path;
        this.controller = controller;
        this.init();
    }

    async init() {
        this.Readability = (await System.run(this.PATH.folder() + "/Readability.js"));
        this.Purify = (await System.run(this.PATH.folder() + "/purify.js"));
    }

    async convertToReader(htmlText, url) {
        var dom = (new DOMParser()).parseFromString(htmlText, "text/html")
        var reader = new this.Readability(dom, { newBaseURI: url });

        var article = reader.parse();

        var div = document.createElement('div');
        try {
            var cleanArticle = this.Purify.sanitize(article.content);
        } catch (e) {
            console.error(e);

            var r = await this.controller.gui.asyncSelect("Error while sanitizing article. Do you want to continue?", ["Yes", "No"]);
            if (r == "Yes") {
                var cleanArticle = article.content;
            } else {
                cleanArticle = "<p>Article could not be sanitized.</p>";
            }
        }
        return { content: cleanArticle, title: article.title, url: url };
    }

    applyOptions(content, options) {
        var div = document.createElement('div');
        div.innerHTML = content;

        //remove unwanted texts
        if (options.removedTexts == undefined) options.removedTexts = [];
        div.querySelectorAll("*").forEach((element) => {
            //only get text nodes
            var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
            var node;
            while (node = walker.nextNode()) {
                var text = node.nodeValue;
                options.removedTexts.forEach((removedText) => {
                    if (text.includes(removedText)) {
                        node.nodeValue = text.replace(removedText, "");
                    }
                });
            }
        });

        //change all links
        div.querySelectorAll("a").forEach((element) => {
            var ogLink = element.getAttribute("href");
            if (!ogLink) return;

            //make a run this.controller.pageClicked(ogLink); if the link is clicked instead of opening it
            element.title = ogLink;
            element.setAttribute("href", "#");
            element.classList.add("link");
            element.setAttribute("element", "link");
        });

        return div.innerHTML;
    }
}

class api {
    constructor() {
        //this.url = 'http://localhost:3000/api/';
        this.url = "https://proxy.flulu.eu/"
    }
    #get(url, callback, error = null) {
        fetch(this.url + url)
            .then(response => response.json())
            .then(data => callback(data)).catch(err => {
                console.error(err);
                if (error) error(err);
            });
    }
    /**
     * 
     * @param {*} url 
     * @param {*} data 
     * @returns {Promise}
     */
    #asyncGet(url) {
        var promise = new Promise((resolve, reject) => {
            this.#get(url, resolve, reject);
        });
        return promise;
    }

    #post(url, data, callback, error = null) {
        fetch(this.url + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => callback(data)).catch(err => {
                console.error(err);
                if (error) error(err);
            });
    }
    /**
     * 
     * @param {*} url 
     * @param {*} data
     * @returns {Promise}
     */
    #asyncPost(url, data) {
        var promise = new Promise((resolve, reject) => {
            this.#post(url, data, resolve, reject);
        });
        return promise;
    }

    async getPage(url) {
        return await this.#asyncGet('page?url=' + url);
    }
}
class gui {
    /**
     * 
     * @param {HtmlWindow} window 
     * @param {downloadReaderProgram} controller 
     */
    constructor(window, controller) {
        this.window = window;
        this.controller = controller;

        this.pageReader = new pageReader(this.window, this.controller);
        this.loader = new loader(this.window);

        this.init();
    }

    async addEvents() {
        //cleardatabase
        this.window.addHtmlEventListener("click", "cleardatabase", async () => {
            //if (confirm('Realy delete everything?')) CONTROLLER.database.fulldelete()
            if (await SystemHtml.WindowHandler.presets.createConfirmDialog("Realy delete everything?")) {
                this.controller.database.fulldelete()
            }
        }, this);

        //pageEdit
        this.window.addHtmlEventListener("click", "pageEdit", async () => {
            this.pageReader.edit();
        }, this);

        //goBackHome
        this.window.addHtmlEventListener("click", "goBackHome", async () => {
            this.showTab('Home');
            this.pageReader.toggleOptions();
        }, this);

        //addRemoveText
        this.window.addHtmlEventListener("click", "addRemoveText", async () => {
            this.pageReader.addRemoveText();
        }, this);

        //exitEditPanel
        this.window.addHtmlEventListener("click", "exitEditPanel", async () => {
            this.pageReader.edit();
        }, this);

        //btnDownload
        this.window.addHtmlEventListener("click", "btnDownload", async () => {
            this.buttonAddUrl();
        }, this);

        this.window.addHtmlEventListener("click", "page", async (_, __, ___, event) => {
            var cp = event.composedPath();
            for (var x = 0; x < 4; x++) {
                if (cp[x].getAttribute("element") == "link") {
                    this.controller.pageClicked(cp[x].title);
                    break;
                }
            }

            //if (event.target.getAttribute("element") == "link" || event.composedPath()[1].getAttribute("element") == "link" || event.composedPath()[2].getAttribute("element") == "link" || event.composedPath()[3].getAttribute("element") == "link") {
            //    this.controller.pageClicked(event.target.title);
            //}
        });
    }

    async init() {
        this.wasMaxOnce = false;

        await this.addEvents();

        this.updatePages();

        this.currentTab = "Home";
        this.tab = {
            "Home": {
                "id": "home",
            },
            "Page": {
                "id": "page",
            }
        };
        this.showTab(this.currentTab);

        this.currentPage = null;

        this.loadDisplayTypes();
    }

    async loadDisplayTypes() {
        this.pageDisplayTypes = {
            Margin: {
                "Type 1": "type1container",
                "Type 2": "type2container",
            },
            Color: {
                "Light": "type1color",
                "Dark": "type2color",
                "Dark Dark": "type23color",
                "Mid Dark": "type3color",
            },
            Font: {
                "Serif": "type1font",
                "Sans-Serif": "type2font",
                "Monospace": "type3font",
            },
            Size: {
                "Extra Small": "type0size",
                "Small": "type1size",
                "Medium": "type2size",
                "Large": "type3size",
            }
        }
        this.pageDisplayTypesStandard = {
            Margin: "Type 1",
            Color: "Mid Dark",
            Font: "Sans-Serif",
            Size: "Medium",
        }

        if (await this.controller.database.optionExists("pageDisplayTypes")) {
            this.pageDisplayTypesStandard = await this.controller.database.getOption("pageDisplayTypes");
        } else {
            await this.controller.database.setOption("pageDisplayTypes", this.pageDisplayTypesStandard);
        }

        this.specialTypeCode = {
            Color: (type, type2) => {
                //set meta theme-color tag
                //var meta = document.querySelector('meta[name="theme-color"]'); //TODO add to System
                var colors = {
                    "Light": "#ffffff",
                    "Dark": "#000000",
                    "Dark Dark": "#000000",
                    "Mid Dark": "#5a5151",
                }
                //meta.setAttribute("content", colors[type2]);
            }
        }
        this.reversePageDisplayTypes = {}
        this.pageDisplayTypesDom = {}
        this.pageDisplayTypesSelected = {}
        this.addPageDisplayTypes();
    }

    buttonAddUrl() {
        var url = prompt('Enter URL', '');
        if (!url) return;
        this.controller.getPage(url);
    }

    async updatePages() {
        var id = this.loader.add();
        var p = await this.controller.database.getPages();
        var div = await this.window.getHtmlElement("downloadedPages");
        div.innerHTML = '';
        for (var i = 0; i < p.length; i++) {
            div.appendChild(this.getPage(p[i].url));
        }
        this.loader.remove(id);
    }
    getPage(url) {
        var div = document.createElement('div');
        div.classList.add('downloadedPage');
        div.onclick = this.pageClick.bind(this, url);

        var pUrl = document.createElement('p');
        pUrl.innerText = url;
        pUrl.style.overflowWrap = "anywhere";
        div.appendChild(pUrl);

        var btn = document.createElement('button');
        btn.innerText = 'Delete';
        btn.onclick = this.deletePage.bind(this, url);
        div.appendChild(btn);

        this.controller.database.getPage(url).then(dbInfo => {
            if (!dbInfo) return;

            var pTitle = document.createElement('p');
            pTitle.classList.add('title');
            pTitle.innerText = dbInfo.title;
            div.prepend(pTitle);

            pUrl.style.fontSize = '0.8em';
        });


        return div;
    }
    pageClick(url) {
        this.controller.showPage(url);
    }

    deletePage(url) {
        this.controller.database.deletePage(url);
        this.updatePages();
        event.stopPropagation();
    }

    async showTab(tab) {
        this.currentTab = tab;
        for (var t in this.tab) {
            if (t == tab) {
                (await this.window.getHtmlElement(this.tab[t].id)).style.display = 'block';
            } else {
                (await this.window.getHtmlElement(this.tab[t].id)).style.display = 'none';
            }
        }

        if (tab != "Page") {
            this.currentPage = null;
            if (this.wasMaxOnce) {
                this.window.size.backFromFullMax();
            }
        }
        if (tab == "Page") {
            this.window.size.setfullMax();
            this.wasMaxOnce = true;
        }
    }

    async addPageDisplayTypes() {
        var div = await this.window.getHtmlElement("autoGenDisplayTypes");
        for (var t in this.pageDisplayTypes) {
            var container = document.createElement('div');
            var p = document.createElement('p');
            p.innerText = t + ':';
            p.style.margin = '0';
            container.appendChild(p);
            container.classList.add('displayTypeSelectRow');

            this.pageDisplayTypesSelected[t] = Object.values(this.pageDisplayTypes[t])[0];
            this.pageDisplayTypesDom[t] = { container: container, items: {} }
            this.reversePageDisplayTypes[t] = {}
            for (var t2 in this.pageDisplayTypes[t]) {
                var btn = document.createElement('button');
                btn.innerText = t2;
                btn.onclick = this.setPageDisplayType.bind(this, t, t2);
                container.appendChild(btn);
                this.pageDisplayTypesDom[t].items[t2] = btn;
                this.reversePageDisplayTypes[t][this.pageDisplayTypes[t][t2]] = t2;
            }
            await this.setPageDisplayType(t, this.pageDisplayTypesStandard[t]);
            div.appendChild(container);
        }
    }

    async setPageDisplayType(type, type2) {
        var old = this.pageDisplayTypesSelected[type];
        if (this.pageDisplayTypesDom[type].items[this.reversePageDisplayTypes[type][old]]) {
            this.pageDisplayTypesDom[type].items[this.reversePageDisplayTypes[type][old]].classList.remove('selected');
        } else {
            console.log('no old');
        }

        this.pageDisplayTypesSelected[type] = this.pageDisplayTypes[type][type2];
        this.pageDisplayTypesDom[type].items[type2].classList.add('selected');
        var page = await this.window.getHtmlElement("page");
        page.classList.remove(old);
        page.classList.add(this.pageDisplayTypesSelected[type]);
        if (this.specialTypeCode[type]) {
            this.specialTypeCode[type](type, type2);
        }

        var selectedFullNames = {}
        for (var t in this.pageDisplayTypesSelected) {
            selectedFullNames[t] = this.reversePageDisplayTypes[t][this.pageDisplayTypesSelected[t]];
        }
        this.controller.database.setOption("pageDisplayTypes", selectedFullNames);
    }

    async showPage(url, content, title, options) {
        this.showTab("Page");

        this.currentPage = url;

        (await this.window.getHtmlElement("pageUrl")).innerText = url;
        (await this.window.getHtmlElement("pageContentBody")).innerHTML = this.controller.reader.applyOptions(content, options);
        (await this.window.getHtmlElement("pageContentTitle")).innerText = title;

    }

    async openSelect(data) {
        var select = await this.window.getHtmlElement("select");
        var selectTitle = await this.window.getHtmlElement("selectTitle");
        var selectOptions = await this.window.getHtmlElement("selectOptions");
        var selectClose = await this.window.getHtmlElement("selectClose");

        var div = select;
        div.style.display = 'flex';

        var title = selectTitle;
        title.innerText = data.title;

        var options = selectOptions;
        options.innerHTML = '';
        for (var i = 0; i < data.options.length; i++) {
            var btn = document.createElement('button');
            btn.innerText = data.options[i].text;
            btn.onclick = ((action, div) => {
                action();
                div.style.display = 'none';
            }).bind(this, data.options[i].action, div);
            options.appendChild(btn);
        }

        var close = selectClose;
        close.onclick = (() => {
            div.style.display = 'none';
            options.innerHTML = '';
            if (data.onClose) {
                data.onClose();
            }
        }).bind(this);
    }

    async asyncSelect(title, options) {
        return new Promise((resolve, reject) => {
            var op = []
            for (var i = 0; i < options.length; i++) {
                var d = {
                    text: options[i],
                    action: ((i) => {
                        resolve(options[i]);
                    }).bind(this, i)
                }
                op.push(d);
            }

            this.openSelect({
                title: title,
                options: op,
                onClose: () => {
                    resolve(null);
                }
            });
        });
    }
}

class pageReader {
    constructor(window, controller) {
        this.window = window;
        this.controller = controller;
        this.init();
    }

    async init() {
        this.div = await this.window.getHtmlElement("page");
        this.div.addEventListener('click', this.click.bind(this));

        this.optionsOpen = false;
        this.editPanelOpen = false;
        this.updateOptions();
    }

    /**
     * 
     * @param {MouseEvent} event 
     */
    async click(event) {
        //if #pageOptions is not clicked
        if (!event.composedPath().includes(await this.window.getHtmlElement('pageOptions')) && !event.composedPath().includes(await this.window.getHtmlElement('editPanel')) && !event.target.classList.contains("link")) {
            this.toggleOptions();
        }
    }

    toggleOptions() {
        this.optionsOpen = !this.optionsOpen;
        this.updateOptions();
    }

    async updateOptions() {
        if (this.optionsOpen) {
            (await this.window.getHtmlElement('pageOptions')).style.display = '';
        } else {
            (await this.window.getHtmlElement('pageOptions')).style.display = 'none';
        }
    }

    edit() {
        this.editPanelOpen = !this.editPanelOpen;
        this.updateEditPanel();
    }

    async updateEditPanel() {
        if (this.editPanelOpen) {
            (await this.window.getHtmlElement('editPanel')).style.display = '';
            this.optionsOpen = false;
            this.updateOptions();
            this.makeEditPanel();
        } else {
            (await this.window.getHtmlElement('editPanel')).style.display = 'none';
            this.controller.reloadPage();
        }
    }

    async makeEditPanel() {
        var data = await this.controller.database.getPage(this.controller.gui.currentPage);

        this.removedTexts = [];
        if (data.options.removedTexts) {
            this.removedTexts = data.options.removedTexts;
        }
        var editPanelRemoveTextsList = await this.window.getHtmlElement('editPanelRemoveTextsList');
        editPanelRemoveTextsList.innerHTML = '';
        for (var t of this.removedTexts) {
            var p = document.createElement('p');
            p.innerText = t;
            p.title = "click to remove";
            p.onclick = this.removeRemoveText.bind(this, t);
            editPanelRemoveTextsList.appendChild(p);
        }
    }

    async addRemoveText() {
        var text = (await this.window.getHtmlElement('editPanelRemoveTextsInput')).value;
        if (text && text != "" && text != " ") {
            this.removedTexts.push(text);
            this.controller.database.setPageOption(this.controller.gui.currentPage, "removedTexts", this.removedTexts).then(() => {
                this.controller.gui.pageReader.makeEditPanel();
            });
        }
        (await this.window.getHtmlElement('editPanelRemoveTextsInput')).value = "";
    }
    removeRemoveText(text) {
        this.removedTexts.splice(this.removedTexts.indexOf(text), 1);
        this.controller.database.setPageOption(this.controller.gui.currentPage, "removedTexts", this.removedTexts).then(() => {
            this.controller.gui.pageReader.makeEditPanel();
        });
    }
}

class loader {
    constructor(window) {
        this.window = window;
        this.init();
    }

    async init() {
        this.div = await this.window.getHtmlElement('loading');
        this.ids = {};
    }

    randomId() {
        var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        while (this.ids[id]) {
            id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }
        this.ids[id] = { active: true };
        return id;
    }

    add(message = null) {
        var id = this.randomId();
        if (message) {
            this.ids[id].message = message;
        }
        this.update();
        return id;
    }
    remove(id) {
        delete this.ids[id];
        this.update();
    }

    async update() {
        if (Object.keys(this.ids).length > 0) {
            this.div.style.display = 'flex';

            var hasMessage = false;
            var messages = [];
            for (var id in this.ids) {
                if (this.ids[id].message) {
                    hasMessage = true;
                    messages.push(this.ids[id].message);
                }
            }
            if (!hasMessage) {
                (await this.window.getHtmlElement("loadingStandardInfo")).style.display = 'block';
            } else {
                (await this.window.getHtmlElement("loadingStandardInfo")).style.display = 'none';

                (await this.window.getHtmlElement("loadingMessages")).innerHTML = '';
                for (var msg of messages) {
                    var p = document.createElement('p');
                    p.innerText = msg;
                    (await this.window.getHtmlElement("loadingMessages")).appendChild(p);
                }
            }
        } else {
            this.div.style.display = 'none';
        }
    }
}

class database {
    //this is not a real database anymore, it uses the integrated file system of flulu.eu
    constructor() {
        this.checkFileStructure();
        this.fsc = new Promise((resolve, reject) => {
            this.fscResolve = resolve;
        });
    }

    async checkFileStructure() {
        if (!await SystemFileSystem.fileExists("c/user/downloadReader/pages.json")) {
            await SystemFileSystem.setFileString("c/user/downloadReader/pages.json", "{}");
        }
        if (!await SystemFileSystem.fileExists("c/user/downloadReader/settings.json")) {
            await SystemFileSystem.setFileString("c/user/downloadReader/settings.json", JSON.stringify({}));
        }
        if (!await SystemFileSystem.folderExists("c/user/downloadReader/pages")) {
            await SystemFileSystem.createFolder("c/user/downloadReader", "pages");
        }
        console.log("File Structure checked");
        this.fscResolve();
    }

    /*
        File Structure:
        /user/downloadReader/
            - pages/
                - page1/
                    - page.rhtml
                    - options.json
                - page2/
                    - page.rhtml
                    - options.json
                ...
            - pages.json
            - settings.json
    */

    async addPage(url, content, title) {
        await this.fsc;

        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/pages.json");
        if (!data[url]) {
            var folderId = System.makeid(10);
        }
        data[url] = {
            url: url,
            folderId: folderId
        };
        await SystemFileSystem.setFileString("c/user/downloadReader/pages.json", JSON.stringify(data));


        if (!await SystemFileSystem.folderExists("c/user/downloadReader/pages/" + folderId)) {
            await SystemFileSystem.createFolder("c/user/downloadReader/pages", folderId);
        }

        await SystemFileSystem.setFileString("c/user/downloadReader/pages/" + folderId + "/page.rhtml", content);
        await SystemFileSystem.setFileString("c/user/downloadReader/pages/" + folderId + "/options.json", JSON.stringify({
            title: title,
            options: {},
            date: Date.now(),
            url: url
        }));
    }

    async getPageId(url) {
        await this.fsc;

        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/pages.json");
        return data[url].folderId;
    }

    async setPageOption(url, name, value) {
        await this.fsc;

        var folderId = await this.getPageId(url);
        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/pages/" + folderId + "/options.json");
        data.options[name] = value;
        await SystemFileSystem.setFileString("c/user/downloadReader/pages/" + folderId + "/options.json", JSON.stringify(data));
    }

    async getPage(url) {
        await this.fsc;

        //returns content, date, options, title, url
        var folderId = await this.getPageId(url);
        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/pages/" + folderId + "/options.json");
        var content = await SystemFileSystem.getFileString("c/user/downloadReader/pages/" + folderId + "/page.rhtml");
        return {
            content: content,
            date: data.date,
            options: data.options,
            title: data.title,
            url: data.url
        };
    }

    async deletePage(url) {
        await this.fsc;

        var folderId = await this.getPageId(url);
        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/pages.json");
        delete data[url];
        await SystemFileSystem.setFileString("c/user/downloadReader/pages.json", JSON.stringify(data));
        await SystemFileSystem.removeFolder("c/user/downloadReader/pages/" + folderId);
    }

    async getPages() {
        await this.fsc;

        //returns urls
        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/pages.json");
        var urls = [];
        for (var url in data) {
            urls.push({ url: url, title: data[url].title });
        }
        return urls;
    }

    async setOption(name, value) {
        await this.fsc;

        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/settings.json");
        data[name] = value;
        await SystemFileSystem.setFileString("c/user/downloadReader/settings.json", JSON.stringify(data));
    }

    async getOption(name) {
        await this.fsc;

        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/settings.json");
        return data[name];
    }

    async optionExists(name) {
        await this.fsc;

        var data = await SystemFileSystem.getFileJson("c/user/downloadReader/settings.json");
        console.log(data);
        return data[name] != undefined;
    }

    async fulldelete() {
        await this.fsc;

        await SystemFileSystem.removeFolder("c/user/downloadReader");
    }
}

new downloadReaderProgram();