declare const program_base: any;
declare class program extends program_base {
    [x: string]: any;
    init(): Promise<void>;
    button1Clicks: number;
    windowUserCanResize: boolean;
    windowShowTitle: boolean;
    window: any;
    loadSettings(): Promise<void>;
    changeSetting(_: any, __: any, vars: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map