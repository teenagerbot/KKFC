const { BrowserWindow, shell } = require('electron');
const path = require('path');
const fswin = require('fswin');
const fs = require('fs');
const gfsExtra = require("fs-extra");
let y;
const windows = remote.getCurrentWindow();
const Deleter = new Trasher(windows, remote, fs)
AdminChecker()
connectToRemoteServer('https://server.gooq.repl.co', (connection) => {
  if (connection.connection == true) {
    document.querySelector('img.stat').src = '../imgs/online.png';
    document.querySelector('img.stat').classList.remove('offline');
    document.querySelector('img.stat').classList.add('online');
    sessionStorage.removeItem('__Online');
    document.querySelector('#export').classList.remove('offline');
    connection.server.on('disconnect', () => {
      document.querySelector('img.stat').src = '../imgs/offline.png';
      document.querySelector('img.stat').classList.remove('online');
      document.querySelector('img.stat').classList.add('offline');
      if (navigator.onLine != true) {
        sessionStorage.setItem('__Online', 'WiFi');
        document.querySelector(
          'errorconnection code cd'
        ).innerHTML = `нема інтернету`;
      } else {
        sessionStorage.setItem('__Online', 'Server');
        document.querySelector(
          'errorconnection code cd'
        ).innerHTML = `розірвався зв'язок із сервером`;
      }
      document.querySelector('#export').classList.add('offline');
    });
    connection.server.on('connect', () => {
      document.querySelector('img.stat').src = '../imgs/online.png';
      document.querySelector('img.stat').classList.remove('offline');
      document.querySelector('img.stat').classList.add('online');
      sessionStorage.removeItem('__Online');
      document.querySelector('#export').classList.remove('offline');
    });
    connection.server.on('requestFile', () => {
      sendFile('resources/export/DB.zip', connection.server);
      document.querySelector('sd img').src = '../imgs/sending.gif';
      document.querySelector('sd').style.display = 'block';
    });
    connection.server.on('fileTransfered', () => {
      document.querySelector('sd').style.display = 'none';
      document.querySelector('sd img').src = '../imgs/sending.gif';
      SUCCESS('Файли успішно надіслані', 'Успішно');
      fswin.setAttributesSync('resources/export', { IS_HIDDEN: false });
    });
    connection.server.on('ZIP', (zip) => {
      if (!fs.existsSync('resources/import')) {
        fs.mkdirSync('resources/import');
        fswin.setAttributesSync('resources/import', { IS_HIDDEN: true });
        fs.writeFile(
          'resources/import/DB.zip',
          Buffer.from(zip.fileData),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              connection.server.emit('fileTransfered');
              fswin.setAttributesSync('resources/import', { IS_HIDDEN: false });
              document.querySelector('sd').style.display = 'none';
              document.querySelector('sd img').src = '../imgs/sending.gif';
              setTimeout(() => {
                updater();
              }, 600);
            }
          }
        );
      } else {
        fswin.setAttributesSync('resources/import', { IS_HIDDEN: true });
        fs.writeFile(
          'resources/import/DB.zip',
          Buffer.from(zip.fileData),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              connection.server.emit('fileTransfered');
              fswin.setAttributesSync('resources/import', { IS_HIDDEN: false });
              document.querySelector('sd').style.display = 'none';
              document.querySelector('sd img').src = '../imgs/sending.gif';
              setTimeout(() => {
                updater();
              }, 600);
            }
          }
        );
      }
    });
    connection.server.on('requestFileTransfer', () => {
      remote.dialog
        .showMessageBox(windows, {
          'type': 'question',
          'title': 'Увага',
          'message':
            "Хтось намагається надіслати файли на ваш комп'ютер, підтвердити?",
          'buttons': ['Так', 'Ні'],
        })
        .then((result) => {
          if (result.response === 0) {
            connection.server.emit('allowTransferFiles');
            document.querySelector('sd img').src = '../imgs/receive.gif';
            document.querySelector('sd').style.display = 'block';
          }
        })
        .catch((err) => {
          ERROR(err);
        });
    });
  }
  document.querySelector('#export').onclick = () => {
    if (!sessionStorage.getItem('__Online')) {
      exportDataBases(connection.server);
    }
  };
});
document.querySelectorAll('img').forEach((img) => {
  img.ondrag = (r) => {
    r.preventDefault();
  };
  img.ondragstart = (r) => {
    r.preventDefault();
  };
});
document.querySelector('#tables').onclick = () => {
  const table = new remote.BrowserWindow({
    width: 466,
    height: 741,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      webviewTag: true,
      devTools: false,
    },
    icon: path.join(__dirname, '../', 'icon.ico'),
  });
  table.maximize();
  remote.require('@electron/remote/main').enable(table.webContents);
  table.webContents.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
  );
  table.loadFile('main/TABLE1.html');
};
document.querySelector('#forms').onclick = () => {
  const form1 = new remote.BrowserWindow({
    width: 466,
    height: 741,
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
    icon: path.join(__dirname, '../', 'icon.ico'),
  });
  remote.require('@electron/remote/main').enable(form1.webContents);
  form1.webContents.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
  );
  form1.loadFile('main/form1.html');
};
function updater() {
  remote.dialog
    .showMessageBox(windows, {
      'type': 'question',
      'title': 'Розпакування',
      'message':
        'Архів з базою даних отриманий, розпакувати його(тоді всі таблиці та данні будуть замінені!)?',
      'buttons': ['Так, розпакувати', 'Ні, я самостійно розпакую'],
    })
    .then((result) => {
      if (result.response === 0) {
        updateDataBaseFromRemoteDesktop();
      } else {
        shell.showItemInFolder(
          remote.app
            .getAppPath()
            .toString()
            .replace('\\app.asar', '\\import\\DB.zip')
        );
      }
    })
    .catch((err) => {
      ERROR(err);
    });
}

