class reddit {
    /**
     * reddit reader with only one post every request
     * @param {string[]} subreddits 
     */
    constructor(subreddits) {
        this.subreddits = subreddits;
        this.currentSubredditId = 0;

        this.boolVars = ["only_images", "save_data", "no_nsfw"]
        this.vars = { "limit": "10", "sort_time": "all", "sort_by": "hot", "only_images": false, "save_data": false, "no_nsfw": false, "needs_bool_argument": "" };

        this.allreadyFetching = false;


        this.genAfters();
    }
    genAfters() {
        this.storedPosts = [];
        this.after = []
        for (var x of this.subreddits) {
            this.after.push("");
            this.storedPosts.push([]);
        }
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setSubreddits(subreddits) {
        this.subreddits = subreddits;
        this.genAfters();
    }


    /**
     * gets a post from a subreddit with the specefied id
     * @param {string} id from this.subreddits
     * @returns {{string:string | string[] | number}} the standard reddit respose for a post
     */
    async get(id) {
        //check if allready in cache
        if (this.storedPosts[id].length > 0) {
            return [this.storedPosts[id].shift(), null];
        }

        this.allreadyFetching = true;

        var url = this.genUrl(this.subreddits[id], this.after[id], this.vars["limit"], this.vars["sort_time"], this.vars["sort_by"]);
        var dat = await fetch(url);
        dat = JSON.parse(await dat.text())

        var newAfter = dat["data"]["after"];

        var allStuff = dat["data"]["children"]

        if (allStuff.length == 0) {
            console.warn("ratelimit: timeout 2000ms")
            await this.timeout(2000);
            return this.get(id);
        }

        if (allStuff.length > 1) {
            var otherPosts = allStuff.slice(1);
            this.storedPosts[id] = otherPosts;
        }

        this.allreadyFetching = false;
        return [allStuff[0], newAfter];
    }

    async next() {
        var r = await this.get(this.currentSubredditId);
        var dat = r[0];
        var newAfter = r[1];
        if (newAfter != undefined) {
            this.after[this.currentSubredditId] = newAfter;
        }
        var p = new post(dat);
        p.saveData = this.vars["save_data"];
        if ((this.vars["only_images"] && p.Image().length == 0) || (this.vars["no_nsfw"] && p.data["over_18"])) {
            return await this.next();
        }
        if (this.vars["needs_bool_argument"] != "") {
            for (var x of this.vars["needs_bool_argument"].split(",")) {
                if (!p.data[x]) {
                    return await this.next();
                }
            }
        }

        this.currentSubredditId++;
        if (this.currentSubredditId >= this.subreddits.length) { this.currentSubredditId = 0; }
        return p;
    }
    genUrl(subreddit, after, limit, sort_time, sort_by) {
        return 'https://www.reddit.com/r/' + subreddit + '/' + sort_by + '/.json?raw_json=1&t=' + sort_time + '&limit=' + limit + "&after=" + after;
    }
}
class post {
    constructor(data) {
        this.data = data["data"];
        this.saveData = false
    }

    Image() {
        var imgs = [];
        if ("media_metadata" in this.data) {
            for (x in this.data["media_metadata"]) {
                if (this.saveData == false) {
                    imgs.push(this.data["media_metadata"][x]["s"]["u"]);
                } else {
                    p = Math.round(this.data["media_metadata"][x]["p"].length / 4);
                    //p = 4;
                    imgs.push(this.data["media_metadata"][x]["p"][p]["u"]);
                }
            }
        }
        if ("preview" in this.data && this.saveData == true) {
            for (var x in this.data["preview"]["images"]) {
                var a = this.data["preview"]["images"][x]["resolutions"];
                var p = Math.round(a.length / 4);
                if (a.includes(p)) {
                    imgs.push(a[p]["url"]);
                } else {
                    if (a.length != 0) {
                        imgs.push(a[0]["url"]);
                    } else {

                    }
                }
            }
        } else if ("url" in this.data) {
            this.data["url"] = this.data["url"].replace("gifv", "jpg")
            if (!this.data["url"].match(/.(jpg|jpeg|png|gif)$/i)) { } else {
                imgs.push(this.data["url"]);
            }
        } //url_overridden_by_dest
        return imgs
    }
    ImageFull() {
        //disable savedata
        var s = this.saveData
        this.saveData = false;

        var d = this.Image();

        //re-enabale savedata
        this.saveData = s;
        return d;
    }
    Author() {
        return this.data["author"];
    }
    Title() {
        return this.data["title"];
    }
    Text() {
        return this.data["selftext"];
    }
    HtmlText() {
        return this.data["selftext_html"];
    }
    async comments() {
        console.warn("todo comments")
        commntLink = "https://www.reddit.com" + this.data.permalink + ".json?raw_json=1";
    }

}


reddit;