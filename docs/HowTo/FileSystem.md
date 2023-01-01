## Content

- [File System](#file-system)
  - [Saving files when reseting](#saving-files-when-reseting)
    - [Sync](#sync)
  - [Examples of the File System](#examples-of-the-file-system)
    - [Create a file](#create-a-file)
    - [Set a file](#set-a-file)
    - [Use as a Storage](#use-as-a-storage)

# File System

The File System is handled by the global variable `SystemFileSystem`. Information on how to Use The File System: [SystemFileSystem](../api/systemFileSystem.md)

Please only use the File System to store data, that you want to be saved. Do not use Cookies or LocalStorage, because they are not controlled by the OS. And make it hard(-er) to acces by the user.

## Saving files when reseting

When you want the System to remember your files, even after Reseting, you will need to add your file to the "**persistandFiles.json**" file.

```js
var persistandFiles = await SystemFileSystem.getFileJson("c/persistandFiles.json");
persistandFiles.push("c/user/live.txt");
await SystemFileSystem.setFileString("c/persistandFiles.json", JSON.stringify(persistandFiles));
```

### Sync

Notice, that when the user has the Program 'Sync' installed, it will sync the files to a Server. And thus you won't need persistand Files. Also don't overdo it, because when you reset, you actually want to have you System reset.

## Examples of the File System

### Create a file

```js
await SystemFileSystem.createFile("c/user/test.txt");
```

### Set a file

```js
await SystemFileSystem.setFileString("c/user/test.txt", "Hello World");
```

### Use as a Storage

```js
function setData(data){
    await SystemFileSystem.setFileString("c/user/test.txt", JSON.stringify(data))
}
function getData(){
    return await SystemFileSystem.getFileJson("c/user/test.txt")
}

setData({
    "username": "John",
    "passowrd": "1234"
});

///////////////////
//reload the page//
///////////////////

getData() // {"username": "John", "passowrd": "1234"}
```
