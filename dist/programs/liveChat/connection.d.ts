declare class connection {
    constructor(ws: any);
    ws: any;
    newMessage: () => void;
    channelMessages: () => void;
    allChannels: () => void;
    authFinished: () => void;
    userUpdate: () => void;
    getChannel(channel: any): void;
    getChannels(): void;
    sendMessage(channel: any, message: any): void;
    authenticate(username: any): void;
    username: any;
}
//# sourceMappingURL=connection.d.ts.map