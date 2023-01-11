declare class errorHandler {
    errors: number;
    sendErrors: boolean;
    haltAt: string[];
    getId(): Promise<void>;
    id: string;
    /**
     * recursive function to get all data from an error / log (see jShell object analyzer)
     * @param {any} element
     * @returns
     */
    getFullErrordata(element: any, parent?: any, i?: number): Promise<{
        name: any;
        type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
        value: string;
        children: any[];
    }[]>;
    getObject(element: any, m: any, parent: any, i: any): Promise<{
        name: any;
        type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
        value: string;
        children: any[];
    }>;
    eh(dat: any): Promise<void>;
    sendError(dat: any): Promise<void>;
}
//# sourceMappingURL=errorHandler.d.ts.map