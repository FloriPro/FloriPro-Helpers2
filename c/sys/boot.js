async function boot() {
    await System.createEvents();


    await System.run("c/sys/HTML/html.js") //load html

    //startup programs
    var p = await System.options.get("startup")
    for (var x of Object.keys(p)) {
        if (p[x] == true) {
            await System.run(x);
        }
    }

    //update checker
    System.run("c/sys/functions/update.js");
}
boot();