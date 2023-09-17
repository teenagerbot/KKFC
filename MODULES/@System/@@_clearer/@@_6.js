const Checker = () => {
    const INPS = document.querySelectorAll("input");
    INPS.forEach(inp => {
        if (inp.value) {
            inp.style.background = "transparent";
        } else {
            inp.style.background = "pink";
        }
    })
}