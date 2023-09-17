var file_system = require('fs');
var archiver = require('archiver');
var si = require('systeminformation');
const shell_manager = require('electron').shell;
// file_system.chmod('resources/', 0o755, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log('Полный доступ к файлу успешно разрешен.');
// });
const exportDataBases = (server) => {
  var archive = archiver('zip');
  let output = file_system.createWriteStream('resources/DB.zip');
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    );
    if (!file_system.existsSync('resources/export')) {
      file_system.mkdir('resources/export', (err) => {
        if (err) {
          ERROR('Щось пішло не так при при створенні папки', 'ERROR');
          console.log(err);
          return;
        }
        file_system.rename(
          'resources/DB.zip',
          'resources/export/DB.zip',
          (err) => {
            if (err) {
              ERROR('Щось пішло не так при переміщенні файлу', 'ERROR');
              console.log(err);
              return;
            } else {
              creator(server);
            }
          }
        );
      });
    } else {
      file_system.rename(
        'resources/DB.zip',
        'resources/export/DB.zip',
        (err) => {
          if (err) {
            ERROR('Щось пішло не так при переміщенні файлу', 'ERROR');
            console.log(err);
            return;
          } else {
            creator(server);
          }
        }
      );
    }
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory('resources/DataBase/', false);

  // // append files from a sub-directory and naming it `new-subdir` within the archive
  // archive.directory('resources/DataBase/', 'new-subdir');

  archive.finalize();
};
function sendFile(filePath, socket) {
  fswin.setAttributesSync('resources/export', { IS_HIDDEN: true });
  const filename = path.basename(filePath);
  file_system.readFile(filePath, (err, fileData) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
    } else {
      socket.emit('getFile', {
        filename: filename,
        fileData: fileData,
      });
    }
  });
}
const creator = (server) => {
  remote.dialog
    .showMessageBox(windows, {
      'type': 'question',
      'title': 'Оберіть дію',
      'message':
        "База була успішно експортована, вона знаходиться за наступним шляхом: 'resources/export/DB.zip', що ви хочете далі зробити?",
      'buttons': [
        "Надіслати на віддалений комп'ютер",
        "Вручну перекинути на комп'ютер",
      ],
    })
    .then((result) => {
      if (result.response === 0) {
        server.emit('requestFileTransfer');
        //sendFile("resources/export/DB.zip", server);
      } else {
        shell_manager.showItemInFolder(
          remote.app
            .getAppPath()
            .toString()
            .replace('\\app.asar', '\\export\\DB.zip')
        );
      }
    });
};
