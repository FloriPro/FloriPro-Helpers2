declare class nyworker extends standardProg {
    init(): Promise<void>;
    check(): Promise<void>;
    showFireworks(): Promise<void>;
    timeLeft(endtime: any): {
        total: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}
//# sourceMappingURL=nyworker.d.ts.map