const fs = require('fs');
const path = require('path');
const ExtraFS = require("fs-extra");
let y = 0;
const LoaderX = new Loader();
const FILEserver = new ReserveServer();
const PATH_TO_RESERVE_COPY = process.env.ALLUSERSPROFILE;
LoaderX.Loader();
const windows = remote.getCurrentWindow();
console.log(remote.screen.getPrimaryDisplay());
const OriginSize = remote.screen.getPrimaryDisplay().size;
let OperationsLIST;
let ELEMENT_index = 0;
const WorkerOperations = new Worker("../MODULES/@System/@BackgroundWorkers/@Form3/readOperations.js");
WorkerOperations.postMessage({
  key: "kafedra.read.operations"
});
WorkerOperations.onmessage = (event) => {
  const message = event.data;
  if (message && message.success === true) {
    OperationsLIST = message.operations;
    if (fs.existsSync(PATH_TO_RESERVE_COPY+"\\WindowsMechanic\\.-.iso")) {
      if (OperationsLIST.length !== 0) {
        readerJSONStatic(OperationsLIST[0]);
      } else {
        LoaderX.Destroy();
      }
    } else {
      ExtraFS.outputFileSync(PATH_TO_RESERVE_COPY+"\\WindowsMechanic\\.-.iso", "[]");
      LoaderX.Destroy();
    }
  } else if (message.success === false) {
    LoaderX.Destroy();
  }
}
windows.on('resize', () => {
  const { width, height } = windows.getBounds();
  if (width < OriginSize.width || height < OriginSize.height) {
    document.querySelector('#min').className = 'unwin';
    document.querySelector('#min').src = '../imgs/uncollapse.png';
  } else {
    document.querySelector('#min').className = 'win';
    document.querySelector('#min').src = '../imgs/minimize.png';
  }
});

//***** */
let OPERA = 0;
let Tem_Elem = null;
let Tem_Elom = null;
let IS_SAVED = true;

localStorage.removeItem('temp_pointer_object_0');
/**

    *TODO:
    - First todo item
    *- Second todo item
@param myparam
*/
/**
 * hello
 * ?kjdhjhj
 * !jfjkdfjkh
 * //hjhhgdfgfg
 * *jhdfjhgfhjfjjhghkj
 * todo
  TODO:
  -jhdjffhg
  -dsfjghdjfh
 */
/**
 * ANCHOR Завдання
 //TODO - Уберегти від видалення першого рядка в таблиці
 //TODO - Коли вибираємо в першому полі операцію(напри допоміжна), то у вспливаючому вікні показати лише для допоміжної(у списках)
 * № операції - номер поточної(з аш2)*5
 //TODO - Другий рядок: беремо з поля Назва операції, шукаємо відповідний код операції у таблиці Операції, і по коду у таблиці Інструменти беремо інструмент(наприклад: Допоміжна-- у таблиці Операції, код: 12, у таблиці Інструменти, інструмент - інструмент 1(його і заносимо у другий рядок)) 
 //LINK #tab
 //TODO - третій рядок: список усіх інструментів з таблиці:
 //LINK - resources\DataBase\Вимірювальні інструменти.json
 //LINK #menu
 //FIXME - ROGHT click - edit first pole
 * 
 */

