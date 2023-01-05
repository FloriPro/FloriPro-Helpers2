async function checkSys() {
    var nv = await (await System.network.fetch("version", { cache: "no-store" })).text();
    if (nv == VERSION) {
        return;
    }

    if (!await SystemHtml.WindowHandler.presets.createConfirm("Update?", "You are currently not on the newest version of 'FluLu.eu'. Would you like to update?")) {
        return;
    }

    await await System.run("c/programs/settings/update.js");
}

async function checkPrograms() {
    var newVersionsLib = JSON.parse(await (await System.network.fetch("libs/_.json", { cache: "no-store" })).text());
    var newVersionsProg = JSON.parse(await (await System.network.fetch("programs/_.json", { cache: "no-store" })).text());
    var versions = await System.options.get("versions");
    for (var vname of Object.keys(versions)) {
        var [typ, name] = vname.split("_");

        if (typ == "lib") {
            if (newVersionsLib[name] == undefined) {
                console.warn("could not check version of libary '" + name + "'!")
                continue;
            }
            if (newVersionsLib[name]["version"] == versions[vname]) {
                continue;
            }

            //update
            if (!await SystemHtml.WindowHandler.presets.createConfirm("Update?", "You are currently not on the newest version of the libary '" + name + "'. Would you like to update?")) {
                continue;
            }

            await System.program.libInstall(name, true);
        }
        if (typ == "prog") {
            if (newVersionsProg[name] == undefined) {
                console.warn("could not check version of program '" + name + "'!")
                continue;
            }
            if (newVersionsProg[name]["version"] == versions[vname]) {
                continue;
            }

            //update
            if (!await SystemHtml.WindowHandler.presets.createConfirm("Update?", "You are currently not on the newest version of the Program '" + name + "'. Would you like to update?")) {
                continue;
            }

            await System.program.easyPackageInstall(name, true);
        }
    }
}

checkSys();
checkPrograms();