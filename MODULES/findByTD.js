const findByTD = (td) => {
  var tdElement = td;

  var thElement = null;
  var tdIndex = -1;

  // Получите родительскую таблицу элемента <td>
  var tableElement = tdElement.closest('table');

  // Получите индекс столбца для данного <td> элемента
  var tdIndexInRow = Array.from(tdElement.parentNode.children).indexOf(tdElement);

  // Найти соответствующий <th> элемент, используя индекс столбца
  if (tdIndexInRow !== -1) {
    var thRowElements = tableElement.querySelectorAll('th');
    var thRowCount = thRowElements.length;
    var currentColumnIndex = 0;

    for (var i = 0; i < thRowCount; i++) {
      var colspan = thRowElements[i].getAttribute('colspan') || 1; // Получить значение атрибута "colspan" или 1, если атрибут не указан

      if (currentColumnIndex === tdIndexInRow) {
        thElement = thRowElements[i];
        break;
      }

      currentColumnIndex += parseInt(colspan, 10);
    }
  }

  tdIndex = tdIndexInRow;
  console.log("Индекс <th> элемента, соответствующего <td>: " + tdIndex);
  console.log("Соответствующий <th> элемент: ", thElement);
  return thElement;
}