async function run() {
    if (window.md5AllreadyInitialized == undefined) {
        await System.run("c/libs/md5/md5.js")

        window.md5AllreadyInitialized = true;
        return md5;
    }
    return md5;
}
run();