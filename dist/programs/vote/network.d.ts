declare class n {
    onupdate: (data: any) => void;
    tries: number;
    create(): void;
    ws: WebSocket;
    setPoll(pollId: any): void;
    cancelPoll(): void;
    send(data: any): void;
}
//# sourceMappingURL=network.d.ts.map