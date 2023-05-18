console.log("joucy.js loaded");

class oneYouce {
    //line needed to make it work
    constructor(youceId, startX, startY) {
        this.id = youceId
        this.posX = startX;
        this.posY = startY;

        var energyY = 5;
        var energyX = 5;

        this.ySpeed = Math.floor(Math.random() * energyY * 2) - energyY;
        this.xSpeed = Math.floor(Math.random() * energyX * 2) - energyX;

        this.create();
        this.finishPromise = new Promise(((resolve, reject) => {
            this.finish = resolve;
        }).bind(this));
    }
    create() {
        this.i = 0;
        this.div = document.createElement("div");
        this.div.setAttribute("youceId", this.id);
        this.setStyle();
        this.intervalid = setInterval(this.update.bind(this), 10);
    }

    setStyle() {
        this.div.style.width = "12px";
        this.div.style.height = "12px";

        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        this.div.style.backgroundColor = "#" + randomColor;

        this.div.style.pointerEvents = "none";

        this.div.style.zIndex = "999999999999";
        this.div.style.borderRadius = "50%";
        this.div.style.position = "absolute";
        this.div.style.left = this.posX + "px";
        this.div.style.top = this.posY + "px";
    }
    update() {
        var opacityFade = 50;
        var maxLife = 100;
        var fallSpeed = 0.1;
        var xSpeedFade = 0.98;

        this.i++;
        if (this.i > maxLife) {
            this.stop();
            return
        }
        if (this.i > opacityFade) {
            this.div.style.opacity = 1 - (this.i - opacityFade) / (maxLife - opacityFade);
        }

        this.ySpeed += fallSpeed;
        this.xSpeed *= xSpeedFade;

        this.posX += this.xSpeed;
        this.posY += this.ySpeed;

        //if out of screen
        if (this.posX < -12 || this.posX > window.innerWidth || this.posY > window.innerHeight) {
            this.stop();
        }

        this.div.style.left = this.posX + "px";
        this.div.style.top = this.posY + "px";
    }

    stop() {
        this.finish();
        this.div.remove();
        clearInterval(this.intervalid);
    }
}

class youce {
    //line needed to make it work
    constructor(startX, startY) {
        this.id = System.makeid(10);
        this.div = document.createElement("div");
        this.div.setAttribute("youceId", this.id);

        var p = []
        for (let i = 0; i < 20; i++) {
            let one = new oneYouce(this.id, startX, startY);
            this.div.appendChild(one.div);
            p.push(one.finishPromise);
        }
        Promise.all(p).then(() => {
            this.div.remove();
        });

        document.body.appendChild(this.div);
    }
}


document.body.style.overflow = "hidden";
System.eventHandler.addEventHandler("click", (e) => {
    new youce(e.clientX, e.clientY);
});
// secure js: vipContainer