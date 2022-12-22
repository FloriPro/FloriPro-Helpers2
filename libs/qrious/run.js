async function run() {
    if (window.QRCodeAllreadyInitialized == undefined) {
        eval(await SystemFileSystem.getFileString("c/libs/qrious/qrious.min.js"))
        window.QRCodeAllreadyInitialized = true;
        return QRious;
    }
    return QRious;
}
run()