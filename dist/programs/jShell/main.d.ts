declare class program extends standardProg {
    init(): Promise<void>;
    returnObjects: {};
    /**
     * @type HtmlWindow
     */
    window: HtmlWindow;
    consoleEventId: string;
    loadStyle(): Promise<void>;
    /**
     * @param {[string,any]} dat
     */
    update(dat: [string, any]): Promise<void>;
    printStack(dat: any): Promise<void>;
    openObject(event: any): void;
}
declare class ObjectAnalyser {
    constructor(obj: any, path: any, otherAnalysersBefore: any, parent: any);
    parent: any;
    PATH: any;
    obj: any;
    lookup: {};
    otherAnalysersBefore: string;
    run(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    parseDat(): Promise<void>;
    getObject(m: any): any;
    genObject(obj: any, m: any): Promise<void>;
    genLookup(element: any): string;
    getLookup(id: any): any;
}
//# sourceMappingURL=main.d.ts.map