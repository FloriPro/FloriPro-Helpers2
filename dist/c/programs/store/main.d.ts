declare class program extends standardProg {
    init(): Promise<void>;
    packages: string[];
    /**
     * @type HtmlWindow
     */
    window: HtmlWindow;
    loadStore(): Promise<void>;
    installProgram(_: any, __: any, program: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map