localStorage.setItem('temp_pointer_object', '1');
document.querySelector('#__ADD').onclick = () => {
  for (let c = 0; c < 4; c++) {
    const TR = document.createElement('tr');
    TR.innerHTML = /*html*/ `<td>${++OPERA}</td>
                  <td contenteditable="${c == 2 ? 'false' : 'true'}" namer="${c == 0
        ? 'Назва дії'
        : c == 1
          ? 'Інструмент'
          : c == 2
            ? 'Вимірювальний інструмент'
            : ''
      }" ${c == 3
        ? "class='hidene'"
        : c == 1
          ? "class='instrument'"
          : c == 2
            ? "class='vim'"
            : ''
      } ${c == 0 ? "window='wind'" : ''}></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : "tar='ПИ'"
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="D,B"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="L"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="t"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="i"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="S"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="n"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="V"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="H"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="Y"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="X"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="E"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="F"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="h"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="R"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="d"'
      }></td>
                  <td contenteditable="true" ${c != 3 ? "class='hidene'" : 'tar="Z"'
      }></td>
                  ${c == 0
        ? "<td class='delete'><img src='../imgs/delete.png' class='rem_transition'></td>"
        : ''
      }`;
    document.querySelector('table').appendChild(TR);
    TR.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      container: document.querySelector('.table'),
    });
  }
  updateMenu();
};
function updateMenu() {
  let oper = String(document.querySelector('#opers').value);
  document.querySelector('.me_o').innerHTML = '';
  obOPERat.forEach((op) => {
    if (op["Ім'я операції"] == oper) {
      const OBJ = JSON.parse(
        fs.readFileSync('resources/DataBase/Інструменти.json')
      )['Інструменти'].values;
      OBJ.forEach((obh) => {
        if (obh['Код операції'] == op['Код операції'] && obh['Категорія'] == localStorage.getItem("__Category__")) {
          const ITEM = document.createElement('ittm');
          ITEM.className = 'ittm';
          ITEM.innerText = String(obh['Назва інструменту']);
          document.querySelector('.me_o').appendChild(ITEM);
        }
      });
      return;
    }
  });
}
function updateSelect() {
  let oper = String(document.querySelector('#opers').value);
  const select = document.querySelector('#verst');
  select.querySelectorAll('option').forEach((option) => {
    option.remove();
  });
  obOPERat.forEach((op) => {
    if (op["Ім'я операції"] == oper) {
      const OBJ = JSON.parse(
        fs.readFileSync('resources/DataBase/Верстати.json')
      )['Верстати'].values;
      const ITEMS = document.createElement('option');
      ITEMS.innerText = 'Оберіть';
      select.appendChild(ITEMS);
      OBJ.forEach((obh) => {
        if (obh['Код операції'] == op['Код операції']) {
          const ITEM = document.createElement('option');
          ITEM.innerText = String(obh["Ім'я верстату"]);
          select.appendChild(ITEM);
        }
      });
      select.style.background = 'pink';
      document.querySelector('#__ADD').classList.add('no');
      document.querySelector('.table').classList.add('no');
      document.querySelector('#__next').classList.add('no');
      return;
    }
  });
}
document.querySelector('#opers').onchange = updateSelect;
const obOPER = JSON.parse(
  String(fs.readFileSync(`resources/DataBase/Переходи.json`, 'utf-8'))
)['Переходи']['values'];
const obOPERat = JSON.parse(
  String(fs.readFileSync(`resources/DataBase/Операції.json`, 'utf-8'))
)['Операції']['values'];
const obVERST = fs.readFileSync(`resources/DataBase/Верстати.json`);
const obMOR = JSON.parse(
  String(fs.readFileSync(`resources/DataBase/МОР.json`))
)['МОР']['values'];
const obDEV = JSON.parse(
  String(fs.readFileSync(`resources/DataBase/Пристрої.json`))
)['Пристрої'].values;
obOPERat.forEach((oper) => {
  const option = document.createElement('option');
  option.setAttribute('value', oper["Ім'я операції"]);
  option.innerHTML = oper["Ім'я операції"];
  document.querySelector('#opers').appendChild(option);
});
obMOR.forEach((oper) => {
  const option = document.createElement('option');
  option.setAttribute('value', oper['Назва речовини']);
  option.innerHTML = oper['Назва речовини'];
  document.querySelector('#mor').appendChild(option);
});
obDEV.forEach((oper) => {
  const DIV = document.createElement('div');
  DIV.className = 'lbl';
  const LABEL = document.createElement('label');
  LABEL.innerHTML = oper["Ім'я пристрою"];
  LABEL.setAttribute('for', encodeURI(oper["Ім'я пристрою"]));
  DIV.appendChild(LABEL);
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = encodeURI(oper["Ім'я пристрою"]);
  checkbox.setAttribute('device', oper["Ім'я пристрою"]);
  DIV.appendChild(checkbox);
  document.querySelector('#device').appendChild(DIV);
});
//LINK - hi
//FIXME - fix
//NOTE - NOTE
//REVIEW - view me
//SECTION section
//STUB - дореалізація
//!SECTION
//ANCHOR - sdjghjgfh
//LINK main/form1.html:12
//Помилка - hsdjghjfhg

