declare class sys {
    options: options;
    program: any;
    settings: settingsHandler;
    network: Network;
    path: typeof Path;
    createEvents(): Promise<void>;
    eventHandler: eventHandler;
    run(path: any): Promise<any>;
    makeid(length: any): string;
    open(path: any): Promise<void>;
}
declare class Network {
    /**
     * @param {RequestInfo | URL} input
     * @param {...RequestInit} init
     * @returns {Promise<Response>}
     */
    fetch(input: RequestInfo | URL, ...init: RequestInit[]): Promise<Response>;
}
declare class Path {
    constructor(path: any);
    path: any;
    sections(): any;
    file(): any;
    folder(): any;
}
declare class program {
    programRegister: {};
    default: typeof standardProg;
    runProgram(path: any, args: any): Promise<any>;
    runProgramString(dat: any, path: any, args: any): Promise<any>;
    /**
     *
     * @returns {number}
     */
    findFreeId(): number;
    stop(id: any): void;
}
declare class standardProg {
    id: number;
    /**
     * gets called, when the system has initialized the program
     * @param {string[]} args
     */
    init(): void;
    /**
     * called by the program to stop itself
     */
    stop(): void;
    /**
     * called when program gets killed
     */
    isStopping(): void;
}
declare class options {
    /**
     * returns the data of an option (allways a dict)
     * @param {string} option name of the option whitch contains a dict of values
     * @returns {{string:*}} dict of the values of the option
     */
    get(option: string): {
        string: any;
    };
    /**
     * adds something to the dict of an option
     * @param {string} option
     * @param {string} name
     * @param {*} data
     * @param {string | undefined} overwrite optional
     */
    addValue(option: string, name: string, data: any, overwrite: string | undefined): Promise<boolean>;
}
declare class eventHandler {
    lifeMakerVars: {};
    handlers: {};
    construct(): Promise<void>;
    replacementEvents: {
        string: any;
    };
    replacementEventsK: string[];
    shouldPrevent: {
        string: any;
    };
    events: string[];
    /**
     * @param {string} type
     * @param {(event: Event) => void | true} handler if return true: all further event's get canceld
     */
    addEventHandler(type: string, handler: (event: Event) => void | true, vars: any): boolean;
    /**
     * handles every event that exists
     * @param {Event} event
     */
    event(event: Event, type: any, replacement: any): void;
}
declare class settingsHandler {
    settingsUpdater: {};
    addSettingsUpdater(name: any, callback: any): void;
    settingUpdated(name: any): void;
}
declare var System: sys;
//# sourceMappingURL=sys.d.ts.map