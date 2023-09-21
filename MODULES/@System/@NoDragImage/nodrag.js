function nodrag() {
    document.querySelectorAll("img").forEach(el => {
        el.ondragstart = () => {
            return false;
        }
    })
}