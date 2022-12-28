declare class syncSyncer {
    /**
     *
     * @param {syncWorkerProgram} parent
     */
    constructor(parent: syncWorkerProgram);
    hasListener: boolean;
    /**
     * @type {syncWorkerProgram}
     */
    parent: syncWorkerProgram;
    waitingForAnswer: {
        list: any[];
        update: () => void;
        pop(path: any): void;
        push(path: any): void;
    };
    /**
     *
     * @param {?string} path
     * @returns {Promise<string[]>}
     */
    getUserFiles(path?: string | null): Promise<string[]>;
    initialSync(): Promise<void>;
    createListener(): Promise<void>;
    /**
     *
     * @param {string} path
     * @param {string} type
     */
    changeListener(path: string, type: string): Promise<void>;
    /**
     *
     * @param {{string:string}} hashes
     */
    updateFiles(hashes: {
        string: string;
    }): Promise<void>;
}
//# sourceMappingURL=sync.d.ts.map