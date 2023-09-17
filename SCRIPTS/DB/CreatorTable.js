const creator = (db, query, tableName) => {
  saveState = false;
  document.querySelector("h2").innerText = String(tableName);
  const table = document.createElement("table");
  table.innerHTML = `<thead></thead>
    <tbody></tbody>`;
  document.querySelector("#table").innerHTML = "";
  document.querySelector("#table").appendChild(table);
  // TR.innerHTML = `<th>Хто затверджує(посада)</th><th>Хто перевіряє(посада)</th><th>Нормоконтроль(ПІБ)</th><th>Посада</th><th>Видалити рядок</th>`;
  executeQuery(db, String(query), (res) => {
    var thead = table.getElementsByTagName('thead')[0];
    var tbody = table.getElementsByTagName('tbody')[0];

    // Создание заголовков таблицы на основе всех ключей данных
    var headers = [];
    for (var i = 0; i < res.length; i++) {
      var obj = res[i];
      for (var key in obj) {
        if (headers.indexOf(key) === -1) {
          headers.push(key);
        }
      }
    }

    var headerRow = document.createElement('tr');
    for (var i = 0; i < headers.length; i++) {
      var th = document.createElement('th');
      th.textContent = headers[i];
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    // Создание строк и ячеек таблицы на основе данных
    for (var i = 0; i < res.length; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < headers.length; j++) {
        console.log(headers[j], ": ", res[i][key])
        var cell = document.createElement('td');
        var key = headers[j];
        if (headers[j] == "Видалити") {
          cell.className = "k";
          cell.innerHTML = `<img src="../imgs/cross.png" class="rem">`;
        } else {
          cell.innerHTML = res[i][key] || '';
          cell.className = "CODE";
        }
        cell.setAttribute("sql", String(res[i][key]))
        row.appendChild(cell);
      }

      tbody.appendChild(row);
    }
  })
}