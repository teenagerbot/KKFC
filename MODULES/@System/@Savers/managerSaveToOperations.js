const FILE_MANGER = require("fs");
const PATH_TO_RESERVE_COPY_MANAGER = process.env.ALLUSERSPROFILE;
const RemoteModule = require("@electron/remote");
const WorkerOperationsSaving = new Worker("../MODULES/@System/@BackgroundWorkers/@Form3/readOperations.js");
function ManagerSaveToOperations(operations = []) {
    if (!FILE_MANGER.existsSync(PATH_TO_RESERVE_COPY_MANAGER+"\\WindowsMechanic\\.-.iso")) {
        RemoteModule.dialog.showErrorBox("Error", "Відбувся збій в програмі: 0x20030440")
        notifier.show("Помилка", "Код помилки: 0x20030440", "", "../imgs/high_priority-48.png", 0);
    } else {
        let TEMP_OPER = 0;
        const Operations = operations;
        console.log(Operations)
        let content = {
            form3_operations: {},
        };
        const obDevices = [];
        const items = [];
        Array.from(
            document.querySelectorAll("input[type='checkbox']:checked")
        ).forEach((device) => {
            obDevices.push(String(device.getAttribute('device')));
        });
        let STEP_INDEX = 0;
        let ob = {
            'номер операції': String(document.querySelector('input').value),
            'назва операції': String(document.querySelector('#opers').value),
            'верстат': String(document.querySelector('#verst').value),
            'МОР': String(document.querySelector('#mor').value),
            'Пристрої': obDevices,
            'Цех': String(document.querySelector('#ceh').value),
            'Дільниця': String(document.querySelector('#dil').value),
            'Робоче місце': String(document.querySelector('#work').value),
            'Штучний час': String(document.querySelector('#tsht').value),
            'Підготовчо-заключний час': String(document.querySelector('#tpz').value),
            'Допоміжний час': String(document.querySelector('#td').value),
            'Основний час': String(document.querySelector('#to').value),
        };
        ob['Переходи'] = readFromTable();
        content['form3_operations'][document.querySelector('h1').innerText] = ob;
        Array.from(document.querySelectorAll('p.menu_item')).forEach((item) => {
            items.push(String(item.getAttribute('item')));
        });
        if (Operations.length === 0) {
            Operations.push(ob);
            TEMP_OPER = 2;
        } else {
            for (let operation_index = 0; operation_index < Operations.length; operation_index++) {
                if (Operations[operation_index]["номер операції"] === String(document.querySelector('input').value)) {
                    TEMP_OPER = 1;
                    Operations.splice(operation_index, 1, ob);
                    STEP_INDEX = operation_index;
                    break;
                } else {
                    TEMP_OPER = 0;
                }
            }
        }
        if (TEMP_OPER === 0 && Operations.length !== 0) {
            Operations.push(ob);
        }
        console.log(ob, Operations)
        WorkerOperationsSaving.postMessage({
            key: "kafedra.write.operations",
            content: Operations
        });
        WorkerOperationsSaving.onmessage = (event) => {
            if (event.data.success === true) {
                TEMP_OPER = 0;
                notifier.show("Успішно", "данні збережені", "", "../imgs/ok.png", 0);
                document.querySelector("#__save_operation").classList.remove("saveText");
            }
        }
        document.querySelector("#__save_operation").classList.remove("saveText");
        return Operations;
    }
}