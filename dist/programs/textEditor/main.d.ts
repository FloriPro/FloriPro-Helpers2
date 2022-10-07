declare const program_base: any;
declare class program extends program_base {
    [x: string]: any;
    init(file: any): Promise<void>;
    button1Clicks: number;
    windowUserCanResize: boolean;
    windowShowTitle: boolean;
    window: any;
    file: any;
    loadPrism(): Promise<void>;
    save(): Promise<void>;
    saveAs(): Promise<void>;
    open(): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map