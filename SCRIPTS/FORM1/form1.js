const db = connectDB();
const path = require("path")
const fs = require("fs")
const remote = require("@electron/remote");
const windows = remote.getCurrentWindow();
setTimeout(() => {
  check();
}, 400)
IS_SAVED = true;
// document.querySelector("#__next").style.display = "none"
document.querySelector("#__next").onclick = () => {
  windows.hide()
  setTimeout(() => {
    const form2 = new remote.BrowserWindow({
      width: 466,
      height: 741,
      //parent: windows,
      autoHideMenuBar: true,
      //transparent: true,
      frame: false,
      //resizable: true,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        webviewTag: true,
        devTools: true
      },
      icon: path.join(__dirname, "../", 'icon.ico')
    })
    remote.require("@electron/remote/main").enable(form2.webContents)
    form2.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
    form2.loadFile("main/form2.html");
    form2.maximize();
    setTimeout(() => {
      windows.close();
    }, 30)
  }, 40)
}
setTimeout(() => {
  Checker()
}, 1000)
document.body.oninput = () => {
  check()
  Checker()
}
const Posada = JSON.parse(fs.readFileSync("resources/DataBase/Посада.json", "utf-8"))["Посада"].values;
const Normkr = JSON.parse(fs.readFileSync("resources/DataBase/Нормоконтроль.json", "utf-8"))["Нормоконтроль"].values;
const Zatver = JSON.parse(fs.readFileSync("resources/DataBase/Перевіряє та затверджує.json", "utf-8"))["Перевіряє та затверджує"].values;
Posada.forEach(rs => {
  const option = document.createElement("option");
  option.innerText = rs["Посада"];
  document.querySelector("#__posada1").appendChild(option);
})
Normkr.forEach(rs => {
  const option = document.createElement("option");
  option.innerText = rs["ПІБ"];
  document.querySelector("#pib1").appendChild(option);
})
Zatver.forEach(rs => {
  const option = document.createElement("option");
  const option1 = document.createElement("option");
  option.innerText = rs["ПІБ"];
  option1.innerText = rs["ПІБ"];
  document.querySelector("#__PIB1").appendChild(option);
  document.querySelector("#_PIB1").appendChild(option1);
})
// FIXME - DB
// executeQuery(db, "SELECT * FROM Посада;", (res) => {
//   console.log(res)
//   res.forEach(rs => {
//     const option = document.createElement("option");
//     option.innerText = rs["Посада"];
//     document.querySelector("#__posada1").appendChild(option);
//   })
// })
// executeQuery(db, "SELECT ПІБ FROM [Перевіряє та затверджує];", (res) => {
//   res.forEach(rs => {
//     const option = document.createElement("option");
//     const option1 = document.createElement("option");
//     option.innerText = rs["ПІБ"];
//     option1.innerText = rs["ПІБ"];
//     document.querySelector("#__PIB1").appendChild(option);
//     document.querySelector("#_PIB1").appendChild(option1);
//   })
// })
// executeQuery(db, "SELECT * FROM Нормоконтроль;", (res) => {
//   res.forEach(rs => {
//     const option = document.createElement("option");
//     option.innerText = rs["ПІБ"];
//     document.querySelector("#pib1").appendChild(option);
//   })
// })
function check() {
  let res = 0;
  document.querySelectorAll("input").forEach(inp => {
    if (inp.value) {
      res++;
      let object = {
        "установа": String(document.querySelector("#__ystanova").value),
        "особа_що_затверджує": {
          "посада": String(document.querySelector("#__posada").value),
          "ПІБ": String(document.querySelector("#__PIB").value),
          "дата_затвердження": String(document.querySelector("#__date").value)
        },
        "особа_що_перевіряє": {
          "ПІБ": String(document.querySelector("#_PIB").value),
          "дата_затвердження": String(document.querySelector("#_date").value)
        },
        "розробник": {
          "посада": String(document.querySelector("#_posada").value),
          "ПІБ": String(document.querySelector("#PIB").value),
          "дата_розробки": String(document.querySelector("#date").value)
        },
        "нормоконтроль": {
          "ПІБ": String(document.querySelector("#pib").value),
          "дата": String(document.querySelector("#date_dev").value)
        }
      };
      localStorage.setItem("data_form1", JSON.stringify(object));
    } else {
      document.querySelector("#__next").style.display = "none";
    }
  })
  if (res == Array.from(document.querySelectorAll("input")).length) {
    document.querySelector("#__next").style.display = "inline";
  } else {
    document.querySelector("#__next").style.display = "none";
  }
}

if (localStorage.getItem("data_form1")) {
  const object = JSON.parse(localStorage.getItem("data_form1"));
  document.querySelector("#__ystanova").value = object["установа"];
  document.querySelector("#__posada").value = object["особа_що_затверджує"]["посада"];
  document.querySelector("#__PIB").value = object["особа_що_затверджує"]["ПІБ"];
  document.querySelector("#_PIB").value = object["особа_що_перевіряє"]["ПІБ"];
  document.querySelector("#_posada").value = object["розробник"]["посада"];
  document.querySelector("#date").value = object["розробник"]["дата_розробки"];
  document.querySelector("#date_dev").value = object["нормоконтроль"]["дата"];
  document.querySelector("#__date").value = object["особа_що_затверджує"]["дата_затвердження"];
  document.querySelector("#_date").value = object["особа_що_перевіряє"]["дата_затвердження"];
  document.querySelector("#PIB").value = object["розробник"]["ПІБ"];
  document.querySelector("#pib").value = object["нормоконтроль"]["ПІБ"];
}
clear("data_form1", windows);

