async function run() {
    if (window.anychartAllreadyInitialized == undefined) {
        //load anychart js
        eval((await System.network.fetch("https://cdn.anychart.com/releases/8.11.0/js/anychart-base.min.js").then((res) => res.text())).replaceAll("contextmenu", "context_menu")) // load it and remove the contextmenu eventlisteners
        eval(await System.network.fetch("https://cdn.anychart.com/releases/8.11.0/js/anychart-tag-cloud.min.js").then((res) => res.text()));
        //load anychart css
        var css = document.createElement("style");
        css.innerHTML = await System.network.fetch("https://cdn.anychart.com/releases/8.11.0/css/anychart-ui.min.css").then((res) => res.text());
        document.head.appendChild(css);

        window.anychartAllreadyInitialized = true;

        //wait for the anychart to be loaded
        await new Promise((resolve) => {
            anychart.onDocumentReady(resolve);
        });

        return anychart;
    }
    return anychart;
}
run();