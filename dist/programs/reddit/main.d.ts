declare class program extends standardProg {
    init(): Promise<void>;
    previousMax: boolean;
    currentPost: post;
    past: any[];
    pastId: number;
    permalink: any;
    allreadyRead: any;
    allreadyLoading: boolean;
    maxWidth: string;
    /**
     * @type {reddit}
     */
    redditApi: reddit;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    settings: HTMLElement;
    post: HTMLElement;
    title: HTMLElement;
    text: HTMLElement;
    img: HTMLElement;
    link: HTMLElement;
    openVid: HTMLElement;
    sizeNormal(): void;
    sizeMax(): void;
    loadSettings(): Promise<void>;
    displaySettings(): Promise<void>;
    next(): Promise<void>;
    back(): void;
    /**
     *
     * @param {post} n
     */
    load(n: post): void;
    updateAllreadyRead(): Promise<void>;
    openVideo(): void;
    postDebug(): void;
    imgFullscreen(): void;
}
declare class redjsWindow {
    constructor(link: any);
    load(link: any): Promise<void>;
    window: any;
}
declare class ImgWindow {
    constructor(imgs: any);
    load(imgs: any): Promise<void>;
    window: any;
    img: any;
}
declare class commentWindow {
    constructor(post: any);
    post: any;
    load(): Promise<void>;
    window: any;
    loadComment(dat: any): HTMLDivElement;
}
declare class videoWindow {
    constructor(video: any, audio: any);
    video: any;
    audio: any;
    loadeds: number;
    load(): Promise<void>;
    window: any;
    video_video: any;
    video_audio: any;
    loadedAudio(): void;
    loadedVideo(): void;
    addEvents(): Promise<void>;
    videoEvents(_: any, __: any, ___: any, event: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map