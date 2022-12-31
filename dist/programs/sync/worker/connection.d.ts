declare class syncWorkerConnection {
    constructor(url: any);
    actions: any[];
    actionUpdate: () => void;
    onopen: () => void;
    onmessage: () => void;
    onerror: () => void;
    onclose: () => void;
    onsend: () => void;
    wrongTime: () => void;
    url: any;
    connection: WebSocket;
    send(data: any): void;
    addAction(action: any): void;
    changeAction(action: any, status: any, up: any): void;
    /**
     * @returns {boolean} true if the connection is open
     */
    get connected(): boolean;
}
//# sourceMappingURL=connection.d.ts.map