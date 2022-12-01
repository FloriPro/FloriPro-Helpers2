declare class HtmlWindow {
    constructor(id: any);
    makeClose(): void;
    /**
     * remove the window
     */
    remove(): void;
    ontop: boolean;
    size: {
        transitionTime: number;
        /**
         * @type {HtmlWindow}
         */
        parent: HtmlWindow;
        max: boolean;
        fullMax: boolean;
        maxBefore: {
            normal: {
                pos: number[];
                size: number[];
                userResize: boolean;
                showTitle: boolean;
            };
            fullmax: {};
            max: {};
        };
        /**
         * sets the x/y size of the window, if defined
         * @param {number | undefined} x
         * @param {number | undefined} y
         */
        setSize(x: number | undefined, y: number | undefined): Promise<void>;
        getSize(): number[];
        htmlSizing(): Promise<void>;
        userCanResize(yn: any): void;
        maxToggle(): Promise<void>;
        setfullMax(): Promise<void>;
        notMax(): Promise<void>;
        setMax(): Promise<void>;
        updateMax(): Promise<void>;
        setInnerSize(x: any, y: any): Promise<void>;
        disableOverflow(): Promise<void>;
        showOverflow(): Promise<void>;
    };
    appearence: {
        transitionTime: number;
        /**
         * @type {HtmlWindow}
         */
        parent: HtmlWindow;
        title: boolean;
        shown: boolean;
        showTitle(yn: any): void;
        minimize(): Promise<void>;
        show(): Promise<void>;
        toggleMinimize(): Promise<void>;
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
     * @returns {void}
     */
    rename(name: string): void;
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
//# sourceMappingURL=HtmlWindow.d.ts.map