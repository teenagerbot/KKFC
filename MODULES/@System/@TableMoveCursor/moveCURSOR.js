const RemoteModuleR = require("@electron/remote");

function moveCURSOR(direction = "forward", element_index = 0, array = []) {
    let INDEX;
    if (direction === "forward") {
        INDEX = ++element_index;
        if (array[INDEX] !== undefined) {
            readerJSON(array[INDEX], "next");
            document.querySelector("h1 d").innerText = Number(document.querySelector("h1 d").innerText) + 1;
        } else {
            createOperation();
            INDEX = element_index;
        }
    } else {
        INDEX = --element_index;
        if (array[INDEX] !== undefined) {
            readerJSON(array[INDEX], "prev");
            document.querySelector("h1 d").innerText = Number(document.querySelector("h1 d").innerText) - 1;
        } else {
            RemoteModuleR.dialog.showErrorBox("Error", "Відбувся збій в програмі: 0x23938020");
            notifier.show("Помилка", "Код помилки: 0x20030440", "", "../imgs/img/high_priority-48.png", 0);
            INDEX = element_index;
        }
    }
    document.querySelector("#__save_operation").classList.remove("saveText");
    return INDEX;
}