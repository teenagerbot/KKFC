// var table = document.querySelector("table"),rIndex,cIndex;
// // table rows
// for(var i = 1; i < table.rows.length; i++)
// {
//     // row cells
//     for(var j = 0; j < table.rows[i].cells.length; j++)
//     {
//         table.rows[i].cells[j].onclick = function()
//         {
//             rIndex = this.parentElement.rowIndex;
//             cIndex = this.cellIndex+1;
//             console.log("Row : "+rIndex+" , Cell : "+cIndex);
//         };
//     }
// }

// Отримуємо посилання на таблицю
// var table = document.querySelector('table');

// // Створюємо порожній словник
// setTimeout(() => {
//     var dictionary = {};

// // Отримуємо список заголовків стовпців
// var headers = [];
// var headerCells = table.querySelectorAll('th');
// headerCells.forEach(function(cell) {
//   headers.push(cell.textContent.trim());
// });

// // Отримуємо дані з комірок таблиці
// var rows = table.querySelectorAll('tr');
// rows.forEach(function(row) {
//   var cells = row.querySelectorAll('td');
//   cells.forEach(function(cell, index) {
//     var header = headers[index];
//     var value = cell.textContent.trim();

//     // Зберігаємо значення у словник
//     if (!dictionary[header]) {
//       dictionary[header] = [];
//     }
//     dictionary[header].push(value);
//   });
// });

// // Виводимо словник у консоль
// console.log(dictionary);
// }, 10000)


const readFromTable = () => {
    const TRS = Array.from(document.querySelectorAll("tr"));
    const THS = Array.from(document.querySelectorAll("th"));
    TRS.shift();
    const ResObj = {};
    TRS.forEach((tr, index) => {
        if (tr.querySelector("[namer]") && tr.querySelector("[namer]").getAttribute("namer") == "Назва дії") {
            ResObj[index] = {
                "Перехід": tr.querySelector("[namer]").innerText,
                [tr.nextElementSibling.querySelector("[namer='Інструмент']").getAttribute("namer")]: tr.nextElementSibling.querySelector("[namer='Інструмент']").innerText,
                [tr.nextElementSibling.nextElementSibling.querySelector("[namer='Вимірювальний інструмент']").getAttribute("namer")]: tr.nextElementSibling.nextElementSibling.querySelector("[namer='Вимірювальний інструмент']").innerText,
                "data": {
                    "ПІ": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.innerText,
                    "D або B": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.innerText,
                    "L": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "t": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "i": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "S": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "n": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "V": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "H": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "Y": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "X": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "E": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "F": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "h": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "R": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "d": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
                    "Z": tr.nextElementSibling.nextElementSibling.nextElementSibling.querySelector("td.hidene").nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
                }
            }
        }
    })
    return ResObj;
}