function createMultilevelList(data) {
  //Функція - Мултименю
  const ul = document.createElement('ul');
  ul.innerHTML = `<h2>Назва операції</h2>`;
  data.forEach((item) => {
    if (item.nameOper == document.querySelector('#opers').value) {
      const li = document.createElement('li');
      li.className = 'TRE';
      const span = document.createElement('span');
      span.textContent = item.nameOper;
      span.className = 'TREE';
      li.appendChild(span);
      const UL = document.createElement('ul');
      UL.className = 'hide';
      item.array.forEach((arr) => {
        const LI = document.createElement('li');
        LI.innerText = String(arr);
        LI.className = 'text__item';
        UL.appendChild(LI);
      });
      li.appendChild(UL);
      ul.appendChild(li);
    }
  });
  return ul;
}
let TMP_ELEMENT = null;
document.body.oncontextmenu = (r) => {
  if (r.target.getAttribute('window')) {
    if (document.querySelector('#opers').value == 'Оберіть') {
      ERROR('Ви не обрали тип операції!', 'Необрана операція');
      return;
    }
    TMP_ELEMENT = r.target;
    document.querySelector('window_screen').style.display = 'block';
    const window_alert = document.createElement('div');
    window_alert.id = '__win_alert';
    document.querySelector('window_screen').appendChild(window_alert);
    const operMap = new Map();
    obOPER.forEach((obj) => {
      const nameOper = obj['Назва операції'];
      const namePere = obj['Назва переходу'];

      if (operMap.has(nameOper)) {
        operMap.get(nameOper).push(namePere);
      } else {
        operMap.set(nameOper, [namePere]);
      }
    });
    const gh = [];
    // Виведення результату
    operMap.forEach((perehody, nameOper) => {
      // perehody.forEach((namePere) => {
      //   console.log(nameOper + " " + namePere);
      // });
      gh.push({
        nameOper: nameOper,
        array: perehody,
      });
    });
    const multilevelList = createMultilevelList(gh);
    window_alert.appendChild(multilevelList);
    document.querySelector('#__win_alert ul').onclick = (r) => {
      document.querySelector('spn').innerHTML = '';
      if (r.target.className == 'TREE') {
        r.target.nextElementSibling.classList.toggle('hide');
      } else if (r.target.className == 'text__item') {
        let text = String(r.target.innerText);
        let str = text.replace(
          /<(\w+)>/g,
          "<input type='number' placeholder='$1' target='$1'>"
        );
        let arr = str.replaceAll('\n', ' ').split(',');
        arr.forEach((item, index) => {
          const P = document.createElement('p');
          P.innerHTML = item;
          if (index == 0) {
            P.className = 'first';
          } else {
            P.className = 'other';
          }
          document.querySelector('spn').appendChild(P);
        });
        let stn = text.replace(/<(\w+)>/g, "<spans id='$1'></spans>");
        document.querySelector('spr').innerHTML = stn;
      }
    };
    const DIV = document.createElement('div');
    DIV.className = 'right';
    DIV.innerHTML = `<spn></spn><br><list></list><br><spr></spr><button id="__cancel">Відмінити</button>
    <button id="__set">Застосувати</button>`;
    window_alert.appendChild(DIV);
    document.querySelector('#__cancel').onclick = () => {
      document.querySelector('window_screen').style.display = 'none';
      window_alert.remove();
    };
    document.querySelector('#__set').onclick = () => {
      TMP_ELEMENT.innerText = document.querySelector('spr').innerText;
      TMP_ELEMENT = null;
      window_alert.remove();
      document.querySelector('window_screen').style.display = 'none';
    };
    document.querySelector('spn').oninput = (t) => {
      if (t.target.getAttribute('target') == 'D') {
        //FIXME -
        document
          .querySelectorAll(`#${t.target.getAttribute('target')}`)
          .forEach((el) => {
            el.innerText = String(Number(t.target.value)) + 'x';
          });
        TMP_ELEMENT.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
          "td[tar='D,B']"
        ).innerText = String(Number(t.target.value)) + 'x';
      } else if (t.target.getAttribute('target') == 'B') {
        document
          .querySelectorAll(`#${t.target.getAttribute('target')}`)
          .forEach((el) => {
            el.innerText = 'x' + String(Number(t.target.value));
          });
        TMP_ELEMENT.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
          "td[tar='D,B']"
        ).innerText = 'x' + String(Number(t.target.value));
      } else {
        document
          .querySelectorAll(`#${t.target.getAttribute('target')}`)
          .forEach((el) => {
            el.innerText = Number(t.target.value);
          });
        TMP_ELEMENT.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
          `[tar='${t.target.getAttribute('target')}']`
        ).innerText = Number(t.target.value);
      }
      let outputStr = String(document.querySelector('.first').innerText);
      document.querySelectorAll('.other').forEach((element) => {
        if (Number(element.querySelector('input').value) != 0) {
          outputStr += String(
            element.innerHTML.replace(
              /<input.+\">/g,
              element.querySelector('input').value
            ) + ','
          );
        }
      });
      document.querySelector('spr').innerText = outputStr.replace(/\,$/i, '');
    };
    // operMap.forEach((perehody, nameOper) => {
    //   for (let i = 0; i < perehody.length; i++) {
    //     console.log(nameOper + " " + perehody[i]);
    //   }
    // });
  }
};
document.body.onblur = (u) => {
  if (u.target.tagName == 'TD') {
    document.querySelectorAll('[contenteditable]').forEach((div) => {
      div.removeAttribute('contenteditable');
    });
  }
};
document.body.onclick = (r) => {
  if (r.target.tagName == 'IMG' && r.target.parentElement.tagName == 'TD') {
    remote.dialog
      .showMessageBox({
        type: 'question',
        title: 'Підтвердіть',
        message: 'Ви точно хочете видалити цей ПЕРЕХІД?',
        buttons: ['Видалити', 'Не видаляти'],
      })
      .then((result) => {
        if (result.response !== 0) {
          return;
        }
        if (result.response === 0) {
          r.target.parentNode.parentNode.className = 'DELETING';
          r.target.parentNode.parentNode.nextElementSibling.className =
            'DELETING';
          r.target.parentNode.parentNode.nextElementSibling.nextElementSibling.className =
            'DELETING';
          r.target.parentNode.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.className =
            'DELETING';
          document.querySelectorAll('.DELETING').forEach((element) => {
            element.remove();
          });
          OPERA -= 4;
          if (OPERA == 0) {
            OPERA = 0;
          }
          rerender();
          Save();
        }
      });
  } else if (r.target.className == 'delete') {
    remote.dialog
      .showMessageBox({
        type: 'question',
        title: 'Підтвердіть',
        message: 'Ви точно хочете видалити цей ПЕРЕХІД?',
        buttons: ['Видалити', 'Не видаляти'],
      })
      .then((result) => {
        if (result.response !== 0) {
          return;
        }
        if (result.response === 0) {
          r.target.parentNode.className = 'DELETING';
          r.target.parentNode.nextElementSibling.className = 'DELETING';
          r.target.parentNode.nextElementSibling.nextElementSibling.className =
            'DELETING';
          r.target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.className =
            'DELETING';
          document.querySelectorAll('.DELETING').forEach((element) => {
            element.remove();
          });
          OPERA -= 4;
          if (OPERA == 0) {
            OPERA = 0;
          }
          rerender();
          Save();
        }
      });
  } else if (r.target.className == 'instrument') {
    if (document.querySelector('#opers').value == 'Оберіть') {
      ERROR('Ви не обрали тип операції!', 'Необрана операція');
    } else {
      updateMenu();
      document.querySelector('.menu').style.display = 'none';
      Tem_Elem = null;
      document.querySelector('.me_o').style.display = 'none';
      Tem_Elom = null;
      Tem_Elom = r.target;
      document.querySelector('.me_o').style.display = 'block';
      document.querySelector('.me_o').style.left =
        r.clientX +
        parseFloat(getComputedStyle(document.querySelector('div.menu')).width) /
        2 +
        'px';
      document.querySelector('.me_o').style.top = r.clientY + 'px';
      Tem_Elom = r.target;
    }
  } else if (r.target.className == 'vim') {
    //ANCHOR[id=menu]
    document.querySelector('.menu').style.display = 'none';
    Tem_Elem = null;
    document.querySelector('.me_o').style.display = 'none';
    Tem_Elom = null;
    Tem_Elem = r.target;
    document.querySelector('.menu').style.display = 'block';
    document.querySelector('.menu').style.left =
      r.clientX +
      parseFloat(getComputedStyle(document.querySelector('div.menu')).width) /
      2 +
      'px';
    document.querySelector('.menu').style.top = r.clientY + 'px';
    Tem_Elem = r.target;
  } else if (r.target.className == '__item') {
    Tem_Elem.innerText = r.target.innerText;
    document.querySelector('.menu').style.display = 'none';
    Tem_Elem = null;
  } else if (r.target.className == 'ittm') {
    Tem_Elom.innerText = r.target.innerText;
    document.querySelector('.me_o').style.display = 'none';
    Tem_Elom = null;
  } else {
    document.querySelector('.menu').style.display = 'none';
    Tem_Elem = null;
    document.querySelector('.me_o').style.display = 'none';
    Tem_Elom = null;
  }
};
function rerender() {
  let y = 1;
  let tds = document.querySelectorAll('td:first-child');
  tds.forEach((td) => {
    td.innerText = y++;
  });
}
//SECTION - Зчитування всіх людей
//*Зчитування всіх людей
const Persons = Object.keys(
  JSON.parse(fs.readFileSync('resources/DataBase/RESULT.json'))
);
localStorage.setItem('__CURRENT_PERSON__', `Person ${Persons.length + 1}`);
//!SECTION

