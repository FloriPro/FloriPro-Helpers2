declare class Html {
    htmlEventList: {};
    htmlEventListThis: {};
    loadSystem(): Promise<void>;
    WindowHandler: WindowHandler;
    ContextMenu: ContextMenu;
    updateStartmenu(): Promise<void>;
    loadStartMenu(_StartMenu: any): Promise<void>;
    elementArrayContainsClass(array: any, clas: any): boolean;
    htmlEventHandler(event: any): void;
    /**
     *
     * @param {Event} event
     */
    htmlEventParser(event: Event): void;
    removeAllEvents(id: any): void;
    addHtmlEvent(elementTag: any, id: any, callback: any, eventType: any, t: any, variables: any): void;
}
declare class ContextMenu {
    ContextEvent: {
        new (element: any, ogEvent: any): {
            target: any;
            originalEvent: any;
        };
    };
    showContext(eventButtons: any, position: any): void;
    createContextButton(name: any, information: any): HTMLButtonElement;
}
declare class WindowHandler {
    init(): Promise<void>;
    iframeConnections: {};
    windowsCreated: number;
    moving: boolean;
    usedWindowId: any[];
    /** @type {{[id:number]:HtmlWindow}} */
    windows: {
        [id: number]: HtmlWindow;
    };
    windowLayering: any[];
    /**
     * @type {presets}
     */
    presets: presets;
    iframeNoClick(): void;
    removeWindow(id: any): Promise<void>;
    /**
     * @async
     * @param {string} name Name of the window
     * @param {()=>void} readyCallback gets called, when the window is ready to be set
     * @returns {Promise<HtmlWindow>} Created window
     */
    createWindow(name: string, readyCallback: () => void): Promise<HtmlWindow>;
    getFreeId(): number;
    /**
     * Get Window by id
     * @param {number} id id of the window
     * @returns {HtmlWindow} requested window
     */
    getWindowById(id: number): HtmlWindow;
    /**
     * @returns {HtmlWindow}
     */
    get focusedWindow(): HtmlWindow;
    putWindowOnTop(id: any): void;
    updateWindowLayering(): void;
    updateTaskBar(): void;
    createTaskBarProgram(name: any, ontop: any, id: any, window: any): HTMLDivElement;
    focus(id: any): void;
}
declare var SystemHtml: Html;
//# sourceMappingURL=html.d.ts.map