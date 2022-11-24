async function run(){
    await SystemFileSystem.reset();
    location.search = "";
}
run();