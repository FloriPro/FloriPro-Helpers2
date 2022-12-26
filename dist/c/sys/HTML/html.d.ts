declare class Html {
    htmlEventList: {};
    htmlEventListThis: {};
    loadSystem(): Promise<void>;
    WindowHandler: WindowHandler;
    ContextMenu: ContextMenu;
    desktop: Desktop;
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
    movingFullscreen: boolean;
    usedWindowId: any[];
    /** @type {{[id: number]: HtmlWindow}} */
    windows: {
        [id: number]: HtmlWindow;
    };
    windowLayering: any[];
    /**
     * @type {presets}
     */
    presets: presets;
    /**
     *
     * @param {HtmlWindow} wind
     * @param {*} event
     * @param {*} show
     * @returns
     */
    windowShiftKeyOverlay(wind: HtmlWindow, event: any, show: any): Promise<void>;
    setWindowShiftKey(wind: any, event: any, x: any, y: any): void;
    iframeNoClick(): void;
    removeWindow(id: any): void;
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
    hideTaskbar(): Promise<void>;
    showTaskbar(): Promise<void>;
    updateTaskBar(): void;
    /**
     *
     * @param {HTMLDivElement} element
     */
    slowRemoveTaskbar(element: HTMLDivElement): Promise<void>;
    /**
     *
     * @param {HTMLDivElement} element
     */
    slowCreateTaskbar(element: HTMLDivElement): Promise<void>;
    /**
     *
     * @param {string} name
     * @param {boolean} ontop
     * @param {number} id
     * @param {HtmlWindow} window
     * @returns
     */
    createTaskBarProgram(name: string, ontop: boolean, id: number, window: HtmlWindow): HTMLDivElement;
    /**
     *
     * @param {string} name
     * @param {boolean} ontop
     * @param {number} id
     * @param {HtmlWindow} window
     * @param {HTMLDivElement} programDiv
     */
    setTaskbarDivValues(name: string, ontop: boolean, id: number, window: HtmlWindow, programDiv: HTMLDivElement): void;
    focus(id: any): Promise<void>;
}
declare class Desktop {
    grid: any;
    drag: number;
    didMove: boolean;
    buildDesktop(): Promise<void>;
    desktopIcons: any;
    save(): Promise<void>;
    existsLink(path: any): Promise<boolean>;
    addLink(run: any, name: any, icon: any): Promise<void>;
    #private;
}
declare var SystemHtml: Html;
//# sourceMappingURL=html.d.ts.map