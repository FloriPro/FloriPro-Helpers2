## Content

# SystemFileSystem

[Documentation File](../../dist/c/sys/filesys.d.ts)

## Methods

-   **`setFileString(path: string, data: string, dispatchEvent?: boolean)): Promise<void>`** This sets the content of the file at the given path to the data. It creates a file if it does not exist. It normaly dispatches an event in the [changes Class](#changes-class), but you can disable it by setting dispatchEvent to false.
-   **`getFileString(path: string, raw?: boolean | null): Promise<string>`** Returns the content of the file at the given path. If it doesn't exist it returns an empty string and prints an error to the console. If the file is a [Online Data file](#online-data) it will download the data with fetch and return it. if raw is true it will return the ".od\_\_" and after that the link
-   `fileExists(path: any): Promise<boolean>` Checks if the file at the given path exists and returns true if so. Otherwise false.
-   `getFileJson(path: string): Promise<any>;` Returns the json.parse object of the file content at the given path. If it doesn't exist it returns a null object and prints two errors to the console. If the json could not be parsed it prints an error to the console. (=> hence the two errors 1: file not found, 2: json parse error)
-   `createFolder(path: string, name: string): Promise<void>` Creates a folder at the given path, with the given name. If the folders to the folder don't exist, it will be created. The path must not contain the folder name that should be created.
-   `getFiles(path: string): Promise<string[]>;` Returns a Array of strings which all are contained in the folder at the given path. If the folder does not exist it errors.
-   `getFolders(path: string): Promise<string[]>;` Returns a Array of strings which all are contained in the folder at the given path. If the folder does not exist it errors.
-   `removeFile(path: string): Promise<void>;` Removes the file at the given path. If the file does not exist it errors. It will also dispatch an event to the [changes Class](#changes-class).
-   `removeFolder(path: string): Promise<void>;` Removes the folder at the given path. If the folder does not exist it errors. It will also remove all the files and folders in that folder.
-   `moveInFolder(path: string, to: string): Promise<void>;` Moves the files and folders at the given path to the folder at the given path. If the file or folder does not exist it errors. If the folder does not exist it errors. It will also dispatch for every File it moves an _delete_ and _change_ event to the [changes Class](#changes-class).
-   `toImg(str: string): string` - Converts a unencoded image string to an image source that.
    ##### Ignorable:
-   `getFolder(path: string): FileSysFolder;` Returns a [FileSysFolder](#filesysfolder-class) this currently cant do much.
-   `getFile(path: string): Promise<FileSysFile>;` Returns a [FileSysFile](#filesysfile-class) this currently cant do much.
-   `createFile(path: string): Promise<boolean>` Creates a file at the given path. It allways returns ture. If the folders to the file don't exist, it will be created. The path must contain the full file name.
-   `reset(): Promise<void>` - Resets the FileSystem exept the files in 'c/persistendFiles.json'
-   `unpackPackage(data: string): Promise<void>` - Unpackages a .json file that contains multiple files and folders. The files content is base64 encoded.
    ```json
    {
        "main.txt": "SGVsbG8gV29ybGQh",
        "folder": {
            "subfile.txt": "VGhpcyBpcyBhIHN1YmZpbGU="
        }
    }
    ```
    These files and folders will be unpacked to "c/\_temp/".

## changes class

-   `addListener(listener: (path: any, dat: any) => {}): void;` - Adds a listener to the File System. The listener will be called when a file is changed or deleted. The listener will be called with the **path** of the file and the type of event: **change** or **delete**.
-   `removeListener(listener: (path: any, dat: any) => {}): void;` - Removes a listener from the File System. Pass in the function that you want to remove.
-   `send(path: string, type: any): void;` - Sends a change to all the listeners. This is used by the [setFileString](#methods) and [removeFile](#methods) method.

## FileSysFile class

_TODO_

## FileSysFolder class

_TODO_

## Online Data

This is a method to load big files, without needing to store them in the local storage. It is a file that starts with ".od\_\_" and after that a link to the data to downlaod.

Example:

```
.od__https://images.ctfassets.net/hrltx12pl8hq/5KiKmVEsCQPMNrbOE6w0Ot/341c573752bf35cb969e21fcd279d3f9/hero-img_copy.jpg
```

_(from "c/user/backgrounds/background2.jpg")_
