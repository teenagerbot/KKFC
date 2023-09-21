function setDarkMode(forms) {
    if (remote.nativeTheme.shouldUseDarkColors) {
        if (forms === "form3") {
            document.body.style.cssText = `background: #000000ad;color:white;`
            document.querySelector("tr").style.cssText = `background: #000000cc;`
            document.querySelector(".lbl").style.cssText = `background: #000000cc;`
            document.querySelector("#device").style.cssText = `background: #646464;`
            document.querySelector("screen_menu").style.cssText = `background: #121212;`
            //document.querySelector(".dialog_win").style.cssText = `background: #646464;`
            document.querySelector("input").style.cssText = `color:white;`
            document.querySelector("select").style.cssText = `color:white;`
        } else if (forms === "form1") {
            document.body.style.cssText = `background: #000000ad;color:white;`
            document.querySelectorAll("input").forEach(h => {
            h.style.cssText = `color:white;`
            })
        }

    }
}