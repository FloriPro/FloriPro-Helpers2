declare const program_base: any;
declare class program extends program_base {
    [x: string]: any;
    init(): Promise<void>;
    button1Clicks: number;
    windowUserCanResize: boolean;
    windowShowTitle: boolean;
    /**
     * @type HtmlWindow
     */
    window: HtmlWindow;
    consoleEventId: string;
    update(dat: any): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map