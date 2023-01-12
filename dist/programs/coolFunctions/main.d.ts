declare class program extends standardProg {
    init(): Promise<void>;
    charts: any[];
    sysargs: {};
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    randomColor(): Promise<string>;
    addChart(name: any): Promise<void>;
    loadChart(labels: any, type: any): Promise<void>;
    currentChart: any;
}
//# sourceMappingURL=main.d.ts.map