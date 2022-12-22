async function run() {
    if (window.ChartAllreadyInitialized == undefined) {
        await System.run("c/libs/chartjs/chart.js");
        window.ChartAllreadyInitialized = true;
        return Chart;
    }
    return Chart;
}
run()