class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("New Year",
            //onready:
            async () => {
                //set html
                await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/html.html"));
                await this.window.size.setInnerSize(300, 289);
                this.window.size.userCanResize(true);

                this.check();
                this.setInterval(this.check, 1000);
            });
        this.window.close = () => {
            this.stop()
            return true
        }
    }

    async check() {
        var tl = this.timeLeft("Jan 01, 2023 00:00:00");

        (await this.window.getHtmlElement("days")).innerText = tl.days;
        (await this.window.getHtmlElement("hours")).innerText = tl.hours;
        (await this.window.getHtmlElement("minutes")).innerText = tl.minutes;
        (await this.window.getHtmlElement("seconds")).innerText = tl.seconds;

    }

    timeLeft(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
}
new program();