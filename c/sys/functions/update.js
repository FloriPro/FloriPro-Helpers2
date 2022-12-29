async function check() {
    var nv = await (await System.network.fetch("version", { cache: "no-store" })).text();
    if (nv == VERSION) {
        return;
    }

    if (!await SystemHtml.WindowHandler.presets.createConfirm("Update?", "You are currently not on the newest version of 'FluLu.eu'. Would you like to update?")) {
        return;
    }

    await await System.run("c/programs/settings/update.js");
}
check();