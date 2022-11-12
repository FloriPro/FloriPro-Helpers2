declare class program extends standardProg {
    button1Clicks: number;
    windowUserCanResize: boolean;
    windowShowTitle: boolean;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    file: any;
    loadPrism(): Promise<void>;
    save(): Promise<void>;
    saveAs(): Promise<void>;
    open(): Promise<void>;
    codeStyle(): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map