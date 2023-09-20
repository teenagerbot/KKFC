function buildMap(arr_operations = []) {
    arr_operations.forEach(operation => {
        const elem = document.createElement("p");
        elem.className = "menu_item";
        elem.setAttribute("item", `${operation["назва операції"]}|${operation["номер операції"]}`)
        elem.innerHTML = `Операція: ${operation["назва операції"].replaceAll("<", "&lt;").replaceAll(">", "&gt;")}<br>Номер: ${operation["номер операції"]}`;
        document.querySelector("screen_menu").appendChild(elem);
    })
}