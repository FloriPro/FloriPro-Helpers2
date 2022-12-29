declare class program extends standardProg {
    init(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    check(): Promise<void>;
    timeLeft(endtime: any): {
        total: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}
//# sourceMappingURL=main.d.ts.map