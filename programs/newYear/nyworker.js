class nyworker extends System.program.default {
    constructor() {
        super()
    }
    async init() {
        this.setInterval(this.check, 1000);
    }

    async check() {
        var tl = this.timeLeft("Jan 01, 2023 00:00:00");
        //runs when new year is 2 hours away until 2 hours after (+-7200000ms)
        if (tl.total <= 7200000 && tl.total > -7200000) {
            this.stop();
            this.showFireworks();
        }
    }

    async showFireworks() {
        //overlay on complete screen
        var overlay = document.createElement("iframe");
        overlay.setAttribute("allowtransparency", "true");
        overlay.srcdoc = await SystemFileSystem.getFileString(this.PATH.folder() + "/fireworks.html");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.zIndex = "99999"
        overlay.style.border = "none";
        overlay.style.pointerEvents = "none";

        document.body.appendChild(overlay);
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
new nyworker();