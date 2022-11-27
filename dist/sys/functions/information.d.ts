declare class program extends standardProg {
    init(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    howToUseList: HTMLElement;
    howToUse: any;
    specificInfo(data: any): Promise<void>;
}
//# sourceMappingURL=information.d.ts.map