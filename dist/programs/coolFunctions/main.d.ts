declare class program extends standardProg {
    init(): Promise<void>;
    button1Clicks: number;
    windowUserCanResize: boolean;
    windowShowTitle: boolean;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    openChart(name: any): Promise<void>;
    loadChart(labels: any, data: any, title: any, type: any): Promise<void>;
    currentChart: any;
}
//# sourceMappingURL=main.d.ts.map