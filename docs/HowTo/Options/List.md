## Content

- [List of Options](#list-of-options)
  - [fileExtensionOpener](#fileextensionopener)
  - [desktop](#desktop)
  - [programs](#programs)
  - [libs](#libs)
  - [settings](#settings)
  - [StartMenuButtons](#startmenubuttons)
  - [startup](#startup)

# List of Options

## [fileExtensionOpener](../../../c/sys/options/fileExtensionOpener.json)

The option `fileExtensionOpener` stores the default program to open a file with a specific extension.

The key is the file extension the value is the path to the program to open the file. (not the run file, but the program file!)

## [desktop](../../../c/sys/options/desktop.json)

The option "desktop" stores the position, image, name and run File of every element on the desktop.

view the [Desktop](Desktop.md) page for more information

## [programs](../../../c/sys/options/programs.json)

This stores a list of installed Programs. It stores: the name, the path to the program file and the path to the run file.

The Desktop uses this to show all the programs in the menu in bottom left corner.

## [libs](../../../c/sys/options/libs.json)

This stores a list of installed Libraries. It is used to check if a library is installed and to get the path to the library. It is mostly only used by the System.

## [settings](../../../c/sys/options/settings.json)

This stores the settings of the System. It is used by the System to define actions and by the Settings program to show and change the settings.

The key is the name of the setting and the value is a array with the following two values:

1. The current value of the setting
2. The type of the setting
    - bool
    - file
    - string
    - number

```json
{ "mySetting": ["some String", "string"] }
```

Settings are [persistend](../../../c/persistandFiles.json). They will be saved event when reseting the System.

## [StartMenuButtons](../../../c/sys/options/StartMenuButtons.json)

This stores the small buttons in the start menu on the left. They usually only have one caracter and are used to start a script. They can have a tooltip, that will instantly show when hovering over the button.

```json
{
    "R": {
        "tooltip": "Run a random script",
        "click": "c/path/to/run.js"
    }
}
```

## [startup](../../../c/sys/options/startup.json)

This stores the programs that should be started when the System starts. The boolen value shows, if it should be started (`true`: start, `false`: don't start).

```json
{
    "c/path/to/run.js": true
}
```
