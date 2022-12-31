# ContextMenu
[documentation File](../../dist/c/sys/HTML/html.d.ts#L20)

## Introduction
This is the Context Menu. It handles the menu that appears when you right click on something.

This is, like systemHtml, not ment to be called by programs. It is only called by events.

## How do I use it?
on any HTML element, you can add the attribute `contextscript` with the value of a script that returns a Object with the following structure:
```js
{
    "do something": (event) => {alert("do something");},
    "check the event": (event) => {console.log(event);}
}
```
The key is the name of the menu item, and the value is the function that is called when the menu item is clicked.

The function gets an [ContextEvent]() as a parameter

## ContextEvent
This is the event that is passed to the function when a menu item is clicked.

### Properties
* `target` - The HTML element that was rightclicked on
* `originalEvent` - The original contextMenu event that was triggered