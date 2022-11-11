declare class program extends standardProg {
    path: any;
    windowUserCanResize: boolean;
    windowShowTitle: boolean;
    window: any;
    events(): Promise<void>;
    create(): Promise<void>;
    button1(_: any, __: any, vars: any): Promise<void>;
    button2(_: any, __: any, vars: any): Promise<void>;
    back(): Promise<void>;
    newFile(): Promise<void>;
    newFolder(): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map