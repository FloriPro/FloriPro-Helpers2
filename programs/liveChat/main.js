class program extends System.program.default {
    constructor() {
        super()
        //don't use!
    }
    async init() {
        this.ws = new WebSocket("wss://liveChat.floriprolohner.repl.co");
        this.ws.onopen = async () => {
            console.log("OPEN");
            this.gui.connectionStatus(true);

            //authenticate with server
            //check if username is allready set
            if (!await SystemFileSystem.fileExists("c/user/liveChat/username.txt")) {
                this.userName = await SystemHtml.WindowHandler.presets.createStringSelect("LiveChat | username", "Please enter your username");
                await SystemFileSystem.setFileString("c/user/liveChat/username.txt", this.userName);
                this.connection.authenticate(this.userName);
            } else {
                this.userName = await SystemFileSystem.getFileString("c/user/liveChat/username.txt");
                this.connection.authenticate(this.userName);
            }
        }
        this.ws.onclose = function (event) {
            console.error(event);
            this.gui.connectionStatus(false);
        }
        this.ws.onerror = function (event) {
            console.error(event);
            this.gui.connectionStatus(false);
        }

        this.currentChannel = "main";
        this.end = -1;
        this.userName = undefined;

        /**
         * @type {HtmlWindow}
         */
        this.window = await SystemHtml.WindowHandler.createWindow("Live Chat",
            //onready:
            async () => {
                //set html
                await this.window.appearence.setLogo(this.PATH.folder() + "/logo.webp")

                //load pcHtml when on pc and phoneHtml when on phone
                if (window.innerWidth < 600) {
                    await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/phoneHtml.html"));
                    await this.window.size.setSize(300, 500);
                } else {
                    await this.window.setContent(await SystemFileSystem.getFileString(this.PATH.folder() + "/pcHtml.html"));
                    await this.window.size.setSize(600, 400);
                }
                this.window.size.userCanResize(true)

                //add event handlers
                if (window.innerWidth >= 600) {
                    this.window.addHtmlEventListener("click", "send", async () => {
                        var msg = (await this.window.getHtmlElement("message")).value;
                        if (msg == "") return;
                        this.connection.sendMessage(this.currentChannel, msg);
                        (await this.window.getHtmlElement("message")).value = "";
                    }, this);
                    this.window.addHtmlEventListener("onkeyup", "message", async (_, __, ___, event) => {
                        //if enter is pressed send the message
                        if (event.keyCode == 13 && event.shiftKey != true) {
                            var msg = (await this.window.getHtmlElement("message")).value;
                            if (msg == "") return;
                            this.connection.sendMessage(this.currentChannel, msg);
                            (await this.window.getHtmlElement("message")).value = "";
                        }
                    }, this);

                    this.window.addHtmlEventListener("onclick", "channelList", async (_, __, ___, event) => {
                        console.log(event)
                        this.currentChannel = event.target.innerText;
                        this.end = -1;

                        this.gui.clearChat();
                        this.gui.setChatName(this.currentChannel);
                        this.connection.getChannel(this.currentChannel);
                    }, this);
                } else {
                    //phone open channel list
                    this.window.addHtmlEventListener("onclick", "openchannelList", async (_, __, ___, event) => {
                        this.gui.channelList(true)
                    }, this);

                    //close channel list
                    this.window.addHtmlEventListener("onclick", "closeChannelList", async (_, __, ___, event) => {
                        this.gui.channelList(false);
                    }, this);

                    this.window.addHtmlEventListener("onclick", "openuserList", async (_, __, ___, event) => {
                        this.gui.userList(true)
                    }, this);
                    this.window.addHtmlEventListener("onclick", "closeUserList", async (_, __, ___, event) => {
                        this.gui.userList(false);
                    }, this);

                    //select channel
                    this.window.addHtmlEventListener("onclick", "channelList", async (_, __, ___, event) => {
                        console.log(event)
                        this.currentChannel = event.target.innerText;
                        this.end = -1;

                        this.gui.clearChat();
                        this.gui.setChatName(this.currentChannel);
                        this.connection.getChannel(this.currentChannel);
                    }, this);

                    //send message
                    this.window.addHtmlEventListener("click", "send", async () => {
                        var msg = (await this.window.getHtmlElement("message")).value;
                        if (msg == "") return;
                        this.connection.sendMessage(this.currentChannel, msg);
                        (await this.window.getHtmlElement("message")).value = "";
                    }, this);
                    this.window.addHtmlEventListener("onkeyup", "message", async (_, __, ___, event) => {
                        //if enter is pressed send the message
                        if (event.keyCode == 13 && event.shiftKey != true) {
                            var msg = (await this.window.getHtmlElement("message")).value;
                            if (msg == "") return;
                            this.connection.sendMessage(this.currentChannel, msg);
                            (await this.window.getHtmlElement("message")).value = "";
                        }
                    }, this);
                    console.warn("not implemented phone mode for events")
                }
            });
        //load gui
        /**
         * @type {gui}
         */
        this.gui = new (await System.run(this.PATH.folder() + "/gui.js"))(this.window, window.innerWidth < 600);

        /**
         * @type {connection}
         */
        this.connection = new (await System.run(this.PATH.folder() + "/connection.js"))(this.ws);

        // connection event handlers
        this.connection.channelMessages = (channel, messages, end) => {
            if (channel != this.currentChannel) return;
            this.end = end;
            this.gui.loadText(messages);
        };
        this.connection.newMessage = async (channel, messages, user) => {
            if (channel != this.currentChannel) return;
            this.gui.addMessage({ "message": messages, "user": user });

            //if this htmlwindow is not focused or not shown or the complete browser send a desktop notification
            if (document.hasFocus() == false || !this.window.ontop || !this.window.appearence.shown) {
                System.notification.desktopNotification("LiveChat", user + ": " + messages, SystemFileSystem.toImg(await SystemFileSystem.getFileString(this.PATH.folder() + "/logo.webp")));
            }
        };
        this.connection.allChannels = (channels) => {
            this.gui.displayChannels(channels);
            this.gui.setChatName(this.currentChannel);
        }
        this.connection.authFinished = () => {
            //get all the channels and messages in the current channel
            this.connection.getChannel("main")
            this.connection.getChannels()
        }
        this.connection.userUpdate = (users) => {
            this.gui.displayUsers(users);
        }

        System.notification.requestPermission();

        this.ws.gui = this.gui;
        this.ws.connection = this.connection;

        //add close event
        this.window.close = () => {
            this.ws.close();
            this.stop()
            return true
        }
    }
    async send() {
        console.log("send!");
    }
}
new program();