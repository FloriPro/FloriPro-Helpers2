declare class program extends standardProg {
    packages: string[];
    /**
     * @type HtmlWindow
     */
    window: HtmlWindow;
    loadStore(): Promise<void>;
    installProgram(_: any, __: any, programUrl: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map