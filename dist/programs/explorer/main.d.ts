declare class program extends standardProg {
    path: any;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    events(): Promise<void>;
    create(): Promise<void>;
    button1(_: any, __: any, vars: any): Promise<void>;
    button2(_: any, __: any, vars: any): Promise<void>;
    back(): Promise<void>;
    newFile(): Promise<void>;
    newFolder(): Promise<void>;
    removeF(): Promise<void>;
    renameF(): Promise<void>;
    removeFi(): Promise<void>;
    renameFi(): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map