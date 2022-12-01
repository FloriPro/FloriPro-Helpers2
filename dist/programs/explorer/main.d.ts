declare class program extends standardProg {
    path: any;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    events(): Promise<void>;
    create(): Promise<void>;
    odFiles: any[];
    button1(_: any, __: any, vars: any): Promise<void>;
    button2(_: any, __: any, vars: any): Promise<void>;
    back(): Promise<void>;
    newFile(): Promise<void>;
    newFolder(): Promise<void>;
    removeF(event: any): Promise<void>;
    renameF(event: any): Promise<void>;
    removeFi(event: any): Promise<void>;
    renameFi(event: any): Promise<void>;
    uploadFile(event: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map