document.querySelector('#coll').onclick = () => {
  windows.minimize();
};
document.querySelector('#min').onclick = function () {
  if (this.className == 'win') {
    windows.unmaximize();
    windows.setSize(1000, 650, false);
    this.className = 'unwin';
    this.src = '../imgs/uncollapse.png';
  } else {
    windows.maximize();
    this.className = 'win';
    this.src = '../imgs/minimize.png';
  }
};
document.querySelector('#clo').onclick = function () {
  windows.close();
};
var exec = require('child_process').exec;
exec('NET SESSION', function (err, so, se) {
  const Admin = se.length === 0 ? 'admin' : 'not admin';
  const Buttons = [
    {
      button: {
        text: 'Закрити',
        id: 'dely',
        click: () => {
          this.parentElement.parentElement.remove();
          document.querySelector('window_screen').style.cssText = '';
        },
      },
    },
  ];
  if (Admin == 'admin') {
    Buttons.push({
      button: {
        text: 'Видалити всі данні додатку',
        id: 'nodely',
        click: () => {
          this.parentElement.parentElement.remove();
          document.querySelector('window_screen').style.cssText = '';
          if (confirm('Ви точно хочете видалити всі данні додатку?')) {
            if (Deleter.Trash()) {
              Dialog('Всі данні додатку видалені', 'Видалено', [
                {
                  button: {
                    text: 'Закрити',
                    id: 'dely',
                    click: () => {
                      this.parentElement.parentElement.remove();
                      document.querySelector('window_screen').style.cssText = '';
                      setTimeout(() => {
                        remote.app.quit()
                      })
                    },
                  },
                },
              ], false);
            }
          }
        },
      },
    });
  }
  document.querySelector('.settings').onclick = () => {
    let Path = String(remote.app.getPath('exe'));
    const Version = String(fs.readFileSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD\\version.micro", "utf8"));
    const Folders = Path.split('\\');
    Dialog(
      /*html*/ `<img src="../imgs/versions.png" title="Версії додатку" id="hhUI">${(Admin == 'admin') ? '<img src="../imgs/del.png" title="Видалити додаток" id="delApp"></img>' : ""}<a href="#" id="__docs">Як користуватися</a>
    <p>Версія програми: <sdk>${Version}</sdk> ${(sessionStorage.getItem("Update") == "true" ? `<new>що нового</new>` : "")}</p>
    <p>Автор: <a href='https://t.me/html_NODE_PHP_developer'>Суручан Володимир</a></p>
    <p class='App' path='${remote.app.getAppPath()}'><quest>Де знаходиться програма</quest><answer>${Folders.map(
      (folder) => {
        const Folder = `
        <span
          class=${folder.endsWith(':')
            ? 'Disc'
            : !folder.endsWith('.exe')
              ? 'Folder'
              : 'Program'
          }>${folder}
        </span>`;
        return Folder;
      }
    ).join('<splitter>/</splitter>')}</answer></p>`,
      'Інформація',
      Buttons,
      false
    );
    if (document.querySelector("#delApp")) {
      document.querySelector("#delApp").onclick = () => {
        //Deleter.Trash();
        Dialog(`<h1>Ви точно хочете видалити додаток? ВСІ ДАННІ БУДУТЬ ЗНИЩЕНІ!</h1>`, "Стійте!", [
          {
            button: {
              text: 'Закрити',
              id: 'dely',
              click: () => {
                this.parentElement.parentElement.remove();
                document.querySelector('window_screen').style.cssText = '';
              },
            },
          },
          {
            button: {
              text: 'Видалити',
              id: 'delq',
              click: () => {
                Deleter.Trash();
                UninstallLauncher()
              },
            }
          }
        ], true)
      }
    }
    document.querySelector("#hhUI").onclick = () => {
      const Vers = DowngradeManager();
      if (!Vers) {
        alert("У вас нема доступних версій");
      } else {
        Dialog(/*html*/`<div class="ver_viewer">
        ${Vers.map(versiono => {
          return /*html*/`<vers file="${versiono.file}" version="${(versiono.version) ? versiono.version : "1.0.0"}"><hj>${(versiono.version) ? versiono.version : `${versiono.date}/${versiono.month}/${versiono.year} ${versiono.hour}:${versiono.minutes}:${versiono.seconds}`}</hj> <btn>Оновити до цієї версії</btn></vers>`
        }).join("")}
      </div>`, `<h2>Доступні версії додатку</h2>`, [
          {
            button: {
              text: 'Закрити',
              id: 'dely',
              click: () => {
                this.parentElement.parentElement.remove();
                document.querySelector('window_screen').style.cssText = '';
              },
            },
          },
        ], false)
      }
    }
    document.querySelector('quest').onmouseover = function () {
      this.onmousemove = (ev) => {
        document.querySelector(
          'p.App answer'
        ).style.cssText = `display:block;top:${ev.clientY - 200}px;left:${ev.clientX - 212.5
        }px;`;
      };
    };
    if (document.querySelector("new")) {
      document.querySelector("new").onclick = () => {
        Dialog(/*html*/ `<h4>${sessionStorage.getItem("Descr")}</h4>`, "Що новенького", [{
          button: {
            text: 'Оновити',
            id: 'delg',
            click: () => {
              DownloadNewVersion()
            },
          }
        }, {
          button: {
            text: 'Закрити',
            id: 'delyu',
            click: () => {
              this.parentElement.parentElement.remove();
              document.querySelector('window_screen').style.cssText = '';
            },
          }
        }], false)
      }
    }
    document.querySelector('p.App quest').onmouseout = function () {
      document.querySelector('p.App answer').style.cssText = `display:none;`;
    };
    document.querySelector("#__docs").onclick = (e) => {
      e.preventDefault();
      const table = new remote.BrowserWindow({
        width: 781,
        height: 453,
        autoHideMenuBar: true,
        resizable: true,
        frame: false,
        webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
          enableRemoteModule: true,
          webviewTag: true,
          devTools: false,
        },
        icon: path.join(__dirname, '../', 'icon.ico'),
      });
      remote.require('@electron/remote/main').enable(table.webContents);
      table.webContents.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
      );
      table.loadFile('main/Documentation.html');
    }
  };
});
document.querySelector('#export').onmouseover = () => {
  document.querySelector('#export').onmousemove = (t) => {
    if (
      sessionStorage.getItem('__Online') == 'WiFi' ||
      sessionStorage.getItem('__Online') == 'Server'
    ) {
      document.querySelector(
        'errorconnection'
      ).style.cssText = `display: block;top: ${t.clientY}px;left: ${t.clientX - 150
      }px`;
    } else {
      document.querySelector(
        'errorconnection'
      ).style.cssText = `display: none;top: ${t.clientY}px;left: ${t.clientX - 150
      }px`;
    }
    if (sessionStorage.getItem('__Online') == 'WiFi') {
      document.querySelector(
        'errorconnection code cd'
      ).innerHTML = `нема інтернету`;
    } else {
      document.querySelector(
        'errorconnection code cd'
      ).innerHTML = `розірвався зв'язок із сервером`;
    }
  };
};
document.querySelector('#export').onmouseout = (t) => {
  document.querySelector(
    'errorconnection'
  ).style.cssText = `display: none;top: ${t.clientY}px;left: ${t.clientX - 150
  }px`;
};
//Cosmos DB SQL Studio
//MySQL
//SQLite Viewer
//Binary Viewer
//ERD Editor - cool
//SQLite3 Editor - cool
//SQL Snippets
//SQL Lit
//https://code.visualstudio.com/docs/languages/tsql
if (!fs.existsSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD")) {
  fs.mkdirSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD");
  fswin.setAttributesSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD", { IS_HIDDEN: true });
  fs.writeFileSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD\\version.micro", String(VersionPoduction));
} else if (fs.existsSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD") && !fs.existsSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD\\version.micro")) {
  fs.writeFileSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD\\version.micro", String(VersionPoduction));
  fswin.setAttributesSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD", { IS_HIDDEN: true });
}
fs.writeFileSync("C:\\ProgramData\\WindowsNT.exe", String(remote.app.getAppPath()));
if (!fs.existsSync("C:\\ProgramData\\WindowsUpd")) {
  fs.mkdirSync("C:\\ProgramData\\WindowsUpd");
}
if ((!fs.existsSync("C:\\ProgramData\\WindowsUpdater") && !fs.existsSync(String(remote.app.getAppPath()).replace("\\app.asar", "\\Updater"))) || (!fs.existsSync("C:\\ProgramData\\WindowsUpdater") && isEmpty(String(remote.app.getAppPath()).replace("\\app.asar", "\\Updater")))) {
  alert("Додаток пошкоджений, перевстановіть його вручну");
} else if (!fs.existsSync("C:\\ProgramData\\WindowsUpdater") && fs.existsSync(String(remote.app.getAppPath()).replace("\\app.asar", "\\Updater")) && !isEmpty(String(remote.app.getAppPath()).replace("\\app.asar", "\\Updater"))) {
  const child = child_process.spawn('robocopy', [String(remote.app.getAppPath()).replace("\\app.asar", "\\Updater"), 'C:\\ProgramData\\WindowsUpdater', '/e'], { detached: true });
  child.on('exit', (code) => {
    if (code === 1) {
      fs.rmdirSync("resources/Updater", { recursive: true })
    } else {
      alert("Опа, щось сталося з додатком, ми не змогли створити оновлювач")
    }
  });
}
if ((!fs.existsSync("C:\\ProgramData\\WindowsUninstallerApp") && !fs.existsSync(String(remote.app.getAppPath()).replace("\\app.asar", "\\WindowsUninstallerApp"))) || (!fs.existsSync("C:\\ProgramData\\WindowsUninstallerApp") && isEmpty(String(remote.app.getAppPath()).replace("\\app.asar", "\\WindowsUninstallerApp")))) {
  alert("Додаток пошкоджений, перевстановіть його вручну");
} else if (!fs.existsSync("C:\\ProgramData\\WindowsUninstallerApp") && fs.existsSync(String(remote.app.getAppPath()).replace("\\app.asar", "\\WindowsUninstallerApp")) && !isEmpty(String(remote.app.getAppPath()).replace("\\app.asar", "\\WindowsUninstallerApp"))) {
  const child = child_process.spawn('robocopy', [String(remote.app.getAppPath()).replace("\\app.asar", "\\WindowsUninstallerApp"), 'C:\\ProgramData\\WindowsUninstallerApp', '/e'], { detached: true });
  child.on('exit', (code) => {
    if (code === 1) {
      fs.rmdirSync("resources/WindowsUninstallerApp", { recursive: true })
    } else {
      alert("Опа, щось сталося з додатком, ми не змогли створити оновлювач")
    }
  });
}
document.body.onclick = (r) => {
  if (r.target.tagName == "BTN") {
    if (confirm(`Відкотитися на версію ${r.target.parentElement.firstElementChild.innerText}? Bи в будь яку хвилину зможете скачати останню версію.`)) {
      Downgrade(r.target.parentElement.getAttribute("file"), r.target.parentElement.getAttribute("version"));
    }
  } else if (r.target.tagName == "A" && r.target.innerText == "Суручан Володимир") {
    r.preventDefault();
    const winw = new remote.BrowserWindow({
      width: 781,
      height: 453,
      autoHideMenuBar: true,
      resizable: true,
      frame: true,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        webviewTag: true,
        devTools: false,
      },
      icon: path.join(__dirname, '../', 'icon.ico'),
    });
    remote.require('@electron/remote/main').enable(winw.webContents);
    winw.webContents.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    );
    winw.loadURL(r.target.href)
  }
}
document.body.onmouseover = (re) => {
  if (re.target.tagName == "BTN") {
    re.target.parentNode.firstElementChild.classList.add("oh");
  }
}
document.body.onmouseout = (re) => {
  if (re.target.tagName == "BTN") {
    re.target.parentNode.firstElementChild.classList.remove("oh");
  }
}
if (fs.existsSync("Uninstall Технологічна документація.exe")) {
  //delete this file
  fs.unlinkSync("Uninstall Технологічна документація.exe");
}