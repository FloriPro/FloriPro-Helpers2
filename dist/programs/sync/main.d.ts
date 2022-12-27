declare class program extends standardProg {
    init(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    wl: any;
    handleStatus(status: any): Promise<void>;
    workerListener(data: any): Promise<void>;
}
declare class authWindow {
    constructor(parent: any);
    parent: any;
    init(): Promise<void>;
    window: any;
}
//# sourceMappingURL=main.d.ts.map