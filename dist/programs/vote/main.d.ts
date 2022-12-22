declare class program extends standardProg {
    init(): Promise<void>;
    /**
     * @type {HtmlWindow}
     */
    window: HtmlWindow;
    anychartContainerId: string;
    passw: string;
    voteId: any;
    anyReady(): void;
    anychart: any;
    reload(): Promise<void>;
    loadData(data: any): Promise<void>;
    currentType: any;
    update(): Promise<void>;
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
//# sourceMappingURL=main.d.ts.map