# SystemHtml
[documentation File](../dist/c/sys/HTML/html.d.ts)

## Introduction
This is the HTML part of the OS. It has to do with everything the user interacts with. It is the Desktop, the Taskbar, the Windows, the Context Menus, etc.

It is known under the global variable `SystemHtml`.

It's methods are only called by Subclasses of it. It is not ment to be called by programs.

## Sub-Classes
* [Desktop](systemHtml/desktop.md)
* [ContextMenu](systemHtml/contextMenu.md)
* [WindowHandler](systemHtml/windowHandler.md) (Windows *and* Taskbar)