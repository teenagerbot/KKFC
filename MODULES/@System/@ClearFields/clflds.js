function ClearFields(array = []) {
    array.forEach(field => {
        if (document.querySelector(field) && document.querySelector(field).tagName === "input".toUpperCase()) {
            document.querySelector(field).value = "";
        } else if (document.querySelector(field) && document.querySelector(field).getAttribute("contenteditable") === "true") {
            document.querySelector(field).innerText = "";
        } else if (document.querySelector(field) && document.querySelector(field).tagName === "select".toUpperCase()) {
            document.querySelector(field).value = "";
        } else if (document.querySelector(field) && document.querySelector(field).type === "checkbox") {
            //!FIXME
            console.log(3)
            document.querySelector(field).checked = false;
        }
    })
}
