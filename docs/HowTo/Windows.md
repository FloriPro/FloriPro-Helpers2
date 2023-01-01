## Content

- [Windows](#windows)
  - [How to create a window](#how-to-create-a-window)
  - [Size](#size)
    - [Disable resizing](#disable-resizing)
    - [Other forms of size](#other-forms-of-size)
      - [Read the state](#read-the-state)
  - [Apperance](#apperance)
    - [Title](#title)
    - [Logo](#logo)
    - [Minimize](#minimize)
  - [Working with the window content](#working-with-the-window-content)
    - [Adding content](#adding-content)
    - [Events](#events)
  - [Main Window Functions](#main-window-functions)

# Windows

Windows are the main way to display content to the user. They are also the main way to interact with the OS.

The user can have multiple windows open at the same time and move them around, resize them, close them, switch between them and so on.

## How to create a window

To create a window you need to create a class. Windows only work with classes. The class can also be a program and extend `System.program.default`.

Because windows are created async, it is recommended to use a async function. This is not required, but it is recommended.

When using a program the `init()` function is automaticaly called when the program is started. In this example we will use a normal class and thus need to call a async function manualy.

```js
class myWindow {
    constructor() {
        this.init();
    }

    async init() {
        // create the window
        this.window = await SystemHtml.WindowHandler.createWindow("Window Title", async () => {
            // this is called, when the window is fully initialized
        });
    }
}
```

This will create a window with the title "Window Title". The second argument is a function that is called, when the window is fully initialized. Currently noting happens with the window, so we need to add some content.

```js
class myWindow {
    constructor() {
        this.init();
    }

    async init() {
        this.window = await SystemHtml.WindowHandler.createWindow("Window Title", async () => {
            // set the content of the window
            this.window.setContent(`<h1>Hello World</h1>`);

            // set the size of the window
            this.window.size.setSize(500, 500);
        });
    }
}
```

The content that is set is in html, so this will show a Header with the text **Hello World**.

On creation a window has a verry small size, so you will most likely allways set the Size of the window. The size of the window is set in pixels. The first argument is the width and the second the height.

This size is the outer size of the window, so it includes the title bar and the border. To set the size for the content, use `window.size.setInnerSize(width, height)`.

> **Warning**
> Many of the below noted methods are async. This means that they return a promise. If you want to use the return value, you need to use `await` or `.then()`. Please look in the [Api Documentation](../../dist/c/sys/HTML/HtmlWindow.d.ts) for informations about the return values.

## Size

The window can be resized by the user. To get notified when the window is resized, you can use the `window.onResize` event.

```js
class myWindow {
    constructor() {
        this.init();
    }

    async init() {
        this.window = await SystemHtml.WindowHandler.createWindow("Window Title", async () => {
            this.window.setContent(`<h1>Hello World</h1>`);

            this.window.size.setSize(500, 500);

            // add a event listener to the window
            this.window.onResize = () => {
                var size = this.window.size.getSize();
                alert("Window was resized to width:" + size[0] + " height:" + size[1]);
            };
        });
    }
}
```

### Disable resizing

If you don't want the user to be able resize the window, you can call `window.size.userCanResize(false)`.

You can reanable it by calling `window.size.userCanResize(true)`.

### Other forms of size

There are 2 other ways a window can be shown, maximized and fullmax.

Maximized is when the window is shown as big as possible, but not full screen, so thet title bar is still visible.

Fullmax is when the window is shown as big as possible. It fills the whole screen. Only the content is visible, the title bar aswell as the taskbar is not visible. It can only be exited by right clicking the window and clicking "size normal"

-   `window.size.setMax()` will set the window to maximized.

-   `window.size.setfullMax()` will set the window to fullmax so it fills the whole screen.

-   `window.size.notMax()` will set the window to the windowed state. This is the default state. It will set the window to the size it had before it was maximized or fullmaxed.

#### Read the state

-   `window.size.max` is true if the window is maximized(fullmax or normal max).

-   `window.size.fullMax` only is true if the window is fullmax.

## Apperance

You can also change the apperance of the window.

### Title

You can hide and show the title bar by calling `window.appearence.showTitle(false)` or `window.appearence.showTitle(true)`.

### Logo

You can set a logo for the window by calling `window.appearence.setLogo("path/to/logo.png")` or `window.appearence.setLogoString("<image source string>")`.

You can also hide or show the logo by calling `window.appearence.hideLogo()` or `window.appearence.showLogo()`.

### Minimize

Users can minimize a window or showing it again. A program can also minimize a window by calling `window.appearence.minimize()` and show it again by calling `window.appearence.show()`.

## Working with the window content

### Adding content

`window.setContent(html)` will set the content of the window. The argument is the html as a string that should be set. _As stated in the Introduction_

Html Elements that you want to interact with, need an attribute `element`. This name can be used to get the element from the window.

To get an element from the window, you can use `window.getHtmlElement(<name>)`. This will return a promise that resolves to the element. If you want to get multiple elements, you can use `window.getHtmlElements(<name>)`. This will return a promise that resolves to an array of elements.

_Only use this. It helps with keeping two of the same windows appart_

```html
<div element="container">
    <p>Status: <span element="status">Loading</span></p>
</div>
```

```js
class myWindow {
    constructor() {
        this.init();
    }

    async init() {
        this.window = await SystemHtml.WindowHandler.createWindow("Window Title", async () => {
            //load the html from a file to improve the readability
            this.window.setContent(await SystemFileSystem.getFileString("c/path/to/the/above/html/file.html"));

            //get the element
            var status = await this.window.getHtmlElement("status");

            //set the text of it
            status.innerText = "Done";

            await delay(1000);

            //remove the container
            (await this.window.getHtmlElement("container")).remove();
        });
    }
}
```

> **Note**
> If you add a new element to the window, you need to run `window.parseNewHtml()` to make it searchable.

### Events

_TODO_

## Main Window Functions

-   `window.makeClose()` will close the window. This is the same as clicking the close button. The program is notified by the `window.close(): boolean | Promise<boolean>` event.

    `window.close()` should be set by the program. If you don't want the window to close it can return false. If you want to close the window you need to return true. It should be used to stop the program or save the data.

    The response can also be a promise. If the promise resolves to true, the window will close. If it resolves to false, the window will not close.

-   `window.resize()` <[Statet in the size section](#size)>
-   `window.setPoition(x, y)` will set the position of the window. The first argument is the x position and the second the y position. The position is in pixels.
-   `window.getPosition()` will return the position of the window. It returns an array with the x position as the first element and the y position as the second element.
-   `window.rename(name)` will rename the window. The first argument is the new title.
-   `window.getHtml()` will return the html of the content of the window.
-   `window.setContentIframe(html)` will set the content of the window. The first argument is the html as a string that should be set. The difference to `window.setContent()` is that the content is set in an iframe. This is usefull if you want to use css that is allready present in the content.
-   `getTitle()` will return the title of the window.
