async function boot() {
    await System.createEvents();


    await System.run("c/sys/HTML/html.js") //load html

    //TODO: Startup Information not loading properly because of animations idk how to fix
    await delay(500);

    //startup programs
    var p = await System.options.get("startup")
    for (var x of Object.keys(p)) {
        if (p[x] == true) {
            await System.run(x);
        }
    }
}
boot();