declare class syncWorkerConnection {
    constructor(url: any);
    onopen: () => void;
    onmessage: () => void;
    onerror: () => void;
    onclose: () => void;
    url: any;
    connection: WebSocket;
    send(data: any): void;
    /**
     * @returns {boolean} true if the connection is open
     */
    get connected(): boolean;
}
//# sourceMappingURL=connection.d.ts.map