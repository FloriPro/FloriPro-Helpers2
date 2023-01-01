# Path
A path is a string that represents a file. It looks something like this: `c:/path/to/file.txt`.

The Path class makes using these paths easier.

## How to create a path
```js
const path = new System.path("c/user/hi.txt");
```

### Get the path
```js
console.log(path.path);
// c/user/hi.txt
```

### Get the path without the file
```js
console.log(path.folder());
// c/user
```

### Get the file
```js
console.log(path.file());
// hi.txt
```

### Get each section
```js
console.log(path.sections());
// ["c", "user", "hi.txt"]
```