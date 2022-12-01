declare class program extends standardProg {
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    createEvents(): Promise<void>;
    asyncUpdateFiles(dat: any, path: any, persistandFiles: any): Promise<void>;
    b64_to_utf8(str: any): string;
    loadSettings(): Promise<void>;
    changeSetting(_: any, __: any, vars: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map