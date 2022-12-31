# FloriPro-Helpers2 (FluLu.eu)
## Introduction
This is a project i am working on, that is mostly for displaying my projects in a nice way. It is a OS like webpage that is compleately build with javascript. The user can download and run programs. These most of the time display a window rendered in HTML where the user can interact with the program.

## Preinstalled Programs
The following programs are preinstalled, when you open it in your browser:
- **System** - This is the OS itself. It displays the desktop and the taskbar and has other usefull features.
- **File Explorer** - This is a file explorer, that allows you to browse the saved files and folders. You can also create new files and folders. *Everything* is stored in these Files, like The System, the Programs, the Settings, etc. (To delete files or folders, rightlick on them)
- **Text Editor** - This is a text editor, that allows you to view and edit the named files.
- **Informations** - It displays the Version and can help you with handeling the OS. (*Work in Progress*)
- **Settings** - This is the settings app, where you can change the settings of the OS, aswell as update the OS and change the Desktop.
- **Store** - This is the store, where you can download programs (*currently only my own*)

## Development
This project was developed in Visual Studio Code. The Extension [Terminals Manager](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals) automaticaly starts multiple Terminals, that
* Run the Server
* Run 3 different build processes
* A typescript watch compiler, for TS Documentation files

The server and build process are written in python 3:

* Server: ```python -m http.server 80` (80 is the port you can change it to whatever you want)

* Build:
    - `python generateFileSystemJson.py`
    - `python generateProgramJson.py`
    - `python generateLibsJson.py`

* Documentation: `tsc.\\node_modules\\.bin\\tsc.cmd`

### Edit the Code
You can directly edit all the code from the Website on the Website, by browsing the file you want to edit with the explorer and editing it whith the text Editor. If you want to edit the code on your computer, it depends on what you want to edit:
* if you wnat to edit the OS you will need to run a 
* if you don't care you can just run all the commands above in the terminal and you will see the changes on http://localhost:80.

### There are no changes when editing localy?
this happens, because the website downloads all the files and stores them in the *localstorage*. To see your changes you will have to reset the website. This is done by opening the menu on the bottem left of the page (![Menu](/c/sys/imgs/gray.webp)) and clicking on "**R**" Butten. This will delete all the files that are not specified in `c/persistendFiles.json` and reload the website. (when an error occurs it will try to delete everything).

You can make this process faster by pressing "**Ctrl + R**" and click on "**reset everything**".

### Global Variables
There are some global variables that are used in the OS. These are:
* [**System**](/docs/system.md)
* [**SystemHtml**](/docs/systemHtml.md)
* [**SystemFileSystem**](/docs/systemFileSystem.md)