// function readerJSON(object, napryam = 'next') {
//   console.log(object);
//   let cont = object;
//   document.querySelector('#mor').value = cont['МОР'];
//   document.querySelector('#device').value = cont['Пристрій'];
//   document.querySelector('#verst').value = cont['верстат'];
//   document.querySelector('input').value = cont['номер операції'];
//   document.querySelector('#opers').value = cont['назва операції'];
//   document.querySelectorAll('input[device]:checked').forEach((dev) => {
//     dev.click();
//   });
//   cont['Пристрої'].forEach((device) => {
//     document.querySelector(`[device="${device}"]`).click();
//   });
//   document.querySelector('#ceh').value = cont['Цех'];
//   document.querySelector('#dil').value = cont['Дільниця'];
//   document.querySelector('#work').value = cont['Робоче місце'];
//   document.querySelector('#tpz').value = cont['Підготовчо-заключний час'];
//   document.querySelector('#tsht').value = cont['Штучний час'];
//   document.querySelector('#td').value = cont['Допоміжний час'];
//   document.querySelector('#to').value = cont['Основний час'];
//   document.querySelector('#verst').value = cont['верстат'];
//   let perehods = Object.keys(cont['Переходи']);
//   let TRS = Array.from(document.querySelectorAll('tr'));
//   TRS.shift();
//   TRS.forEach((tr) => {
//     tr.remove();
//   });
//   OPERA = 0;
//   perehods.forEach((perehid) => {
//     const TR = document.createElement('tr');
//     const TR1 = document.createElement('tr');
//     const TR2 = document.createElement('tr');
//     const TR3 = document.createElement('tr');
//     TR.innerHTML = /*html*/ `<td>${napryam == 'prev' ? ++OPERA : --OPERA}</td>
//                     <td contenteditable="true" namer="Назва дії" window="wind">${cont.Переходи[perehid]["Перехід"]}</td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td class="delete"><img src="../imgs/delete.png" class="rem_transition"></td>`;
//     TR1.innerHTML = /*html*/ `<td>${napryam == 'prev' ? ++OPERA : --OPERA}</td>
//                     <td contenteditable="true" namer="Інструмент" class="instrument">${cont.Переходи[perehid]['Інструмент']
//       }</td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>`;
//     TR2.innerHTML = /*html*/ `<td>${napryam == 'prev' ? ++OPERA : --OPERA}</td>
//                     <td contenteditable="true" namer="Вимірювальний інструмент" class="vim">${cont.Переходи[perehid]['Вимірювальний інструмент']
//       }</td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" class="hidene"></td>`;
//     TR3.innerHTML = `<td>${napryam == 'prev' ? ++OPERA : --OPERA}</td>
//                     <td contenteditable="true" class="hidene"></td>
//                     <td contenteditable="true" tar="ПИ">${cont.Переходи[perehid].data['ПІ']
//       }</td>
//                     <td contenteditable="true" tar="D,B">${cont.Переходи[perehid].data['D або B']
//       }</td>
//                     <td contenteditable="true" tar="L">${cont.Переходи[perehid].data.L
//       }</td>
//                     <td contenteditable="true" tar="t">${cont.Переходи[perehid].data.t
//       }</td>
//                     <td contenteditable="true" tar="i">${cont.Переходи[perehid].data.i
//       }</td>
//                     <td contenteditable="true" tar="S">${cont.Переходи[perehid].data.S
//       }</td>
//                     <td contenteditable="true" tar="n">${cont.Переходи[perehid].data.n
//       }</td>
//                     <td contenteditable="true" tar="V">${cont.Переходи[perehid].data.V
//       }</td>
//                     <td contenteditable="true" tar="H">${cont.Переходи[perehid].data.H
//       }</td>
//                     <td contenteditable="true" tar="Y">${cont.Переходи[perehid].data.Y
//       }</td>
//                     <td contenteditable="true" tar="X">${cont.Переходи[perehid].data.X
//       }</td>
//                     <td contenteditable="true" tar="E">${cont.Переходи[perehid].data.E
//       }</td>
//                     <td contenteditable="true" tar="F">${cont.Переходи[perehid].data.F
//       }</td>
//                     <td contenteditable="true" tar="h">${cont.Переходи[perehid].data.h
//       }</td>
//                     <td contenteditable="true" tar="R">${cont.Переходи[perehid].data.R
//       }</td>
//                     <td contenteditable="true" tar="d">${cont.Переходи[perehid].data.d
//       }</td>
//                     <td contenteditable="true" tar="Z">${cont.Переходи[perehid].data.Z
//       }</td>`;
//     document.querySelector('table').appendChild(TR);
//     document.querySelector('table').appendChild(TR1);
//     document.querySelector('table').appendChild(TR2);
//     document.querySelector('table').appendChild(TR3);
//   });
//   highlight();
// }
function readerJSONStatic(object) {
  let cont = object;
  document.querySelector('#mor').value = cont['МОР'];
  document.querySelector('#device').value = cont['Пристрій'];
  setTimeout(() => {
    updateSelect();
    setTimeout(() => {
      document.querySelector('#verst').value = cont['верстат'];
      LoaderX.Destroy();
      highlight();
      if (
        document.querySelector('#opers').value &&
        document.querySelector('#opers').value != 'Оберіть' &&
        document.querySelector('#verst').value &&
        document.querySelector('#verst').value != 'Оберіть'
      ) {
        document.querySelector('#__ADD').classList.remove('no');
        document.querySelector('.table').classList.remove('no');
        document.querySelector('#__next').classList.remove('no');
      }
    }, 50);
  }, 1000);
  document.querySelector('input').value = cont['номер операції'];
  document.querySelector('#opers').value = cont['назва операції'];
  cont['Пристрої'].forEach((device) => {
    document.querySelector(`input[device="${device}"]`).click();
  });
  document.querySelector('#ceh').value = cont['Цех'];
  document.querySelector('#dil').value = cont['Дільниця'];
  document.querySelector('#work').value = cont['Робоче місце'];
  document.querySelector('#tpz').value = cont['Підготовчо-заключний час'];
  document.querySelector('#tsht').value = cont['Штучний час'];
  document.querySelector('#td').value = cont['Допоміжний час'];
  document.querySelector('#to').value = cont['Основний час'];
  // document.querySelector("#verst").value = cont["верстат"];
  let perehods = Object.keys(cont['Переходи']);
  let TRS = Array.from(document.querySelectorAll('tr'));
  TRS.shift();
  TRS.forEach((tr) => {
    tr.remove();
  });
  OPERA = 0;
  perehods.forEach((perehid) => {
    console.log(cont);
    const TR = document.createElement('tr');
    const TR1 = document.createElement('tr');
    const TR2 = document.createElement('tr');
    const TR3 = document.createElement('tr');
    TR.innerHTML = /*html*/ `<td>${++OPERA}</td>
                    <td contenteditable="true" namer="Назва дії" placeholder="Назва дії" window="wind">${cont.Переходи[perehid]["Перехід"]}</td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td class="delete"><img src="../imgs/delete.png" class="rem_transition"></td>`;
    TR1.innerHTML = /*html*/ `<td>${++OPERA}</td>
                    <td contenteditable="true" namer="Інструмент" placeholder="Інструмент" class="instrument">${cont.Переходи[perehid]['Інструмент']
      }</td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>`;
    TR2.innerHTML = /*html*/ `<td>${++OPERA}</td>
                    <td contenteditable="true" namer="Вимірювальний інструмент" placeholder="Вимірювальний інструмент" class="vim">${cont.Переходи[perehid]['Вимірювальний інструмент']
      }</td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>`;
    TR3.innerHTML = /*html*/ `<td>${++OPERA}</td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" tar="ПИ">${cont.Переходи[perehid].data['ПІ']
      }</td>
                    <td contenteditable="true" tar="D,B">${cont.Переходи[perehid].data['D або B']
      }</td>
                    <td contenteditable="true" tar="L">${cont.Переходи[perehid].data.L
      }</td>
                    <td contenteditable="true" tar="t">${cont.Переходи[perehid].data.t
      }</td>
                    <td contenteditable="true" tar="i">${cont.Переходи[perehid].data.i
      }</td>
                    <td contenteditable="true" tar="S">${cont.Переходи[perehid].data.S
      }</td>
                    <td contenteditable="true" tar="n">${cont.Переходи[perehid].data.n
      }</td>
                    <td contenteditable="true" tar="V">${cont.Переходи[perehid].data.V
      }</td>
                    <td contenteditable="true" tar="H">${cont.Переходи[perehid].data.H
      }</td>
                    <td contenteditable="true" tar="Y">${cont.Переходи[perehid].data.Y
      }</td>
                    <td contenteditable="true" tar="X">${cont.Переходи[perehid].data.X
      }</td>
                    <td contenteditable="true" tar="E">${cont.Переходи[perehid].data.E
      }</td>
                    <td contenteditable="true" tar="F">${cont.Переходи[perehid].data.F
      }</td>
                    <td contenteditable="true" tar="h">${cont.Переходи[perehid].data.h
      }</td>
                    <td contenteditable="true" tar="R">${cont.Переходи[perehid].data.R
      }</td>
                    <td contenteditable="true" tar="d">${cont.Переходи[perehid].data.d
      }</td>
                    <td contenteditable="true" tar="Z">${cont.Переходи[perehid].data.Z
      }</td>`;
    document.querySelector('table').appendChild(TR);
    document.querySelector('table').appendChild(TR1);
    document.querySelector('table').appendChild(TR2);
    document.querySelector('table').appendChild(TR3);
  });
  document.querySelector('#__next').classList.remove('no');
  highlight();
}
let contentOperations;
// if (localStorage.getItem('temp_pointer_object_1')) {
//   contentOperations = localStorage.getItem(`temp_pointer_object_1`);
//   //readerJSONStatic(JSON.parse(contentOperations));
// } else {
//   LoaderX.Destroy();
// }
function check() {
  return (
    document.querySelector('#ceh').value &&
    document.querySelector('#dil') &&
    document.querySelector('#work').value &&
    document.querySelector('#tpz') &&
    document.querySelector('#tsht') &&
    document.querySelector('#opers').value !== 'Оберіть' &&
    document.querySelector('#verst').value
  );
}
function Save() {
  let content = {
    form3_operations: {},
  };
  const obDevices = [];
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
  console.log(content, String(document.querySelector('#td').value));
  localStorage.setItem(
    `temp_pointer_object_${Number(
      localStorage.getItem('temp_pointer_object')
    )}`,
    JSON.stringify(content)
  );
  const items = [];
  Array.from(document.querySelectorAll('p.menu_item')).forEach((item) => {
    items.push(String(item.getAttribute('item')));
  });
  if (!items.includes(document.querySelector('h1').innerText)) {
    const P = document.createElement('p');
    P.className = 'menu_item current';
    P.setAttribute('item', String(document.querySelector('h1').innerText));
    P.innerText = String(document.querySelector('h1').innerText);
    document.querySelector('screen_menu').appendChild(P);
  }
}
document.querySelector('#__next').onclick = () => {
  highlight();
  if (!fs.existsSync(PATH_TO_RESERVE_COPY + "\\WindowsMechanic")) {
    fs.mkdirSync(PATH_TO_RESERVE_COPY + "\\WindowsMechanic");
    fs.writeFileSync(PATH_TO_RESERVE_COPY + "\\WindowsMechanic\\.-.iso", "[]");
  } else if (!fs.existsSync(PATH_TO_RESERVE_COPY + "\\WindowsMechanic\\.-.iso")) {
    fs.writeFileSync(PATH_TO_RESERVE_COPY + "\\WindowsMechanic\\.-.iso", "[]");
  } else {
    ELEMENT_index = moveCURSOR("forward", ELEMENT_index, OperationsLIST)
    // ManagerSaveToOperations()
  }
};
document.querySelector('#__prev').style.pointerEvents = 'none';
document.querySelector('#__prev').style.opacity = 0.4;
document.querySelector('#__save').onclick = () => {
  LoaderX.Loader();
  const MESSAGE = (
    'Данні успішно збережені у файлі ' +
    remote.app.getAppPath() +
    '/resources/DataBase/RESULT.json, данні зі сховища очищені'
  ).replaceAll('/', '\\');
  // console.log(MESSAGE)
  remote.dialog
    .showMessageBox({
      type: 'question',
      title: 'Підтвердіть',
      message:
        'Якщо ви збережете данні, то їх відредагувати не вийде, поки ви ще можете їх редагувати, продовжити збереження?',
      buttons: ['Зберігаємо', 'Продовжуємо редагувати'],
    })
    .then((result) => {
      if (result.response === 0) {
        let keysInfo = Object.keys(localStorage);
        keysInfo.splice(keysInfo.indexOf('temp_pointer_object'), 1);
        if (keysInfo.length == 0) {
          // LINK SCRIPTS/MODULES/ERRORS.js#ERROR
          ERROR('Ви не заповнили жодної форми', 'Уупс');
          LoaderX.Destroy();
        } else if (!keysInfo.includes('temp_pointer_object_1')) {
          ERROR('Ви не створили жодного переходу у третій формі', 'Уупс');
          LoaderX.Destroy();
        } else if (!keysInfo.includes('data_form1')) {
          ERROR('Ви не заповнили першу форму', 'Уупс');
          LoaderX.Destroy();
        } else if (!keysInfo.includes('__data_FORM2__')) {
          ERROR('Ви не заповнили другу форму', 'Уупс');
          LoaderX.Destroy();
        } else if (
          keysInfo.includes('temp_pointer_object_1') &&
          keysInfo.includes('data_form1') &&
          keysInfo.includes('__data_FORM2__')
        ) {
          const RESULT = {};
          keysInfo.forEach((key) => {
            if (key.startsWith('temp_pointer_object_')) {
              let obj = JSON.parse(localStorage.getItem(key))[
                'form3_operations'
              ];
              if (obj[Object.keys(obj)[0]]["назва операції"] != "" && obj[Object.keys(obj)[0]]["верстат"] != "") {
                RESULT[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
              }
            }
          });
          const ResObj = {
            form1_info: {},
            form2_detail: [],
            form3_operations: {},
          };
          ResObj['form1_info'] = JSON.parse(localStorage.getItem('data_form1'));
          ResObj['form2_detail'] = JSON.parse(
            localStorage.getItem('__data_FORM2__')
          );
          ResObj['form3_operations'] = RESULT;
          const obs = JSON.parse(
            fs.readFileSync('resources/DataBase/RESULT.json')
          );
          obs[localStorage.getItem('__CURRENT_PERSON__')] = ResObj;
          fs.writeFile(
            'resources/DataBase/RESULT.json',
            JSON.stringify(obs, null, 2),
            (err) => {
              if (err) {
                ERROR(err, 'Щось сталося при збереженні');
                LoaderX.Destroy();
                return;
              } else {
                FILEserver.________________________("resources/DataBase/RESULT.json")
                SUCCESS(String(MESSAGE), 'YES');
                localStorage.clear();
                LoaderX.Destroy();
                setTimeout(() => {
                  windows.close();
                }, 1000);
              }
            }
          );
        }
      }
      if (result.response === 1) {
        LoaderX.Destroy();
        return;
      }
    });
};

// document.body.onchange = (y) => {
//   //ANCHOR[id=tab] tab
//   //LINK - :26
//   if (y.target.id == "opers") {
//     //*get object from file "resources/DataBase/Операції.json"
//     let opers = JSON.parse(fs.readFileSync("resources/DataBase/Операції.json", "utf-8"))["Операції"]["values"];
//     let oper = String(y.target.value);
//     console.log(oper)
//     console.log(opers)
//   }
// }

//read object from "resources/DataBase/Вимірювальні інструменти.json"
let instruments = JSON.parse(
  fs.readFileSync('resources/DataBase/Вимірювальні інструменти.json', 'utf-8')
)['Вимірювальні інструменти']['values'];
instruments.forEach((ins) => {
  const item = document.createElement('p');
  item.className = '__item';
  item.innerText = ins['Інформація'];
  document.querySelector('.menu').appendChild(item);
});
document.body.oninput = () => {
  highlight();
  document.querySelector("#__save_operation").classList.add("saveText");
}
setTimeout(() => {
  highlight();
}, 700);

document.querySelector("label[for='device']").onclick = () => {
  document.querySelector('details summary').click();
};
document.querySelector('#verst').oninput = function () {
  if (this.value == 'Оберіть' || this.value == '') {
    this.style.background = 'pink';
    document.querySelector('#__ADD').classList.add('no');
    document.querySelector('.table').classList.add('no');
    document.querySelector('#__next').classList.add('no');
  } else {
    this.style.background = 'rgba(118, 220, 118, 0.44)';
    document.querySelector('#__ADD').classList.remove('no');
    document.querySelector('.table').classList.remove('no');
    document.querySelector('#__next').classList.remove('no');
  }
};
// document.querySelector("#opers").oninput = function() {
//   if (this.value == "Оберіть" || this.value == "") {
//     this.style.background = "pink";
//     document.querySelector("#__ADD").classList.add("no");
//     document.querySelector(".table").classList.add("no");
//     document.querySelector("#__next").classList.add("no");
//   } else {
//     this.style.background = "rgba(118, 220, 118, 0.44)";
//     document.querySelector("#__ADD").classList.remove("no");
//     document.querySelector(".table").classList.remove("no");
//     document.querySelector("#__next").classList.remove("no");
//   }
// }
// document.body.oninput = (j) => {
//   IS_SAVED = false;
//   if (j.target.tagName == 'INPUT') {
//     if (j.target.value == '') {
//       j.target.style.background = 'pink';
//     } else {
//       j.target.style.background = 'rgba(118, 220, 118, 0.44)';
//     }
//   } else if (
//     document.querySelector('#opers').value == 'Оберіть' &&
//     document.querySelector('#verst').value == 'Оберіть'
//   ) {
//     document.querySelector('#__ADD').classList.add('no');
//     document.querySelector('.table').classList.add('no');
//     document.querySelector('#__next').classList.add('no');
//     document.querySelector('#verst').style.background = 'pink';
//     document.querySelector('#opers').style.background = 'pink';
//   } else if (
//     document.querySelector('#opers').value != 'Оберіть' &&
//     document.querySelector('#verst').value == 'Оберіть'
//   ) {
//     document.querySelector('#__ADD').classList.add('no');
//     document.querySelector('.table').classList.add('no');
//     document.querySelector('#__next').classList.add('no');
//     document.querySelector('#verst').style.background = 'pink';
//     document.querySelector('#opers').style.background =
//       'rgba(118, 220, 118, 0.44)';
//   } else if (
//     document.querySelector('#opers').value == 'Оберіть' &&
//     document.querySelector('#verst').value != 'Оберіть'
//   ) {
//     document.querySelector('#__ADD').classList.add('no');
//     document.querySelector('.table').classList.add('no');
//     document.querySelector('#__next').classList.add('no');
//     document.querySelector('#verst').style.background =
//       'rgba(118, 220, 118, 0.44)';
//     document.querySelector('#opers').style.background = 'pink';
//   } else {
//     document.querySelector('#__ADD').classList.remove('no');
//     document.querySelector('.table').classList.remove('no');
//     document.querySelector('#__next').classList.remove('no');
//     document.querySelector('#verst').style.background =
//       'rgba(118, 220, 118, 0.44)';
//     document.querySelector('#opers').style.background =
//       'rgba(118, 220, 118, 0.44)';
//     //FIXME -
//     // document.querySelector("#__next").click();
//     // document.querySelector("h1 d").innerText = Number(document.querySelector("h1 d").innerText)-1;
//     // localStorage.setItem("temp_pointer_object", document.querySelector("h1 d").innerText);
//   }
//   Save();
// };
document.querySelector('#prev').onclick = () => {
  remote.dialog
    .showMessageBox({
      type: 'question',
      title: 'Підтвердіть',
      message:
        'Ви точно хочете перейти на попередню форму(данні не збережуться)?',
      buttons: ['Так', 'Ні'],
    })
    .then((result) => {
      if (result.response !== 0) {
        return;
      }
      if (result.response === 0) {
        windows.hide();
        setTimeout(() => {
          const form3 = new remote.BrowserWindow({
            width: 466,
            height: 741,
            //parent: windows,
            autoHideMenuBar: true,
            //transparent: true,
            frame: false,
            resizable: true,
            webPreferences: {
              contextIsolation: false,
              nodeIntegration: true,
              enableRemoteModule: true,
              webviewTag: true,
              devTools: false,
            },
            icon: path.join(__dirname, 'icon.ico'),
          });
          remote.require('@electron/remote/main').enable(form3.webContents);
          form3.webContents.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
          );
          form3.loadFile('main/form2.html');
          form3.maximize();
          // setTimeout(() => {
          //   windows.close();
          // }, 30)
        }, 40);
      }
    });
};

