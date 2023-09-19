const windows = remote.getCurrentWindow();
IS_SAVED = true;
//form 2
document.querySelector('#next').onclick = () => {
  localStorage.setItem('__data_FORM2__', JSON.stringify(save()[0]));
  windows.hide();
  setTimeout(() => {
    const form3 = new remote.BrowserWindow({
      width: 466,
      height: 741,
      autoHideMenuBar: true,
      frame: false,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
        webviewTag: true,
        devTools: true,
      },
      icon: path.join(__dirname, '../', 'icon.ico'),
    });
    remote.require('@electron/remote/main').enable(form3.webContents);
    form3.webContents.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    );
    form3.loadFile('main/form3.html');
    form3.maximize();
    setTimeout(() => {
      windows.close();
    }, 30);
  }, 40);
};
document.querySelector('#prev').onclick = () => {
  localStorage.setItem('__data_FORM2__', JSON.stringify(save()[0]));
  windows.hide();
  setTimeout(() => {
    const form3 = new remote.BrowserWindow({
      width: 466,
      height: 741,
      //parent: windows,
      autoHideMenuBar: true,
      //transparent: true,
      frame: false,
      resizable: false,
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
    form3.loadFile('main/form1.html');
    setTimeout(() => {
      windows.close();
    }, 30);
  }, 40);
};
const Data = JSON.parse(
  fs.readFileSync('resources/DataBase/Матеріал.json', 'utf-8')
)['Матеріал'].values;
const ObjectData = {};
Data.forEach((el) => {
  ObjectData[el['Категорія']] = [];
});
Data.forEach((el) => {
  ObjectData[el['Категорія']].push(el['Матеріал']);
});
/**
 * 
 * {
    "Сталі": [
        "Сталь35",
        "Сталь34",
        "Сталь15"
    ],
    "Латунь": [
        "Латунь 12"
    ]
}
 */
const Categories = Object.keys(ObjectData);
Categories.forEach((category) => {
  const PC = document.createElement('p');
  const obgortka = document.createElement('join');
  PC.className = 'Cat';
  PC.appendChild(obgortka);
  obgortka.innerText = category;
  document.querySelector('.menu').appendChild(PC);
  const wind = document.createElement('div');
  PC.appendChild(wind);
  ObjectData[category].forEach((element) => {
    const item = document.createElement('p');
    item.className = 'item';
    item.innerText = element;
    wind.appendChild(item);
  });
});
window.onload = () => {
  const arrs = load();
  const datalist = document.querySelector('datalist');
  arrs.forEach((element) => {
    const option = document.createElement('option');
    option.innerText = element;
    datalist.appendChild(option);
  });
};
// document.querySelector("#addr").onclick = () => {
//   const tr = document.createElement("tr");
//   tr.innerHTML = `
//       <td><input></td>
//       <td><input class="material"></td>
//       <td><input></td>
//       <td><input list="list"></td>
//       <td><input></td>
//       <td><input></td>
//       <td><input></td>
//       <td class="rem"><img src="../imgs/trash.png"></td>`;
//   document.querySelector("table").appendChild(tr);
// }
// document.querySelector("table").onclick = (r) => {
//   if (r.target.className == "rem") {
//     r.target.parentNode.remove();
//   } else if (r.target.tagName == "IMG" && r.target.parentNode.className == "rem") {
//     r.target.parentNode.parentNode.remove();
//   }
// }
// document.querySelector("#save").onclick = () => {
//   localStorage.setItem("__data_FORM2__", JSON.stringify(save()))
// }
document.body.oninput = () => {
  localStorage.setItem('__data_FORM2__', JSON.stringify(save()[0]));
};
const menuData = [
  'divider', // divider
  'divider',
  {
    'text': 'Сталі',
    'sub': [
      {
        'text': 'Сталь35',
        'onclick': (e) => start(e),
      },
      {
        'text': 'Сталь15',
        'onclick': (e) => start(e),
      },
    ],
  },
  {
    'text': 'Всі',
    'extraText': 'Всі метали',
    'sub': [
      {
        'text': 'Сталь35',
        'onclick': (e) => start(e),
      },
      {
        'text': 'Сталь15',
        'onclick': (e) => start(e),
      },
      {
        'text': 'Сталь35',
        'onclick': (e) => start(e),
      },
      {
        'text': 'Сталь15',
        'onclick': (e) => start(e),
      },
    ],
  },
  {
    'text': 'Латунь',
    'sub': [
      {
        'text': 'Латунь 12',
        'onclick': (e) => start(e),
      },
    ],
  },
];
let ELEMENT_TEMP = null;
document.body.onclick = (el) => {
  if (el.target.className == 'material') {
    document.querySelector('.menu').style.display = 'block';
    document.querySelector('.menu').style.left =
      el.clientX +
      parseFloat(getComputedStyle(document.querySelector('div.menu')).width) /
      2 +
      'px';
    document.querySelector('.menu').style.top = el.clientY + 'px';
    ELEMENT_TEMP = el.target;
  } else if (el.target.className == 'item') {
    ELEMENT_TEMP == null ? 0 : (ELEMENT_TEMP.value = el.target.innerText);
    localStorage.setItem("__Category__", el.target.parentNode.previousElementSibling.innerText);
    document.querySelector('.menu').style.display = 'none';
  } else {
    document.querySelector('.menu').style.display = 'none';
  }
};
document.querySelector('.menu').style.display = 'none';
function Load() {
  const object = JSON.parse(localStorage.getItem('__data_FORM2__'));
  /**
   * [{"Назва деталі":"деталь 1","Матеріал":"Сталь35","Маса деталі, кг":"12кг","Тип заготівки":"Прокат листовий","Маса заготівки":"12","Розмір заготівки":"23","Кількість партій":"123"}]
   */
  document.querySelector('input:first-child').value = object['Назва деталі'];
  document.querySelector('td:nth-child(2) input').value = object['Матеріал'];
  document.querySelector('td:nth-child(3) input').value =
    object['Маса деталі, кг'];
  document.querySelector('td:nth-child(4) input').value =
    object['Тип заготівки'];
  document.querySelector('td:nth-child(5) input').value =
    object['Маса заготівки'];
  document.querySelector('td:nth-child(6) input').value =
    object['Розмір заготівки B, мм'];
  document.querySelector('td:nth-child(7) input').value =
    object['Розмір заготівки H, мм'];
  document.querySelector('td:nth-child(8) input').value =
    object['Кількість'];
}
if (localStorage.getItem('__data_FORM2__') && Object.keys(JSON.parse(localStorage.getItem('__data_FORM2__'))).length > 0 && JSON.parse(localStorage.getItem('__data_FORM2__')) != undefined) {
  Load();
}
clear('__data_FORM2__', windows);








