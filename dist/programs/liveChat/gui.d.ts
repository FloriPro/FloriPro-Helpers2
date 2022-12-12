declare class gui {
    /**
     * gui handler for this live chat program
     * @param {HtmlWindow} window
     */
    constructor(window: HtmlWindow);
    window: HtmlWindow;
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
}
//# sourceMappingURL=gui.d.ts.map