declare class FileSystemClass {
    PositionalFileSystem: typeof PositionalFileSystem;
    realLocalStorage: Storage;
    reset(): Promise<void>;
    removeLocalStorage(): Promise<void>;
    /**
     * unpacks the package to "c/_temp/"
     * @param {string} data
     */
    unpackPackage(data: string): Promise<void>;
    toImg(str: any): string;
    /**
     * sets the String of a file
     * @param {string} path
     * @param {string} dat
     */
    setFileString(path: string, dat: string): Promise<void>;
    createFile(path: any): Promise<boolean>;
    createFolder(path: any, name: any): Promise<void>;
    fileExists(path: any): Promise<boolean>;
    /**
     * returns the content of a file
     * @param {string} path
     * @returns {Promise<string>}
     */
    getFileString(path: string): Promise<string>;
    bufferToString(buf: any, l: any): Promise<string>;
    /**
     * returns the json parsed content of a file
     * @param {string} path
     * @returns {*}
     */
    getFileJson(path: string): any;
    /**
     *
     * @param {string} path
     * @returns {FileSysFile} FileSysFile
     */
    getFile(path: string): FileSysFile;
    /**
     *
     * @param {string} path
     * @returns {FileSysFolder} FileSysFolder
     */
    getFolder(path: string): FileSysFolder;
    /**
     * loads the file from local storage
     * @param {string} path
     * @return {string}
     */
    localFileLoad(path: string): string;
    getUnusedId(): number;
    /**
     *
     * @param {string} path
     * @returns {string[]} list of files
     */
    getFiles(path: string): string[];
    /**
     *
     * @param {string} path
     * @returns {string[]} list of folders
     */
    getFolders(path: string): string[];
    /**
     *
     * @param {string} path
     * @param {string} p
     * @param {*} dat
     * @returns {*} Part of the FileSystemTable starting at the desired path
     */
    getTablePos(path: string, p: string, dat: any): any;
    /**
     * removes a file
     * @param {string} path
     */
    removeFile(path: string): Promise<void>;
    /**
     * removes the folder and its contents
     * @param {string} path
     */
    removeFolder(path: string): Promise<void>;
    /**
     * move all files/folders in a folder to another folder
     * @param {string} path
     * @param {string} to
     */
    moveInFolder(path: string, to: string): Promise<void>;
    moveRecursivlyIn(path: any, to: any): Promise<void>;
}
declare class packageLoader {
    loader(d: any): Promise<void>;
    load(data: any, path: any): Promise<void>;
    b64_to_utf8(str: any): string;
}
declare class FileSysFile {
    constructor(path: any, text: any);
    path: any;
    text: any;
    remove(): Promise<boolean>;
    rename(): Promise<boolean>;
    getInformation(): Promise<boolean>;
}
declare class FileSysInfo {
    createdDate: string;
}
declare class FileSysFolder {
    constructor(path: any);
    path: any;
    files: any[];
    folders: any[];
}
declare class PositionalFileSystem {
}
declare var SystemFileSystem: FileSystemClass;
//# sourceMappingURL=filesys.d.ts.map