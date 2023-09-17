const unzipper = require('unzipper');
const fsr = require("fs");
const updateDataBaseFromRemoteDesktop = () => {
  const archivePath = 'resources/import/DB.zip';
  const destinationPath = 'resources/DataBase/';
  const readStream = file_system.createReadStream(archivePath);
  readStream.pipe(unzipper.Extract({ path: destinationPath }))
    .on('finish', () => {
      SUCCESS("Данні були успішно оновлені", "Супер")
      fsr.rmdirSync("resources/import/", { recursive: true, force: true })
    })
    .on('error', (err) => {
      ERROR("Щось сталося при розпакуванні", "Помилка")
    });
}