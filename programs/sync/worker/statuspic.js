class statusPic {
    constructor() {
        //check if allready exists
        if (!document.querySelector("#statusPic")) {
            //create element
            this.statusPic = document.createElement("button");
            this.statusPic.id = "statusPic";
            this.statusPic.style.position = "fixed";
            this.statusPic.style.overflow = "hidden";
            this.statusPic.style.zIndex = "1000";

            var img = document.createElement("img");
            img.src = SystemFileSystem.toImg(SystemFileSystem.getFileString("c/programs/sync/worker/statuspic/offline.webp"));
            img.style.width = "20px";
            img.style.height = "20px";

            this.statusPic.append(img)
            document.querySelector("#all").append(this.statusPic);
        }
        this.setStatus("offline");
    }

    async setStatus(status) {
        var img = this.statusPic.querySelector("#statusPic img");
        img.style.display = "";
        if (this.a != undefined && this.a.playState == "running") {
            this.a.cancel();
        }
        switch (status) {
            case "needsAuth":
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/programs/sync/worker/statuspic/needsAuth.webp"));
                break;
            case "noAuth":
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/programs/sync/worker/statuspic/noAuth.webp"));
                break;
            case "authWait":
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/programs/sync/worker/statuspic/authWait.webp"));
                break;
            case "syncing":
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/programs/sync/worker/statuspic/syncing.webp"));
                this.a = img.animate([
                    { transform: 'translateY(30px)' },
                    { transform: 'translateY(-30px)' },
                ], {
                    // timing options
                    duration: 2000,
                    iterations: Infinity
                })
                break;
            case "idle":
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/programs/sync/worker/statuspic/idle.webp"));
                break;
            case "synced":
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/programs/sync/worker/statuspic/synced.webp"));
                this.a = img.animate([
                    { transform: 'translateY(0px)' },
                    { transform: 'translateY(-40px)' },
                ], {
                    // timing options
                    duration: 2000,
                    iterations: 1
                });
                try {
                    this.a.finished.then(() => {
                        img.style.display = "none";
                    });
                } catch (e) {/*abborted*/}
                break;
            case "offline":
                img.src = SystemFileSystem.toImg(await SystemFileSystem.getFileString("c/programs/sync/worker/statuspic/offline.webp"));
                break;
        }
    }
}

statusPic;