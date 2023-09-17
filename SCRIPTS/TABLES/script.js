/**
 * 
 * При виборі код операції, назва переходу підтягується з табл переходи по коду операції
 * код операції УНІКАЛЬНИЙ
 * 
 */
const FILEserver = new ReserveServer();
let TEMP_ELEM = null;
DOMserver("hid", server => {
    if (server.targetElement.innerText.endsWith(".json")) {
        document.querySelector("h2").innerText = document.title = String(server.targetElement.innerText).replace(/\.json$/g, "").replace(/(.+)\\/gm, "");
        ParseManager(server.targetElement.innerText, document.title, "json");
        document.querySelector("#save").classList.remove("hd");
        document.querySelector("#newPole").classList.remove("hd");
    }
    // else if (server.targetElement.innerText.endsWith(".mdb")) {
    //     document.querySelector("h2").innerText = document.title = String(server.targetElement.innerText).replace(/\.mdb$/g, "");
    //     ParseManager(server.targetElement.innerText, document.title, "json");
    //     document.querySelector("#newPole").classList.remove("hd");
    //     document.querySelector("#save").classList.remove("hd");
    // }
})
document.querySelector("#file").onclick = function (r) {
    r.preventDefault();
    remote.dialog
        .showOpenDialog(remote.getCurrentWindow(), {
            defaultPath: remote.app.getAppPath() + "\\DataBase",
            properties: ["openFile"],
        })
        .then((result) => {
            // result.canceled будет true, если пользователь закрыл окно без выбора файла
            if (!result.canceled) {
                // result.filePaths содержит путь к выбранному файлу
                const filePath = result.filePaths[0];
                document.querySelector("hid").innerText = filePath;
            }
        })
        .catch((err) => {
            console.log("Ошибка:", err);
        });
};
IS_SAVED = true;
const windows = remote.getCurrentWindow();
const db = connectDB();
document.querySelector("#open").onclick = () => {
    if (saveState == true) {
        remote.dialog.showMessageBox({
            "type": "question",
            'title': 'Підтвердіть',
            'message': "Якщо ви відкриєте іншу таблицю, поточна таблиця не збережеться, що робимо?",
            'buttons': [
                'Зберігаємо',
                'Продовжуємо редагувати',
                'Відкриваємо таблицю(поточні зміни не збережуться!)'
            ]
        }).then((result) => {
            console.log(result.response)
            if (result.response === 0) {
                saveState = false;
                document.title = document.title.replace(/\s\- не збережено$/, "");
                document.querySelector("#save").click();
            }
            if (result.response === 1) {
                return;
            }
            if (result.response === 2) {
                saveState = false;
                document.title = document.title.replace(/\s\- не збережено$/, "");
                document.querySelector("#file").click();
            }
        })
    } else {
        document.querySelector("#file").click();
    }
}
function creatorManager(content) {
    content.forEach(cont => {
        const TR = document.createElement("tr");
        let keys = Object.keys(cont);
        keys = keys.reverse();
        keys.forEach((key, index) => {
            if ((document.querySelector("h2").innerText == "Професії" || document.querySelector("h2").innerText == "Переходи" || document.querySelector("h2").innerText == "Верстати" || document.querySelector("h2").innerText == "Вимірювальні інструменти" || document.querySelector("h2").innerText == "Інструменти") && key == "Код операції") {
                let TD = document.createElement("td");
                TD.className = "CODE list";
                TD.innerHTML = `<input list="ll" value="${cont[key]}">`;
                TR.appendChild(TD);
            } else if (key == "Назва переходу") {
                let TD = document.createElement("td");
                TD.className = "CODE perehid";
                TD.setAttribute("left", "true")
                TD.innerText = cont[key];
                TR.appendChild(TD);
            } else if (key == "Порядковий номер") {
                let TD = document.createElement("td");
                TD.className = "CODE por";
                TD.innerHTML = cont[key];
                TR.appendChild(TD);
            } else if (key == "Категорія") {
                let TD = document.createElement("td");
                TD.className = "CODE";
                TD.setAttribute("iid", "category")
                TD.innerText = cont[key];
                TR.appendChild(TD);
            } else {
                let TD = document.createElement("td");
                TD.className = "CODE";
                TD.innerText = cont[key];
                TR.appendChild(TD);
            }
        })
        let td = document.createElement("td");
        td.className = "rem";
        td.innerHTML = `<img src="../imgs/delete.png" class="rem">`;
        TR.appendChild(td);
        document.querySelector("#table table").appendChild(TR);
    })
}
function ParseManager(path, table_name, type = "json") {
    document.querySelector("#file").value = "";
    if (type == "json") {
        document.querySelector("#filee").innerText = path;
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                ERROR("Помилка", "Сталась помилка при читанні файлу");
                return;
            }
            const fileContent = JSON.parse(data);
            let columns = fileContent[table_name].columns;
            console.log(columns)
            let storeData = fileContent[table_name].values;
            sessionStorage.setItem("keyword", JSON.stringify(fileContent[table_name].keyword));
            const table = document.createElement("table");
            const TR = document.createElement("tr");
            document.querySelector("hidden").innerHTML = columns.length;
            TR.innerHTML = `<th>Видалити рядок</th>`;
            columns.forEach(column => {
                let TH = document.createElement("th");
                TH.innerText = column;
                TR.prepend(TH);
            })
            table.appendChild(TR);
            document.querySelector("#table").innerHTML = "";
            document.querySelector("#table").appendChild(table);
            creatorManager(storeData);
        })
    } else if (type == "db") {
        //FIXME - DB
        remote.dialog.showMessageBox({
            "type": "question",
            'title': 'Відкриття',
            'message': "В цій базі даних зберігаються таблиці, яку з них ви хочете відкрити для редагування?",
            'buttons': [
                'Нормоконтроль',
                'Хто перевіряє та затверджує',
                "Посади",
                "Відмінити"
            ]
        }).then((result) => {
            if (result.response === 2) {
                document.querySelector("#filee").innerText = path;
                creator(db, "SELECT * FROM Посада;", "Посада");
            } else if (result.response === 0) {
                document.querySelector("#filee").innerText = path;
                creator(db, "SELECT * FROM Нормоконтроль;", "Нормоконтроль");
            } else if (result.response === 1) {
                document.querySelector("#filee").innerText = path;
                creator(db, "SELECT * FROM [Перевіряє та затверджує];", "Перевіряє та затверджує");
            }
        })

    }
}
document.querySelector("#newPole").onclick = () => {
    // FIXME - DB
    //     if (document.querySelector("h2").innerText == "Перевіряє та затверджує" || document.querySelector("h2").innerText == "Нормоконтроль" || document.querySelector("h2").innerText == "Посада") {
    //         const TR = document.createElement("tr");
    //         const iid = Date.now();
    //         TR.innerHTML = `<td class="CODE" sql="--Введіть значення(${iid})--">--Введіть значення(${iid})--</td><td><img src="../imgs/delete.png" class="rem" ff="true" sql="1"></td>`;
    //         document.querySelector("#table table").appendChild(TR);
    //         TR.scrollIntoView();
    //         saveState = false;
    //         document.title = document.title.replace(/\s\- не збережено$/, "");
    //         executeQuery(db, `INSERT INTO [${document.querySelector("h2").innerText}] ([${document.querySelectorAll("th")[0].innerText}], [${document.querySelectorAll("th")[1].innerText}])
    // VALUES ('--Введіть значення--', '1');`, res => {
    //             remote.dialog.showMessageBox({
    //                 "type": "question",
    //                 'title': 'Підтвердження',
    //                 'message': "Щоб данні зісонхринізувалися, треба перевідкрити таблицю цю таблицю(натисніть просто 'Відкрити таблицю'), програма зараз автоматично перевідкриє таблицю."
    //             }).then((result) => {
    //                 ParseManager(document.querySelector("#filee"), document.querySelector("h2").innerText, "db");
    //                 saveState = false;
    //                 document.title = document.title.replace(/\s\- не збережено$/, "");
    //             })
    //         })
    //     }
    //else {
    let TR = document.createElement("tr");
    for (let c = 0; c < Number(document.querySelector("hidden").innerText); c++) {
        let TD = document.createElement("td");
        TD.className = "CODE";
        TR.appendChild(TD);
    }

    let remTD = document.createElement("td");
    remTD.innerHTML = `<img src="../imgs/delete.png" class="rem">`;
    remTD.className = "rem";
    TR.appendChild(remTD);
    document.querySelector("#table table").appendChild(TR);
    if ((document.querySelector("h2").innerText == "Вимірювальні інструменти" ||
        document.querySelector("h2").innerText == "Професії" ||
        document.querySelector("h2").innerText == "Інструменти" ||
        document.querySelector("h2").innerText == "Переходи" ||
        document.querySelector("h2").innerText == "Верстати")) {
        Array.from(document.querySelectorAll("th")).forEach(th => {
            if (th.innerText == "Код операції") {
                let TR = document.querySelector("tr:last-child");
                let elem = Array.from(TR.querySelectorAll("td"))[Array.from(document.querySelectorAll("th")).indexOf(th)];
                console.log(Array.from(TR.querySelectorAll("td"))[Array.from(document.querySelectorAll("th")).indexOf(th)])
                elem.innerHTML = `<input list="ll">`;
            } else if (th.innerText == "Назва переходу") {
                let TR = document.querySelector("tr:last-child");
                let elem = Array.from(TR.querySelectorAll("td"))[Array.from(document.querySelectorAll("th")).indexOf(th)];
                console.log(Array.from(TR.querySelectorAll("td"))[Array.from(document.querySelectorAll("th")).indexOf(th)])
                elem.setAttribute("left", "true")
            } else if (th.innerText == "Категорія") {
                let TR = document.querySelector("tr:last-child");
                let elem = Array.from(TR.querySelectorAll("td"))[Array.from(document.querySelectorAll("th")).indexOf(th)];
                console.log(Array.from(TR.querySelectorAll("td"))[Array.from(document.querySelectorAll("th")).indexOf(th)])
                elem.setAttribute("iid", "category")
            }
        })
        // TR.querySelector("td").innerHTML = `<input list="ll">`;
    } else if (document.querySelector("h2").innerText == "Матеріал") {
        Array.from(document.querySelectorAll("th")).forEach(th => {
            if (th.innerText == "Категорія") {
                let TR = document.querySelector("tr:last-child");
                let elem = Array.from(TR.querySelectorAll("td"))[Array.from(document.querySelectorAll("th")).indexOf(th)];
                console.log(Array.from(TR.querySelectorAll("td"))[Array.from(document.querySelectorAll("th")).indexOf(th)])
                elem.setAttribute("iid", "category")
            }
        })
    }
    TR.scrollIntoView({
        behavior: "smooth",
        block: "start",
        container: document.querySelector("#table")
    });
    //}
    saveState = true;
    if (!document.title.endsWith(" - не збережено")) {
        document.title += " - не збережено";
    }
}
function saveManager(content) {
    console.log(content)
    fs.mkdir(`resources/DataBase`, { recursive: true }, (err) => {
        if (err) {
            ERROR("Помилка", err);
        } else {
            fs.writeFile(`resources/DataBase/${document.querySelector("h2").innerText}.json`, content, (err) => {
                if (err) {
                    console.log(err)
                }
                saveState = false;
                SUCCESS("Данні успішно збережені", "Успішно");
                FILEserver.________________________(`resources/DataBase/${document.querySelector("h2").innerText}.json`);
            })
        }
    });
    // filename = remote.dialog.showSaveDialog({
    //     filters: [{
    //         name: `Таблиця '${document.querySelector("h2").innerText}'`,
    //         extensions: ["json"],

    //     }],
    //     defaultPath: document.querySelector("h2").innerText+".json"
    // }
    // ).then(result => {
    //     filename = result.filePath;
    //     if (filename === undefined) {
    //         return;
    //     }
    //     fs.writeFile(filename, content, (err) => {
    //         if (err) {
    //             return
    //         }
    //         saveState = false;
    //         SUCCESS();
    //     })
    // }).catch(err => {
    //     ERROR("Помилка", err);
    // })
}

