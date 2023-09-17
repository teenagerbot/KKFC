const FILE_MANGER = require("fs");
const PATH_TO_RESERVE_COPY_MANAGER = process.env.ALLUSERSPROFILE;
const RemoteModule = require("@electron/remote");
function ManagerSaveToOperations() {
    if (!FILE_MANGER.existsSync(PATH_TO_RESERVE_COPY_MANAGER+"\\WindowsMechanic\\.-.iso")) {
        RemoteModule.dialog.showErrorBox("Error", "Відбувся збій в програмі: 0x20030440")
    } else {
        let content = {
            form3_operations: {},
        };
        const obDevices = [];
        const items = [];
        const Operations = JSON.parse(FILE_MANGER.readFileSync(PATH_TO_RESERVE_COPY_MANAGER+"\\WindowsMechanic\\.-.iso"));
        Array.from(
            document.querySelectorAll("input[type='checkbox']:checked")
        ).forEach((device) => {
            obDevices.push(String(device.getAttribute('device')));
        });
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
        Operations.push(ob);
        FILE_MANGER.writeFileSync(PATH_TO_RESERVE_COPY_MANAGER+"\\WindowsMechanic\\.-.iso", JSON.stringify(Operations, null, 2))
    }
}