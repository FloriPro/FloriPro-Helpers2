declare class program extends standardProg {
    init(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    anychartContainerId: string;
    passw: string;
    voteId: any;
    /**
     * @type {n}
     */
    network: n;
    anyReady(): void;
    anychart: any;
    reload(): Promise<void>;
    loadData(data: any): Promise<void>;
    currentType: any;
    /**
     * gets called when the data of the current chart gets changed
     */
    update(data: any): Promise<void>;
    /**
     * @param {string} type bar
     * @param {string} label "# of Votes"
     * @param {string[]} labels ["red", "blue"]
     * @param {number[]} data [1, 2]
     * @param {boolean} beginAtZero false
     */
    load(type: string, label: string, labels: string[], data: number[], beginAtZero: boolean): Promise<void>;
    currentChart: any;
}
declare class create {
    constructor(path: any);
    PATH: any;
    load(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
}
declare class qrCode {
    constructor(url: any, path: any);
    url: any;
    PATH: any;
    load(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
}
//# sourceMappingURL=main.d.ts.map