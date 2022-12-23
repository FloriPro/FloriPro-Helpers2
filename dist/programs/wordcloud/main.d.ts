declare class program extends standardProg {
    init(): Promise<void>;
    cloudData: any;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    anychartContainerId: string;
    /**
     * @type {HtmlWindow}
     */
    datawindow: HtmlWindow;
    xRmove(_: any, __: any, ___: any, e: any): Promise<void>;
    loadAnyChart(): Promise<void>;
    chart: any;
    loadData(data: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map