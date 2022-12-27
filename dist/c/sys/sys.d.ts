declare class sys {
    options: options;
    program: systemProgramHandler;
    settings: settingsHandler;
    network: Network;
    console: MyConsole;
    notification: Notifications;
    path: typeof Path;
    SystemFileSystem: FileSystemClass;
    createEvents(): Promise<void>;
    eventHandler: eventHandler;
    /**
     * run a javascript file
     * @param {string} path path to the file
     * @param {boolean} noPath if true, the path variable will not inserted at the beginning of the file
     * @returns {Promise<any>} the return value of the file
     */
    run(path: string, noPath?: boolean): Promise<any>;
    /**
     * gives a random alphanumeric string
     * @param {number} length
     * @returns {string} random alphanumeric string
     */
    makeid(length: number): string;
    /**
     * opens a file with the right program
     * @param {string} path
     */
    open(path: string): Promise<void>;
    /**
     * gives you the class of the libary
     * @param {string} name libary name
     * @returns {Promise<typeof Class>}
     */
    getLib(name: string): Promise<typeof Class>;
}
declare class MyConsole {
    /**
     * @type { [string, *][] }
     */
    logs: [string, any][];
    listeners: {};
    /**
     * Internal method
     * @param {string} type
     * @param  {...any} dat
     * @returns
     */
    add(type: string, ...dat: any[]): void;
    /**
     * add an event listener on any console log
     * @param {([type,loggedObject]:[string, any], variable:any)} callback gets called
     * @param {*} variable
     * @returns
     */
    addListener(callback: ([type, loggedObject]: [string, any], variable: any) => any, variable: any): string;
    /**
     * remove an event listener
     * @param {string} id event listener id
     */
    removeListener(id: string): void;
    /**
     * returns a list of all last 100 console logs
     * @returns {string[]}
     */
    getString(): string[];
    /**
     * returns a list of all last 100 console logs
     * @returns
     */
    get(): [string, any][];
}
declare class Network {
    /**
     * @param {RequestInfo | URL} input
     * @param {RequestInit} init
     * @returns {Promise<Response>}
     */
    fetch(input: RequestInfo | URL, init: RequestInit): Promise<Response>;
    informationalFetch_Text(url: any, opts: {}, onProgress: any, title?: string, text?: string): Promise<any>;
}
declare class Path {
    constructor(path: any);
    path: any;
    /**
     * [folder1, folder2, folder3, file]
     * @returns {string[]}
     */
    sections(): string[];
    /**
     * name of the file
     * @returns {string}
     */
    file(): string;
    /**
     * path to the file
     * @returns {string}
     */
    folder(): string;
}
declare class systemProgramHandler {
    programRegister: {};
    default: typeof standardProg;
    connect: {
        parent: any;
        /**
         * send a message to a publicly registered program
         * @param {string} name
         * @param {*} message
         * @returns {Promise<boolean | any>}
         */
        send(name: string, message: any): Promise<boolean | any>;
        /**
         *
         * @param {string} name
         * @returns {boolean}
         */
        listenerExists(name: string): boolean;
    };
    publicPrograms: {};
    intervalHandlers: {};
    /**
     * Install a libary
     * @param {string} name name of the libary
     * @param {boolean} overwrite overwrite the libary if it exists
     */
    libInstall(name: string, overwrite: boolean): Promise<boolean>;
    /**
     * checks if a program/libary is installed
     * @param {string} name name of the program/libary
     * @returns {Promise<boolean>} true if the program/libary exists, false otherwise
     */
    installed(name: string): Promise<boolean>;
    /**
     * starts a program form a file
     * @param {string} path the path to the program
     * @param {*} args a argument that gets passed to the program when it is started
     * @returns {Promise<program>} the created program
     */
    runProgram(path: string, args: any): Promise<program>;
    /**
     * starts a program from the string provided in "dat"
     * @param {string} dat the program string to start
     * @param {string} path the path to the program
     * @param {*} args a argument that gets passed to the program when it is started
     * @returns {Promise<program>} the created program
     */
    runProgramString(dat: string, path: string, args: any): Promise<program>;
    /**
     * uses installPackage to install the package from this github repository
     * @param {string} name
     * @param {boolean} overwrite should overwrite if allready exists
     * @return {Promise<boolean>} was the package installed successfully
     */
    easyPackageInstall(name: string, overwrite: boolean): Promise<boolean>;
    /**
     * installs a package. Can allso display the progress in a window
     * @param {string} data package
     * @param {boolean} display show prograss in a window
     * @param {loadingPreset} displayWindow the window to display the progress
     * @param {boolean} showInstallInfo show the install info in the window
     * @param {string} name name of the package (needed for libs)
     * @param {boolean | undefined} isLib true, if the package is a libary
     */
    installPackage(data: string, display: boolean, displayWindow: loadingPreset, showInstallInfo: boolean, name: string, isLib: boolean | undefined): Promise<void>;
    /**
     * finds a free id for a now program
     * @returns {number}
     */
    findFreeId(): number;
    /**
     * stop the with id named program
     * @param {number} id
     */
    stop(id: number): void;
    /**
     * get the program of the given id
     * @param {number} id
     * @return {standardProg}
     */
    get(id: number): standardProg;
    setInterval(callback: any, interval: any, variable: any, programId: any): void;
    handleInterval(callback: any, programId: any, variable: any): void;
    /**
     *
     * @param {(message:*)=>{}} message
     * @param {string} name
     * @returns {Promise<boolean>} true, if it succeded to add. False if it allready existed
     */
    addPublicListener(message: (message: any) => {}, name: string): Promise<boolean>;
}
declare class standardProg {
    /**
     * @type {Path}
     */
    PATH: Path;
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
    /**
     * adds a interval that gets called with the given variable every interval. The interval gets stopped when the program stops.
     * @param {(variable: *)=>{}} callback
     * @param {number} interval ms
     * @param {*} variable
     * @returns {number} interval id
     */
    setInterval(callback: (variable: any) => {}, interval: number, variable: any): number;
    /**
     *
     * @param {(message:*)=>{}} message
     * @param {string} name
     * @returns {Promise<boolean>} true, if it succeded to add. False if it allready existed
     */
    setPublicListener(message: (message: any) => {}, name: string): Promise<boolean>;
}
declare class options {
    /**
     * returns the data of an option (allways a dict)
     * @param {string} option name of the option whitch contains a dict of values
     * @returns {Promise<{ [any: string]: any }} dict of the values of the option
     */
    get(option: string): Promise<{
        [any: string]: any;
    }>;
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
    keysDown: {};
    mouse: {
        x: number;
        y: number;
    };
    mouseDownTime: number;
    onmobile: boolean;
    longClick: boolean;
    construct(): Promise<void>;
    replacementEvents: {
        [any: string]: any;
    };
    replacementEventsK: string[];
    shouldPrevent: {
        [any: string]: any;
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
    /**
     * calback gets called when the specified setting changes
     * @param {string} name the name of the setting to view
     * @param {(settingsName)} callback
     */
    addSettingsUpdater(name: string, callback: settingsName): void;
    /**
     * gets called this when a setting changes.
     * Internal method
     * @param {string} name
     * @returns
     */
    settingUpdated(name: string): void;
}
declare class Notifications {
    /**
     *
     * @returns {Promise<false | Notification>} false if it failed, Notification if it worked
     */
    desktopNotification(title: any, body: any, icon: any): Promise<false | Notification>;
    /**
     *
     * @returns {Promise<boolean>} true if permission was granted, false if it failed
     */
    requestPermission(): Promise<boolean>;
}
declare var Class: {
    new (): {};
};
declare var System: sys;
//# sourceMappingURL=sys.d.ts.map