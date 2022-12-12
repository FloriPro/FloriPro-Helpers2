declare class presets {
    /**
     * @param {string} title Title
     * @returns {Promise<string> | undefined} selected File / undefined
     */
    createFileSelect(title: string): Promise<string> | undefined;
    /**
     * @param {string} title Title
     * @returns {Promise<string | undefined>} selected File / undefined
     */
    createFileCreate(title: string): Promise<string | undefined>;
    /**
     *
     * @param {string} title
     * @param {string} text
     * @returns {Promise<string | undefined>} completes, when the window is closed
     */
    createNumSelect(title: string, text: string): Promise<string | undefined>;
    /**
     *
     * @param {string} title
     * @param {string} text
     * @returns {Promise<loadingPreset>} completes, when the window is closed
     */
    createLoading(title: string, text: string): Promise<loadingPreset>;
    /**
     *
     * @param {string} title
     * @param {string} text
     * @returns {Promise<string | undefined>} completes, when the window is closed
     */
    createStringSelect(title: string, text: string): Promise<string | undefined>;
    /**
     *
     * @param {string} title
     * @param {string} text
     * @returns {Promise<boolean>} completes, when the window is closed
     */
    createConfirm(title: string, text: string): Promise<boolean>;
    /**
     *
     * @param {string} title
     * @param {string} text
     * @returns {Promise<void>} completes, when the window is closed
     */
    createInformation(title: string, text: string): Promise<void>;
    /**
     * creates a contextMenu (normaly when you rightclick) at the cursor, the user can easly decide, what he wants.<br>-
     * <b>It currently doesn't resolve/reject the promise, when the select is closed!</b>
     * @param {string} textYes
     * @param {string} textNo
     * @returns {Promise<boolean>}
     */
    createFastConfirm(textYes: string, textNo: string): Promise<boolean>;
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
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    /**
     * sets the percentage of the window
     * @param {number} proc percentage to set
     */
    setNum(proc: number): Promise<void>;
    /**
     * sets the text of the window
     * @param {string} text text to set
     */
    setText(text: string): Promise<void>;
    /**
     * close window
     */
    stop(): void;
}
declare class informationPreset {
    load(title: any, text: any): Promise<any>;
    returnFunction: (value: any) => void;
    window: any;
}
//# sourceMappingURL=presets.d.ts.map