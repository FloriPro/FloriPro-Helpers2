declare class Html {
    htmlEventList: {};
    htmlEventListThis: {};
    loadSystem(): Promise<void>;
    WindowHandler: WindowHandler;
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
declare class WindowHandler {
    moving: boolean;
    usedWindowId: any[];
    /** @type {{[id:number]:HtmlWindow}} */
    windows: {
        [id: number]: HtmlWindow;
    };
    windowLayering: any[];
    presets: presets;
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
    get focusedWindow(): any;
    putWindowOnTop(id: any): void;
    updateWindowLayering(): void;
    updateTaskBar(): void;
    createTaskBarProgram(name: any, ontop: any, id: any): HTMLDivElement;
    focus(id: any): void;
}
declare class HtmlWindow {
    constructor(id: any);
    makeClose(): void;
    remove(): void;
    ontop: boolean;
    size: {
        parent: any;
        max: boolean;
        maxBefore: {
            pos: number[];
            size: number[];
            userResize: boolean;
        };
        /**
         * sets the x/y size of the window, if defined
         * @param {number | undefined} x
         * @param {number | undefined} y
         */
        setSize(x: number | undefined, y: number | undefined): Promise<void>;
        getSize(): Promise<any[]>;
        htmlSizing(): Promise<void>;
        userCanResize(yn: any): void;
        maxToggle(): Promise<void>;
        setMax(): Promise<void>;
    };
    appearence: {
        parent: any;
        title: boolean;
        showTitle(yn: any): void;
    };
    canUserResize: boolean;
    close: () => boolean;
    onResize: () => void;
    onReady: () => void;
    /**
     * returns the window id
     * @returns {number}
     */
    getId(): number;
    /**
     * sets the window position
     * @param {number} x
     * @param {number} y
     */
    setPosition(x: number, y: number): void;
    /**
     * returns position
     * @returns {[number,number]} [x,y]
     */
    getPosition(): [number, number];
    /**
     * renames the window
     * @param {string} name
     */
    rename(name: string): Promise<void>;
    load(id: any, name: any): Promise<void>;
    /**
     * Only used by the programm for resizing
     * @param {number} sizeX
     * @param {number} sizeY
     */
    addWindowSize(sizeX: number, sizeY: number): void;
    /**
     *
     * @returns {HTMLDivElement}
     */
    getHtml(): HTMLDivElement;
    /**
     * sets the Dom of the Window and parses it
     * @param {string} htmlstr
     */
    setContent(htmlstr: string): Promise<void>;
    /**
     * get the title of this window
     * @returns {string} title of this window
     */
    getTitle(): string;
    /**
     * returns this element
     * @param {string} tag only alphanumeric string
     * @returns {Promise<HTMLElement>}
     */
    getHtmlElement(tag: string): Promise<HTMLElement>;
    /**
     * returns this element
     * @param {string} tag only alphanumeric string
     * @returns {Promise<NodeListOf<HTMLElement>>}
     */
    getHtmlElements(tag: string): Promise<NodeListOf<HTMLElement>>;
    /**
     *
     * @param {string} event Html element Event (e.g. onclick)
     * @param {string} htmlElementTag Html Element "element" tag ('<div element="tagofdoom"></div>': 'tagofdoom')
     * @param {(variable, id, ?, event)} callback run when the event is triggered
     * @param {ThisType} t the class to run the callback function in
     * @param {*} variable one variable passed in the callback function
     */
    addHtmlEventListener(event: string, htmlElementTag: string, callback: (variable: any, id: any, ?: any, event: any) => any, t: ThisType<any>, variable: any): Promise<void>;
    /**
     * removes **ALL** event listeners on *this* window
     */
    removeAllEventListeners(): Promise<void>;
    /**
     * needs to be called, *before* adding an event to an Element added *not* by {@link setContent}
     */
    parseNewHtml(): Promise<void>;
    /**
     * sets the z-index to id ≙ layer
     * @param {number} id
     */
    setLayer(id: number): Promise<void>;
    #private;
}
declare class presets {
    /**
     * @param {string} title Title
     * @returns {Promise<string> | undefined} selected File / undefined
     */
    createFileSelect(title: string): Promise<string> | undefined;
    /**
     * @param {string} title Title
     * @returns {Promise<string> | undefined} selected File / undefined
     */
    createFileCreate(title: string): Promise<string> | undefined;
    createNumSelect(title: any, text: any): Promise<any>;
    createLoading(title: any, text: any): Promise<loadingPreset>;
    createStringSelect(title: any, text: any): Promise<any>;
    createConfirm(title: any, text: any): Promise<any>;
}
declare class fileSelectPreset {
    load(title: any): Promise<any>;
    path: any;
    returnFunction: (value: any) => void;
    window: any;
    create(): Promise<void>;
    button1(_: any, __: any, vars: any): Promise<void>;
    button2(_: any, __: any, vars: any): Promise<void>;
    back(): Promise<void>;
}
declare class fileCreatePreset {
    load(title: any): Promise<any>;
    path: any;
    returnFunction: (value: any) => void;
    window: any;
    create(): Promise<void>;
    ok(): Promise<void>;
    button1(_: any, __: any, vars: any): Promise<void>;
    button2(_: any, __: any, vars: any): Promise<void>;
    back(): Promise<void>;
}
declare class numSelectPreset {
    load(title: any, text: any): Promise<any>;
    returnFunction: (value: any) => void;
    window: any;
}
declare class stringSelectPreset {
    load(title: any, text: any): Promise<any>;
    returnFunction: (value: any) => void;
    window: any;
}
declare class confirmPreset {
    load(title: any, text: any): Promise<any>;
    returnFunction: (value: any) => void;
    window: any;
}
declare class loadingPreset {
    load(title: any, text: any): Promise<any>;
    returnFunction: (value: any) => void;
    window: any;
    setNum(proc: any): Promise<void>;
    stop(): void;
}
declare var SystemHtml: Html;
//# sourceMappingURL=html.d.ts.map