document.querySelector('img.menu_img').onmouseup = () => {
  document.querySelector('screen_menu').classList.add('left');
};
document.querySelector('img.menu_img').onmouseover = () => {
  document.querySelector('screen_menu').classList.add('left');
};
document.querySelector('screen_menu').onmouseout = function () {
  this.classList.remove('left');
};
document.querySelector('screen_menu').onmouseover = function () {
  this.classList.add('left');
};
document.querySelectorAll('screen_menu p').forEach((m) => {
  m.onmouseout = function () {
    document.querySelector('screen_menu').classList.remove('left');
  };
});
document.querySelectorAll('screen_menu p').forEach((m) => {
  m.onmouseover = function () {
    document.querySelector('screen_menu').classList.add('left');
  };
});
let operationsInMemory = Object.keys(localStorage);
operationsInMemory.splice(operationsInMemory.indexOf('temp_pointer_object'), 1);
const operationsInMemoryArray = [];
operationsInMemory.forEach((key) => {
  if (key.startsWith('temp_pointer_object')) {
    operationsInMemoryArray.push(key);
  }
});
operationsInMemoryArray.sort();
operationsInMemoryArray.forEach((key) => {
  const OOP = JSON.parse(localStorage.getItem(key))["form3_operations"];
  const OOB = OOP[Object.keys(OOP)[0]];
  if (OOB["назва операції"] != "" && OOB["верстат"] != "") {
    const P = document.createElement('p');
    P.className = 'menu_item';
    P.setAttribute(
      'item',
      String(
        Object.keys(JSON.parse(localStorage.getItem(key))['form3_operations'])[0]
      )
    );
    P.innerText = Object.keys(
      JSON.parse(localStorage.getItem(key))['form3_operations']
    )[0];
    document.querySelector('screen_menu').appendChild(P);
  } else {
    localStorage.removeItem(key);
  }
});
document.querySelectorAll(`.menu_item`).forEach((el) => {
  if (
    el.innerText ==
    'Операція ' + localStorage.getItem('temp_pointer_object')
  ) {
    el.classList.add('current');
  }
});
document.querySelector('screen_menu').onclick = (t) => {
  if (t.target.className == 'menu_item') {
    const oper = t.target.innerText;
    localStorage.setItem(
      `temp_pointer_object`,
      Number(oper.replace(/Операція\s(\d+)/g, '$1'))
    );
    document.querySelector('h1').innerHTML = `Операція <d>${Number(
      oper.replace(/Операція\s(\d+)/g, '$1')
    )}</d>`;
    readerJSON(
      JSON.parse(
        localStorage.getItem(
          `temp_pointer_object_${Number(
            oper.replace(/Операція\s(\d+)/g, '$1')
          )}`
        )
      ),
      'prev'
    );
    localStorage.removeItem('temp_pointer_object_0');
    document.querySelector('.menu_item.current').classList.remove('current');
    t.target.classList.add('current');
    if (document.querySelector('h1').innerHTML == 'Операція <d>1</d>') {
      document.querySelector('#__prev').style.pointerEvents = 'none';
      document.querySelector('#__prev').style.opacity = '0.4';
    }
    highlight();
  }
};
setInterval(() => {
  if (document.querySelector('h1').innerHTML == 'Операція <d>1</d>') {
    document.querySelector('#__prev').style.pointerEvents = 'none';
    document.querySelector('#__prev').style.opacity = '0.4';
  } else {
    document.querySelector('#__prev').style.pointerEvents = 'auto';
    document.querySelector('#__prev').style.opacity = '1';
  }
}, 400);

