function ClearFields(array = []) {
    array.forEach(field => {
        if (document.querySelector(field) && document.querySelector(field).tagName === "input".toUpperCase() && document.querySelector(field).type !== "checkbox") {
            document.querySelectorAll(field).forEach(elem => {
                elem.value = "";
            })
        } else if (document.querySelector(field) && document.querySelector(field).getAttribute("contenteditable") === "true") {
            document.querySelectorAll(field).forEach(elem => {
                elem.innerText = "";
            })
        } else if (document.querySelector(field) && document.querySelector(field).tagName === "select".toUpperCase()) {
            document.querySelectorAll(field).forEach(elem => {
                elem.value = "";
            })
        } else if (document.querySelector(field) && document.querySelector(field).type === "checkbox") {
            document.querySelectorAll(field).forEach(elem => {
                elem.checked = false;
            })
        }
    })
    Checker();
    ClearTable();
    let num = Number(document.querySelector('h1 d').innerText);
    document.querySelector('h1 d').innerText = ++num;
    document.querySelector('input').value = Number(document.querySelector('h1 d').innerText) * 5;
}
