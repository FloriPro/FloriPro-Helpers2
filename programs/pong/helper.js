function getActiveIframe() {
    d = document.querySelectorAll(".Iframe");
    d.forEach(x => {
        document.getElementById(x.id).contentWindow.changeFocus(x == document.activeElement)
    });
}

window.setInterval(getActiveIframe, 200);