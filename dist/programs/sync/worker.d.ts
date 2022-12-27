declare class syncWorkerProgram extends standardProg {
    init(): Promise<void>;
    /**
     * @type {syncSyncer}
     */
    sync: syncSyncer;
    abstractStatus: any;
    workerListener: any[];
    url: string;
    set status(arg: string);
    /**
     * <b>needsAuth</b>: no username and password saved;
     * <b>noAuth</b>: username and password saved, but authentification failed;
     * <b>authWait</b>: username and password saved, authentification in progress;
     * <b>syncing</b>: currently syncing files;
     * <b>idle</b>: waiting because we are lazy;
     * <b>synced</b>: synced all files. waiting for changes;
     * <b>offline</b>: no connection to server. waiting for connection. Retrying everytime it fails;<br>
     * @type {string}
     */
    get status(): string;
    start(register?: boolean): Promise<void>;
    options: any;
    /**
     * @type {syncWorkerConnection}
     */
    connection: syncWorkerConnection;
    msg(event: any): Promise<void>;
    message(data: any): Promise<string>;
    finish(): void;
    loading(): void;
}
//# sourceMappingURL=worker.d.ts.map