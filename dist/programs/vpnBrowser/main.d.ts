declare const program_base: any;
declare class program extends program_base {
    [x: string]: any;
    init(): Promise<void>;
    button1Clicks: number;
    windowUserCanResize: boolean;
    windowShowTitle: boolean;
    /**@type {HtmlWindow} */
    window: HtmlWindow;
    iframe: HTMLElement;
    sendIframe(data: any): void;
    onmessage(data: any): void;
    setHtml(htm: any, url: any): Promise<void>;
    load(url: any): Promise<void>;
    go(): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map