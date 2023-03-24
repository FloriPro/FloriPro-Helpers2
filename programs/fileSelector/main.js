class externalFileSelector extends System.program.default {
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("-fileSelector-",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setfullMax();
                await this.window.size.userCanResize(false)
                window.top.postMessage("fileSelectorOK", '*')

                //set events
                this.window.addHtmlEventListener("click", "selFolButt", async () => {
                    var a = await SystemHtml.WindowHandler.presets.createFolderSelect("select a folder", false);
                    await delay(100);
                    await a.window.size.setfullMax();
                    var d = await a.promise;

                    var folderData = await this.toPackage(d);

                    window.top.postMessage("based_" + JSON.stringify(folderData), "*")
                    window.top.postMessage("selectedFolder_" + d, '*');
                }, this)
            });
        this.window.close = () => {
            this.stop();
            return true
        }
    }

    async toPackage(path) {
        var folderData = {};

        var files = await SystemFileSystem.getFiles(path);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var data = await SystemFileSystem.getFileString(path + "/" + file);

            //data to base64
            data = this.utf8_to_b64(data);
            folderData[file] = data;
        }

        var folders = await SystemFileSystem.getFolders(path);
        for (var i = 0; i < folders.length; i++) {
            var folder = folders[i];
            folderData[folder] = await this.toPackage(path + "/" + folders[i]);
        }

        return folderData;
    }
    utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
}

new externalFileSelector()