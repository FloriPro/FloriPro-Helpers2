declare class gui {
    /**
     * gui handler for this live chat program
     * @param {HtmlWindow} window
     * @param {boolean} isPhone
     */
    constructor(window: HtmlWindow, isPhone: boolean);
    window: HtmlWindow;
    isPhone: boolean;
    /**
     * show or hide the not connected message
     * @param {boolean} connected
     */
    connectionStatus(connected: boolean): Promise<void>;
    setChatName(name: any): Promise<void>;
    clearChat(): Promise<void>;
    /**
     * replace the chat text with the given text
     * @param {Array<{user: string, message: string}>} text
     */
    loadText(text: Array<{
        user: string;
        message: string;
    }>): Promise<void>;
    /**
     * add a message to the bottom chat
     * @param {{user: string, message: string}} messageDat
     */
    addMessage(messageDat: {
        user: string;
        message: string;
    }): Promise<void>;
    displayChannels(channels: any): Promise<void>;
    displayUsers(users: any): Promise<void>;
    channelList(show: any): Promise<void>;
    userList(show: any): Promise<void>;
}
//# sourceMappingURL=gui.d.ts.map