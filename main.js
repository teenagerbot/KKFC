// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const window = require('electron').BrowserWindow;
require('@electron/remote/main').initialize();
const path = require('path');
const DownloadManager = require("electron-download-manager");
DownloadManager.register({ downloadFolder: `${process.env.ALLUSERSPROFILE}\\WindowsUpd` });
let mainWindow;
let loadWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 781,
    height: 453,
    autoHideMenuBar: true,
    resizable: false,
    frame: false,
    skipTaskbar: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      devTools: false,
    },
    icon: path.join(__dirname, 'icon.ico'),
  });
  //mainWindow.setContentProtection(true)
  require('@electron/remote/main').enable(mainWindow.webContents);
  // and load the index.html of the app.
  //mainWindow.loadURL('https://rscript.teleweb.repl.co/www/');
  mainWindow.loadFile('main/home.html');

  //Open the DevTools.
  //mainWindow.webContents.openDevTools();
}
function loadApp() {
  loadWindow = new BrowserWindow({
    width: 269,
    height: 269,
    resizable: false,
    frame: false,
    transparent: true,
    skipTaskbar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      devTools: false,
    },
    icon: path.join(__dirname, 'icon.ico'),
  });
  loadWindow.setAlwaysOnTop(true, 'pop-up-menu');
  //mainWindow.setContentProtection(true)
  require('@electron/remote/main').enable(loadWindow.webContents);
  loadWindow.loadFile('loadApp.html');
}
app.whenReady().then(() => {
  loadApp();
  setTimeout(() => {
    loadWindow.close();
    createWindow();
  }, 2000);
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.setAsDefaultProtocolClient('khnu_mechanic');

//FIXME -
/*
قدر معلميك واحترمهم ، الله واحد ، الأم واحدة ، أنت واحدة ، العالم واحد ، الحياة واحدة ، الفرصة واحدة ، تعلم وتعلم أشياء جديدة لنفسك. السلام عليك.
*/