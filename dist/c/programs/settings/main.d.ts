declare class program extends standardProg {
    init(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    createEvents(): Promise<void>;
    loadSettings(): Promise<void>;
    changeSetting(_: any, __: any, vars: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map