document.querySelector("#save").onclick = () => {
    // if (document.querySelector("h2").innerText != "Нормоконтроль" && document.querySelector("h2").innerText != "Перевіряє та затверджує" && document.querySelector("h2").innerText != "Посада") {
    let tds = document.querySelectorAll("td");
    let ths = Array.from(document.querySelectorAll("th"));
    ths.pop();
    //?????????????????????????????????????????????
    let texts = [];
    ths.forEach(th => {
        texts.push(th.innerText);
    })
    //????????????????????????????????????????????
    let obs = [];
    let trs = Array.from(document.querySelectorAll("tr"));
    trs.shift();
    trs.forEach(tr => {
        let ob = {};
        let tds = Array.from(tr.querySelectorAll("td"))
        tds.pop();
        for (let c = 0; c < ths.length; c++) {
            if ((document.querySelector("h2").innerText == "Професії" || document.querySelector("h2").innerText == "Переходи" || document.querySelector("h2").innerText == "Верстати" || document.querySelector("h2").innerText == "Вимірювальні інструменти" || document.querySelector("h2").innerText == "Інструменти") && ths[c].innerText == "Код операції") {
                ob[ths[c].innerText] = tds[c].querySelector("input").value;
            } else {
                ob[ths[c].innerText] = tds[c].innerText;
            }
        }
        obs.push(ob);
    })
    tds.forEach(fg => {
        fg.style.borderColor = "";
        fg.style.borderWidth = "";
    })
    let object = {
        [document.querySelector("h2").innerText]: {
            "columns": texts,
            "values": obs,
            [sessionStorage.getItem("keyword") != "undefined" ? "keyword" : ""]: sessionStorage.getItem("keyword") != "undefined" ? JSON.parse(sessionStorage.getItem("keyword")) : ""
        }
    };
    console.log(object)
    saveManager(JSON.stringify(object, null, 2));
    // } else {
    //     toDB(db)
    // }
}
document.body.onclick = (r) => {
    console.log(r.target.classList.value)
    if (r.target.className == "rem") {
        remote.dialog.showMessageBox({
            "type": "question",
            'title': 'Підтвердіть',
            'message': "Ви точно хочете видалити поле?(Якщо ви закриєте це повідомлення, то програма автоматично видалить поле яке ви обрали)",
            'buttons': [
                'Видалити',
                'Не видаляти'
            ]
        }).then((result) => {
            if (result.response !== 0) { return; }
            if (result.response === 0) {
                if (r.target.tagName == "IMG") {
                    if (document.querySelector("h2").innerText == "Перевіряє та затверджує" || document.querySelector("h2").innerText == "Нормоконтроль" || document.querySelector("h2").innerText == "Посада" && !r.target.getAttribute("ff")) {
                        const THS = Array.from(document.querySelectorAll("table th"))
                        console.log(`DELETE FROM [${document.querySelector("h2").innerText}] WHERE [${THS[r.target.parentNode.previousElementSibling.cellIndex].innerText}] = "${r.target.parentNode.previousElementSibling.innerText}";`)
                        executeQuery(db, `DELETE FROM [${document.querySelector("h2").innerText}] WHERE [${THS[r.target.parentNode.previousElementSibling.cellIndex].innerText}] = "${r.target.parentNode.previousElementSibling.innerText}";`, res => {
                            document.title = document.title.replace(/\s\- не збережено$/, "");
                            saveState = false;
                            console.log(res)
                        })
                    } else if (document.querySelector("h2").innerText == "Перевіряє та затверджує" || document.querySelector("h2").innerText == "Нормоконтроль" || document.querySelector("h2").innerText == "Посада" && r.target.getAttribute("ff")) {
                        r.target.parentNode.parentNode.remove();
                    }
                    r.target.parentNode.parentNode.remove();
                } else {
                    r.target.parentNode.remove();
                }
                saveState = true;
                document.title += " - не збережено";
            }
        })
    } else if (r.target.classList.contains("CODE") && r.target.getAttribute("iid") != "category") {
        if (findByTD(r.target).innerText != "Назва операції") {
            r.target.setAttribute("contenteditable", "true");
            r.target.style.borderColor = "green";
            r.target.style.borderWidth = "3px";
            r.target.focus();
        } else {
            r.target.setAttribute("contenteditable", "false");
        }
        r.target.onblur = function () {
            this.setAttribute("contenteditable", "false");
            r.target.style.borderColor = "";
            r.target.style.borderWidth = "";
        }
    } else if (r.target.className == "DESCRIPTION") {
        r.target.setAttribute("contenteditable", "true");
        r.target.style.borderColor = "green";
        r.target.style.borderWidth = "3px";
        r.target.focus();
        r.target.onblur = function () {
            this.setAttribute("contenteditable", "false");
            r.target.style.borderColor = "";
            r.target.style.borderWidth = "";
        }
    } else if (r.target.getAttribute("iid") == "category") {
        const X = r.clientX;
        const Y = r.clientY;
        TEMP_ELEM = r.target;
        document.querySelector("categories").style.display = "block";
        document.querySelector("categories").style.left = X + "px";
        document.querySelector("categories").style.top = Y + "px";
        setTimeout(() => {
            document.querySelector("categories").style.maxHeight = `118px`;
        }, 30)
    } else if (r.target.tagName != "categories" || r.target.className != "categorye") {
        setTimeout(() => {
            document.querySelector("categories").style.display = "none";
        }, 110)
        document.querySelector("categories").style.maxHeight = `0px`;
    }
}
let saveState = false;
document.body.oninput = (t) => {
    if (t.target.tagName == "TD") {
        if (saveState == false) {
            document.title += " - не збережено";
            saveState = true;
        }
    } else if (t.target.getAttribute("list")) {
        let codeOperation = Number(t.target.value);
        const txt = JSON.parse(fs.readFileSync("resources/DataBase/Операції.json", "utf-8"));
        txt["Операції"]["values"].forEach(ob => {
            if (Number(ob["Код операції"]) === codeOperation) {
                let arr = [];
                Array.from(document.querySelectorAll("th")).forEach(e => {
                    arr.push(e.innerText);
                })
                if (t.target.parentNode.parentNode.querySelectorAll("td")[arr.indexOf("Назва операції")]) {
                    t.target.parentNode.parentNode.querySelectorAll("td")[arr.indexOf("Назва операції")].innerText = ob["Ім'я операції"]
                }

            }
        })
    }
}
function renderCategories() {
    Categories.forEach(category => {
        const Cate = document.createElement("category");
        Cate.innerText = category;
        Cate.className = "categorye";
        document.querySelector("categories").appendChild(Cate);
    })
}
renderCategories();
document.querySelector("categories").onclick = function(e) {
    if (TEMP_ELEM && e.target.classList.contains("categorye")) {
        TEMP_ELEM.innerText = e.target.innerText;
        TEMP_ELEM = null;
        this.style.display = "none";
    }
}
document.querySelector("#oop").onclick = () => {
    document.querySelector("#file").click()
}
const mustBeCreatedeFiles = finderFiles();
if (mustBeCreatedeFiles.length == 11) {
    fs.mkdir(`resources/DataBase`, { recursive: true }, (err) => {
        if (err) {
            ERROR("Помилка", err);
        } else {
            creatorFiles();
        }
    });
} else if (mustBeCreatedeFiles.length !== 0 && mustBeCreatedeFiles.length < 11) {
    creatorFiles()
} else {
    console.log(readerFromTable("Операції"))
}
function creatorFiles() {
    mustBeCreatedeFiles.forEach(file => {
        file = file.replace("DataBase\\", "");
        fs.copyFileSync("templates/" + file, "resources/DataBase/" + file);
    })
    readerFromTable("Операції");
}
function readerFromTable(table_name) {
    const datalist = document.querySelector("datalist#ll");
    const object = JSON.parse(fs.readFileSync(`resources/DataBase/${table_name}.json`, "utf-8"))[table_name].values;
    object.forEach(obj => {
        const option = document.createElement("option");
        option.value = obj["Код операції"];
        option.innerText = obj["Ім'я операції"];
        datalist.appendChild(option);
    })
}