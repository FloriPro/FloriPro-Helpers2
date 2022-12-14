class gui {
    /**
     * gui handler for this live chat program
     * @param {HtmlWindow} window 
     */
    constructor(window) {
        this.window = window;
    }
    /**
     * show or hide the not connected message
     * @param {boolean} connected 
     */
    async connectionStatus(connected) {
        if (this.window.getHtml() == null) {
            return;
        }
        if (connected == true) {
            (await this.window.getHtmlElement("container")).style.gridTemplateRows = "0px 1fr 80px";
            (await this.window.getHtmlElement("errorMSG")).style.display = "none";
        } else {
            (await this.window.getHtmlElement("container")).style.gridTemplateRows = "29px 1fr 80px";
            (await this.window.getHtmlElement("errorMSG")).style.display = "";
        }
    }
    async setChatName(name) {
        (await this.window.getHtmlElement("chatName")).innerText = name;

        //mark the selected channel in the list of channels
        var channelList = await this.window.getHtmlElement("channelList")
        for (var i = 0; i < channelList.children.length; i++) {
            channelList.children[i].style.backgroundColor = "transparent";

            if (channelList.children[i].innerText == name) {
                channelList.children[i].style.backgroundColor = "gray";
            }
        }
    }

    async clearChat() {
        var chat = await this.window.getHtmlElement("chat")
        chat.innerHTML = "<p style='color:gray'>loading...</p>";
    }

    /**
     * replace the chat text with the given text
     * @param {Array<{user: string, message: string}>} text
     */
    async loadText(text) {
        var chat = await this.window.getHtmlElement("chat")
        chat.innerHTML = "";
        for (var i = 0; i < text.length; i++) {
            var completeMessage = document.createElement("p");
            var username = document.createElement("span");
            username.style.color = "gray"
            username.innerText = text[i]["user"] + ": "

            var message = document.createElement("span");
            message.style.color = "white"
            message.innerText = text[i]["message"]

            completeMessage.append(username);
            completeMessage.append(message);
            chat.prepend(completeMessage);
        }
    }

    /**
     * add a message to the bottom chat
     * @param {{user: string, message: string}} messageDat 
     */
    async addMessage(messageDat) {
        var chat = await this.window.getHtmlElement("chat")

        var completeMessage = document.createElement("p");
        var username = document.createElement("span");
        username.style.color = "gray"
        username.innerText = messageDat["user"] + ": "

        var message = document.createElement("span");
        message.style.color = "white"
        message.innerText = messageDat["message"]

        completeMessage.append(username);
        completeMessage.append(message);
        chat.prepend(completeMessage);
    }

    async displayChannels(channels) {
        var channelList = await this.window.getHtmlElement("channelList")
        channelList.innerHTML = "";
        for (var i = 0; i < channels.length; i++) {
            var channel = document.createElement("p");
            channel.setAttribute("element", "channelSelectButton")
            channel.innerText = channels[i];
            channelList.append(channel);
        }

        this.window.parseNewHtml();
    }

    async displayUsers(users) {
        var userList = await this.window.getHtmlElement("userList")
        userList.innerHTML = "";
        for (var i = 0; i < users.length; i++) {
            var user = document.createElement("p");
            user.innerText = users[i];
            userList.append(user);
        }
    }
}

gui;