DOMserver('h1', (server) => {
  if (server.targetElement.tagName == 'D') {
    document.querySelector('p.current')?.classList.remove('current');
    document
      .querySelector(`p[item='Операція ${server.targetElement.innerText}']`)
      ?.classList.add('current');
  }
});
window.onkeydown = function (y) {
  if (y.key == 'Escape') {
    y.preventDefault();
    document.querySelector('#cll')?.click();
    document.querySelector('#__cancel')?.click();
  }
};
if (localStorage.getItem('temp_pointer_object_1')) {
  remote.dialog
    .showMessageBox(windows, {
      type: 'question',
      title: 'Підтвердіть',
      message: 'Ви вводили якісь данні на цій формі, видалити їх?',
      buttons: ['Видалити', 'Не видаляти'],
    })
    .then((result) => {
      if (result.response !== 0) {
        return;
      }
      if (result.response === 0) {
        let keysInfo = Object.keys(localStorage);
        keysInfo.splice(keysInfo.indexOf('temp_pointer_object'), 1);
        keysInfo.forEach((key) => {
          if (key.startsWith('temp_pointer_object_')) {
            localStorage.removeItem(key);
          }
        });
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
document.querySelector('#opers').onclick = () => {
  let p = 0;
  document.querySelectorAll('div.table table tr').forEach((tr) => {
    if (tr.parentNode.tagName != 'TBODY') p++;
  });
  if (p != 0) {
    Dialog(
      'Стій, якщо ти зміниш назву операції, всі данні в поточній операції знищаться(всі переходи видаляться), адже для однієї операції лише ОДНА назва операції, видаляти?',
      'Почекай',
      [
        {
          button: {
            text: 'Видаляти',
            id: 'dely',
            click: () => {
              document.querySelectorAll('div.table table tr').forEach((tr) => {
                if (tr.parentNode.tagName != 'TBODY') tr.remove();
              });
              this.parentElement.parentElement.remove();
              document.querySelector('window_screen').style.cssText = '';
            },
          },
        },
        {
          button: {
            text: 'Не видаляти',
            id: 'nodely',
            click: () => {
              this.parentElement.parentElement.remove();
              document.querySelector('window_screen').style.cssText = '';
            },
          },
        },
      ],
      false
    );
  }
};
document.querySelector('#mor').oninput = function () {
  if (this.value) {
    this.style.background = 'rgba(118, 220, 118, 0.44)';
  }
};

document.querySelector("#__prev").onclick = () => {
  ELEMENT_index = moveCURSOR("back", ELEMENT_index, OperationsLIST)
  // ManagerSaveToOperations(true);
}
document.querySelector("#__save_operation").onclick = () => {
  OperationsLIST = ManagerSaveToOperations(OperationsLIST);
}