declare class program extends standardProg {
    init(): Promise<void>;
    ws: WebSocket;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    send(): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map