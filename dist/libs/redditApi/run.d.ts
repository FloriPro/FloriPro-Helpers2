declare class reddit {
    /**
     * reddit reader with only one post every request
     * @param {string[]} subreddits
     */
    constructor(subreddits: string[]);
    subreddits: string[];
    currentSubredditId: number;
    boolVars: string[];
    vars: {
        limit: string;
        sort_time: string;
        sort_by: string;
        only_images: boolean;
        save_data: boolean;
        no_nsfw: boolean;
        needs_bool_argument: string;
    };
    allreadyFetching: boolean;
    genAfters(): void;
    storedPosts: any[];
    after: any[];
    timeout(ms: any): Promise<any>;
    setSubreddits(subreddits: any): void;
    /**
     * gets a post from a subreddit with the specefied id
     * @param {string} id from this.subreddits
     * @returns {{string:string | string[] | number}} the standard reddit respose for a post
     */
    get(id: string): {
        string: string | string[] | number;
    };
    next(): any;
    genUrl(subreddit: any, after: any, limit: any, sort_time: any, sort_by: any): string;
    getPostFromData(data: any): post;
}
declare class post {
    constructor(data: any);
    data: any;
    saveData: boolean;
    composedImage(): {
        full: any;
        compressed: any;
    }[];
    Image(): any[];
    ImageFull(): any[];
    Author(): any;
    Title(): any;
    Text(): any;
    HtmlText(): any;
    comments(): Promise<{
        author: string;
        body_html: string;
        body: string;
        replies: any[];
    }[]>;
    media(): false | {
        type: string;
        dat: any;
    };
    /**
     * array of comments containing replies, which in each it self is an array of comments containing replies, and so on
     * @param {Array} dat
     * @returns
     */
    loadCommentEasy(dat: any[]): {
        author: string;
        body_html: string;
        body: string;
        replies: any[];
    }[];
    /**
     * @returns {boolean} if the post is over 18 or not
     */
    nsfw(): boolean;
}
//# sourceMappingURL=run.d.ts.map