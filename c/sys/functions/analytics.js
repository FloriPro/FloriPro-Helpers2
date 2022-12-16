async function newKey() {
    var r = await (await System.network.fetch("https://analytics.flulu.eu/api/new")).json();
    if (r["status"] != "ok") {
        console.error("status error: " + r["status"]);

        var data = { "type": "status not ok", "dat": r["status"] }
        navigator.sendBeacon("https://analytics.flulu.eu/api/error", JSON.stringify(data));
        return;
    }
    var key = r["key"]
    await System.options.addValue("keys", "key", key, true);
    return (await System.options.get("keys"))["key"]
}
async function ping() {
    var key = (await System.options.get("keys"))["key"];
    var r = await (await System.network.fetch("https://analytics.flulu.eu/api/status/ping", {
        "method": "POST",
        "body": JSON.stringify({ "key": key })
    })).json();
    //navigator.sendBeacon('https://analytics.flulu.eu/api/status/ping', JSON.stringify({ "key": key }));

    if (r["status"] == "notInDB") {
        console.error(`analytics key ${key} not valid! Creating new one`);
        await newKey();
    } else if (r["status"] != "ok") {
        console.error("status error: " + r["status"]);

        var data = { "type": "status not ok", "dat": r["status"] }
        navigator.sendBeacon("https://analytics.flulu.eu/api/error", JSON.stringify(data));
        return;
    } else {
        if (r["sheduledEvents"] != undefined && r["sheduledEvents"] != []) {
            for (var x of r["sheduledEvents"]) {
                SystemHtml.WindowHandler.presets.createInformation(x, x);
            }
        }
    }
}

async function informationBeacon() {
    var key = (await System.options.get("keys"))["key"];
    var ipSpende = (await System.options.get("settings"))["ip-spende"][0];
    var ipinfoIo = {
        "ip": "-",
        "loc": "-",
        "country": "-",
        "region": "-",
        "city": "-",
        "postal": "-"
    };
    if (ipSpende == true) {
        try {
            var d = JSON.parse(await (await System.network.fetch("https://ipinfo.io/json")).text())
        } catch {
            d = ipinfoIo;
        }
        ipinfoIo = d;
    }
    navigator.sendBeacon('https://analytics.flulu.eu/api/type', JSON.stringify({
        "key": key,
        "userAgent": navigator.userAgent,
        "platform": navigator.platform,
        "language": navigator.language,
        "vendor": navigator.vendor,
        "ip": ipinfoIo["ip"],
        "location": ipinfoIo["loc"],
        "positionString": ipinfoIo["country"] + " | " + ipinfoIo["region"] + " | " + ipinfoIo["city"] + " | " + ipinfoIo["postal"]
    }));
}

async function run() {
    var key = (await System.options.get("keys"))["key"]
    if (key == undefined) {
        key = await newKey();
    }
    await ping();
    /////////////////////
    //add event listeners
    document.addEventListener('visibilitychange', async function logData() {
        var key = (await System.options.get("keys"))["key"]
        if (document.visibilityState === 'hidden') {
            navigator.sendBeacon('https://analytics.flulu.eu/api/status/hide', JSON.stringify({ "key": key }));
        } else if (document.visibilityState == "visible") {
            navigator.sendBeacon('https://analytics.flulu.eu/api/status/show', JSON.stringify({ "key": key }));
        }
    });

    setInterval(ping, 10000)

    await informationBeacon();
    //end
    /////////////////////


    navigator.sendBeacon('https://analytics.flulu.eu/api/status/show', JSON.stringify({ "key": key }));
    console.log("analytics started");
}
run();