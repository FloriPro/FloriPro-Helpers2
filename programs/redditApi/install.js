async function run() {
    await System.options.addValue("libs", "redditApi", "c/libs/redditApi/api.js");
    return true;
}
run();