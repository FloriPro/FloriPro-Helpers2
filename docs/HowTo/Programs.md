# Programs

## What is a program?

A program is a File that returns the Object of a class that extends `System.program.default`. It has some special properties that will help you.

## How to create a program?

To create a program you need to create a file, something like this:

```js
class myProgram extends System.program.default {
    constructor() {
        super();
        //you DON'T write anything here
    }

    // arguments can be undefined if no arguments are passed in
    // when the program is started via clicking on a file the Explorer, the argument is the path to the file (System.open(<path>))
    async init(arguments) {
        // This is called when the program is started
    }
}

new myProgram();
```

This is the basic structure of a program. You can add more functions and properties to it, but you need to call the `super()` function in the constructor.

## How to start a program?

You can start a program by calling the `System.program.start()` function. It takes 2 arguments:

-   path to the Program
-   Optionaly The arguments, that can be anything

```js
System.program.runProgram("c/programs/textEditor/main.js", "c/path/to/file.txt");
System.program.runProgram("c/programs/textEditor/main.js", ["anything", "else"]);
System.program.runProgram("c/programs/textEditor/main.js");
```

## How to set a file to a program

To open your program when clicking on a File, you will need to set the option "fileExtensionOpener" to your program path.

```js
System.options.addValue("fileExtensionOpener", "ext", "c/your/program.js", true);
```

This will set the OS to run the program "c/your/program.js" for files with the extension "ext", when System.open("\<path>.ext") is called (The Explorer uses that to open files).

## Special to programs

-   `this.PATH` - The path, where the program was executed. This is a [path Object](../api/System/path.md)
-   `this.stop()` - stops the program and calls `isStopping()` on the program.
-   `setInterval(callback, interval, variable)` - sets an intervall to call every \<interval> ms
-   `setPublicListener(message, name)` - Can be used to make the program easly accesable from other scripts / programs. The name is the Identifyer on how to find the program. Message is the function to be called, when it recieves a message. It gets the data, that was provied by the messanger.<br> It can be messaged with `System.program.connect.send("programmIdentifyer", ["the", "important", data]);`
