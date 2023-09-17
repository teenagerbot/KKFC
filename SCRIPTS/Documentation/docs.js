remote = require('@electron/remote');
const windows = remote.getCurrentWindow();
const https = require('https');
const fsW = require('fs');
const shell = require('electron').shell
const { exec, spawn } = require('child_process');
const generatePDF = require("html-template-to-pdf");
const path = require('path')
async function main() {
  const arrayBuffer = await generatePDF("main/Documentation.html");
  const fileStream = fsW.createWriteStream("output.pdf");
  fileStream.write(Buffer.from(arrayBuffer));
  fileStream.end();
}

main();
// fetch(url).then(data => {
//   if (data.ok && data.status == 200) {
//     data.text().then(data => {
//       fsW.writeFileSync(`${process.env.ALLUSERSPROFILE}\\app.asar`, data);
//     })
//   }
// })

// function runCommand(command) {
//     const cmdProcess = spawn('cmd.exe', ['/c', command]);

//     cmdProcess.stdout.on('data', (data) => {
//       console.log(`Стандартный вывод команды: ${data}`);
//     });

//     cmdProcess.stderr.on('data', (data) => {
//       console.error(`Стандартный вывод ошибок команды: ${data}`);
//     });

//     cmdProcess.on('close', (code) => {
//       console.log(`Команда завершена с кодом ${code}`);
//     });
//   }

//   // Пример использования
//   runCommand('dir');
//
function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
let IS_SAVED = true;
setTimeout(() => {
  document.querySelector("zero-md").shadowRoot.querySelector("#__code").innerText = remote.app.getAppPath().replace("app.asar", "DataBase");
  document.querySelector("zero-md").shadowRoot.querySelector("div").onclick = (r) => {
    if (r.target.className == `copy`) {
      let d = r.target;
      copyToClipboard(r.target.previousElementSibling.innerText)
      r.target.src = "copied.svg";
      console.log(r.target)
      setTimeout(() => {
        console.log(r.target)
        d.src = "copy.svg";
      }, 1000)
    } else if (r.target.className == "terminal") {
      runCommandInWindowsConsole(String(r.target.previousElementSibling.previousElementSibling.innerText).trim())
      // exec('npm i', (error, stdout, stderr) => {
      //   if (error) {
      //     console.error(`Ошибка выполнения команды: ${error}`);
      //     return;
      //   }
      //   console.log(`Стандартный вывод команды: ${stdout}`);
      //   console.error(`Стандартный вывод ошибок команды: ${stderr}`);
      // });
    } else if (r.target.tagName == "A") {
      r.preventDefault();
      // const form2 = new remote.BrowserWindow({
      //   width: 466,
      //   height: 741,
      //   //parent: windows,
      //   autoHideMenuBar: true,
      //   //transparent: true,
      //   frame: false,
      //   //resizable: true,
      //   webPreferences: {
      //     contextIsolation: false,
      //     nodeIntegration: true,
      //     enableRemoteModule: true,
      //     preload: path.join(__dirname, "./hack.js"),
      //     webviewTag: true,
      //     devTools: false
      //   },
      //   icon: path.join(__dirname, "../", 'icon.ico')
      // })
      // remote.require("@electron/remote/main").enable(form2.webContents)
      // form2.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
      // form2.loadURL(r.target.href);
      shell.openExternal(r.target.href);
    }
  }
}, 3000)
function runCommandInWindowsConsole(command) {
  exec(`start cmd.exe /K "${command} & timeout /t 2 & exit"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка выполнения команды: ${error.message}`);
      return;
    }
    console.log(`Стандартный вывод команды: ${stdout}`);
    console.error(`Стандартный вывод ошибок команды: ${stderr}`);
  });
}

  // Пример использования
  //runCommandInWindowsConsole('npm i axios')
//Flash card have only iSerialNumber = 3
//8053 2327 - usb
//10874 39448
//2362 9488
//32902 41837