const path = require('path');
const fs = require('fs-extra');
const {dialog} = require("electron");

// const sourcePath = path.join('resources', 'tables_i');
// const destinationPath = path.join('app', 'tables_i');

// // Убедитесь, что папка приложения существует
// fs.ensureDirSync(destinationPath);

// // Переместить папку tables из resources в папку приложения
// fs.moveSync(sourcePath, destinationPath, { overwrite: true });

dialog.showMessageBox("YES", 'Папка tables успешно перемещена в папку приложения.');
