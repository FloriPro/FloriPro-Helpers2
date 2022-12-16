declare class program extends standardProg {
    init(): Promise<void>;
    ws: WebSocket;
    userName: string;
    currentChannel: any;
    end: any;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    /**
     * @type {gui}
     */
    gui: gui;
    /**
     * @type {connection}
     */
    connection: connection;
    send(): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map