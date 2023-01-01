## Content

- [Desktop](#desktop)
  - [Add a Link](#add-a-link)
  - [check if allready existend](#check-if-allready-existend)

# Desktop

The option "desktop" stores the position, image, name and run File of every element on the desktop.

Because options are allways a dictionary, but the desktop is a list, the dictionary has a key called "all" that stores the list. [View here](../../../c/sys/options/desktop.json)

To make working with the desktop easier, `SystemHtml` has contains a class `desktop` to handle the Desktop

## Add a Link

To add a link to the desktop, you can use the following code:

```js
await SystemHtml.desktop.addLink("c/path/to/run.js", "Best Program", "c/path/to/logo.webp");
```

You won't need to specify a logo, but it is adviced.

```js
await SystemHtml.desktop.addLink("c/path/to/run.js", "Best Program");
```

## check if allready existend

To check if a link is allready on the desktop, you can use the following code:

```js
await SystemHtml.desktop.existsLink("c/path/to/run.js")
```

It won't check for name or logo, because they can easly be the same, so it searches for the path of the program to run.