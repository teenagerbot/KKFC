function ClearTable() {
    let r = Array.from(document.querySelectorAll('table tr'));
    r.shift();
    r.forEach((t) => {
        t.remove();
    });
}