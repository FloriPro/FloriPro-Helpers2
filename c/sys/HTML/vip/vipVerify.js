class vipVerify extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        window.vip = this;
        await this.updateKey();
    }

    async startAll() {
        for (let i = 0; i < this.active.length; i++) {
            await this.start(this.active[i]);
        }
    }
    async start(name) {
        if (this.enabled) {
            var out = await this.load("c/sys/HTML/vip/" + name + ".js");
            eval(out);
        }
    }
    async setCode(code) {
        await System.options.addValue("vipInfo", "key", code, true);
        await this.updateKey();
    }

    async updateKey() {
        if ((await SystemFileSystem.fileExists("c/sys/options/vipInfo.json")) == true) {
            this.vipInfo = await System.options.get("vipInfo");
        }
        if (!this.vipInfo) {
            this.vipInfo = {
                key: "no key found",
                enabled: []
            }
            await SystemFileSystem.setFileString("c/sys/options/vipInfo.json", JSON.stringify(this.vipInfo));
        }

        this.key = this.vipInfo.key;
        this.active = this.vipInfo.enabled;

        //check if key is valid
        var out = await this.load("c/sys/HTML/vip/passwordCheck.js");
        this.enabled = out == "vipSuccesfull";
        await System.options.addValue("vipInfo", "enablable", this.enabled, true);
        console.log("vip key is " + (this.enabled ? "valid" : "invalid") +" ("+out+")");
    }

    async load(fileName) {
        var fileString = await SystemFileSystem.getFileString(fileName);
        var text = this.decrypt(fileString, this.key);
        return text;
    }

    encrypt(text, password) {
        var out = "";
        for (let i = 0; i < text.length; i++) {
            out += String.fromCharCode(text.charCodeAt(i) ^ password.charCodeAt(i % password.length));
        }
        return out;
    }
    decrypt(text, password) {
        var out = "";
        for (let i = 0; i < text.length; i++) {
            out += String.fromCharCode(text.charCodeAt(i) ^ password.charCodeAt(i % password.length));
        }
        return out;
    }
}

new vipVerify()