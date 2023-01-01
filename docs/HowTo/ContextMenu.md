## Content

- [Context Menu](#context-menu)
  - [How to add a context menu](#how-to-add-a-context-menu)
    - [contextscript](#contextscript)
    - [contextdat](#contextdat)

# Context Menu

You can add a Context Menu to any element. When you right click on the element, the Context Menu will show up. The Context Menus of the parent elements will all combine to one Context Menu.

## How to add a context menu

As stated you can add it to any element.

### contextscript

To add it you can set the variable `contextscript` to a method that returns a dictionary.

```js
element.contextscript = () => {
    return {
        key: () => {
            alert("key1");
        },
        key2: () => {
            alert("key2");
        },
    };
};
```

You now have added a context menu to the element. When you right click on the element, it will show two options: `key` and `key2`. When you click on one of them, it will `alert()` the string "key1" or "key2".

The contextscript method will get a variable with the element that it was called from.

```js
element.contextscript = (el) => {
    return {
        "get Element": () => {
            alert(el); // "el" is the same as "element"
        },
    };
};
```

The method that is called, when a key is clicked, will get a variable that is the class `ContextEvent`. It has the following properties:

-   `target` - the same as the **element** variable above
-   `originalEvent` - the original **contextmenu** event (the event that is triggered when you right click, _not_ the one when selecting what to do)

### contextdat

if you don't have javascript to set the contextscript variable you can directly add it with the html attribute `contextdat`.

```html
<p contextdat='{key: () => {alert("key1");},key2: () => {alert("key2");}}'>rightclick me!</p>
```

This will add the same context menu as the one above.

> **Note:** The code inside contextdat will be executed with eval, but exist inside brackets.
> This will be executed:
>
> ```js
> ({
>    key: () => {
>        alert("key1");
>    },
>    key2: () => {
>        alert("key2");
>    }
> })
> ```