declare class program extends standardProg {
    init(): Promise<void>;
    editors: any[];
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    update(): Promise<void>;
    loadStatus(): Promise<void>;
}
declare class editDesktopElement {
    constructor(id: any, PATH: any);
    PATH: any;
    id: any;
    close: () => void;
    remove: () => void;
    update: () => void;
    init(): Promise<void>;
    el: any;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    createEvents(): Promise<void>;
    save(): Promise<void>;
}
//# sourceMappingURL=desktop.d.ts.map