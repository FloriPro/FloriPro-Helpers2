class errorHandler {
    constructor() {
        System.console.addListener(this.eh.bind(this))
        this.errors = 0;
        this.sendErrors = false;
        this.getId();

        this.haltAt = ["string", "function"];
    }

    async getId() {
        var key = undefined//(await System.options.get("keys"))["key"] //every time we create a new session the user should change, so that there are not multiple error sessions with the same user
        if (key == undefined) {
            key = System.makeid(32);
        }
        this.id = key;
    }

    /**
     * recursive function to get all data from an error / log (see jShell object analyzer)
     * @param {any} element 
     * @returns 
     */
    async getFullErrordata(element, parent = null, i = 5) {
        var out = []
        var pn = Object.getOwnPropertyNames(element);
        for (var m of pn) {
            var o;
            try {
                o = await this.getObject(element[m], m, parent, i);
            } catch {
                if (parent == null) {
                    o = null;
                    continue;
                }
                var p = parent;
                while (true) {
                    try {
                        o = await this.getObject(p[1], m, parent, i);
                        break;
                    }
                    catch {
                        if (p[0] == undefined) {
                            o = null;
                        }
                        p = p[0];
                        continue;
                    }
                }
            }

            out.push(o);
        }
        return out
    }

    async getObject(element, m, parent, i) {//[parent, m]
        var dat = { "name": m, "type": typeof element, "value": element + "", "children": [] };

        if (i <= 0 || element == Object || this.haltAt.includes(typeof element)) {
            return dat;
        }

        dat["children"] = await this.getFullErrordata(element, [parent, m], i - 1);

        return dat;
    }

    async eh(dat) {
        if (this.sendErrors) {
            //send everything when sending errors
            this.sendError(dat);
            return
        }
        if (dat[0] == "error") {
            this.errors++;
            if (this.errors == 5) {
                var r = false;
                try {
                    r = await SystemHtml.WindowHandler.presets.createConfirm("Error", "Multiple errors occured. Would you like to send the error report to the developer? (reload the page to stop reporting)");
                } catch {
                    r = confirm("Multiple errors occured. Would you like to send the error report to the developer? (reload the page to stop reporting)");
                }

                if (r != true) { return }
                this.sendErrors = true;

                //also send the console, for better analysis
                var console = System.console.logs;
                var information = {
                    "userAgent": navigator.userAgent,
                    "platform": navigator.platform,
                    "language": navigator.language,
                    "vendor": navigator.vendor,
                }
                var cdat = [];
                for (var x of console) {
                    cdat.push([x[0], await this.getFullErrordata(x[1])]);
                }
                await System.network.fetch('https://analytics.flulu.eu/api/errorHandler/errorStart', {
                    method: 'POST',
                    body: JSON.stringify({ "information": information, "error": cdat, "id": this.id })
                });
            }
        }
    }

    async sendError(dat) {
        await System.network.fetch('https://analytics.flulu.eu/api/errorHandler/oneError', {
            method: 'POST',
            body: JSON.stringify({ "error": [dat[0], await this.getFullErrordata(dat[1])], "id": this.id })
        });
    }
}
new errorHandler();