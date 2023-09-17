const PATH_TO_RESERVE_COPY = process.env.ALLUSERSPROFILE;
const PATH_TO_EXEC_PROGRAM = process.env.execPath;
const PATH_TO_MEM_INFO = process.getBlinkMemoryInfo();
const PID = process.pid;
const PPID = process.ppid;
const PATH_TO_RESOURCES = process.resourcesPath;
const FS_MANAGER = require('fs');
const WINDOWS_FS = require('fswin');
const WINDOWS = remote.getCurrentWindow();
const shell_managera = require('electron').shell;
const DBS = bb;
let g = 0;
/**
 * *Якщо існує резервна копія але нема папки з базами - створити папку та скопіювати всі файли в папку з резервної копії
 * *Якщо існує резервна копія але нема файлів з базами - скопіювати всі файли в папку з резервної копії
 * *Якщо нема резервної копії але є папка з базами - створити папку WindowsMechanic та скопіювати всі файли з resources/DataBase в папку(якщо якогось файлу нема, то замінити на порожній(як в темплейт))
 * *Якщо нема резервної копії і нема папки з базами - видати повідомлення про порушення роботи додатку, та вибрати: або перевстановити додаток, або користувач сам оновить базу з файлами
 */
const comp = new Comparator();
const __CopyPasterManagerReserve = (Files) => {
  Files.forEach((file) => {
    if (
      FS_MANAGER.existsSync(PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + file)
    ) {
      if (!FS_MANAGER.existsSync('resources/DataBase/')) {
        FS_MANAGER.mkdirSync('resources/DataBase/', { recursive: true });
      } else {
        FS_MANAGER.copyFileSync(
          PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + file,
          'resources/DataBase/' + file
        );
      }
    }
  });
};
const __CopyPasterManagerOriginal = (File) => {
  if (
    FS_MANAGER.existsSync('resources/DataBase/' + File)
  ) {
    FS_MANAGER.copyFileSync(
      'resources/DataBase/' + File, PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + File
    );
  }
};
const ضصثقفغ = () => {
  if (FS_MANAGER.existsSync(PATH_TO_RESERVE_COPY + '\\WindowsMechanic')) {
    let DBS_IN_RESERVE = [];
    DBS.forEach((db) => {
      if (
        FS_MANAGER.existsSync(PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + db)
      ) {
        DBS_IN_RESERVE.push(db);
      }
    });
    console.log(DBS_IN_RESERVE)
    if (DBS_IN_RESERVE.length === DBS.length) {
      if (!FS_MANAGER.existsSync('resources/DataBase/')) {
        FS_MANAGER.mkdirSync('resources/DataBase/', { recursive: true });
        __CopyPasterManagerReserve(DBS_IN_RESERVE);
      } else {
        __CopyPasterManagerReserve(DBS_IN_RESERVE);
      }
    } else {
      if (!FS_MANAGER.existsSync('resources/DataBase/')) {
        FS_MANAGER.mkdirSync('resources/DataBase/', { recursive: true });
        __CopyPasterManagerReserve(DBS_IN_RESERVE);
        const NOT_EXISTS_DBS = comp.Compare(DBS_IN_RESERVE, DBS);
        if (NOT_EXISTS_DBS.length > 0) {
          NOT_EXISTS_DBS.forEach(file => {
            for (let fl of TEMPLATE_FILES) {
              if (fl.file == file) {
                FS_MANAGER.writeFileSync(PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + file, String(fl.code));
                break;
              }
            }
          })
        }
        // ضصثقفغ();
      } else {
        const NOT_EXISTS_DBS = comp.Compare(DBS_IN_RESERVE, DBS);
        if (NOT_EXISTS_DBS.length > 0) {
          NOT_EXISTS_DBS.forEach(file => {
            if (FS_MANAGER.existsSync(`resources/DataBase/${file}`)) {
              __CopyPasterManagerOriginal(file);
            } else {
              for (let fl of TEMPLATE_FILES) {
                if (fl.file == file) {
                  FS_MANAGER.writeFileSync(PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + file, String(fl.code));
                  break;
                }
              }
            }
          })
        }
      }
    }
    // DBS.forEach((db) => {
    //   if (
    //     !FS_MANAGER.existsSync(
    //       PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + db
    //     )
    //   ) {
    //     if (!FS_MANAGER.existsSync('resources/DataBase/')) {
    //       g = 'ERR_STD_EXE';
    //     } else {
    //       FS_MANAGER.writeFile(
    //         PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + db,
    //         String(FS_MANAGER.readFileSync('resources/DataBase/' + db)),
    //         (err) => {
    //           console.log(err);
    //         }
    //       );
    //     }
    //   }
    // });
    // if (g == 'ERR_STD_EXE') {
    //   ERROR(
    //     'На жаль ми не знайшли вашу базу даних, перевстановіть додаток(просто запустіть інсталер)!',
    //     'Помилка'
    //   );
    //   //exe("resources/installer/Технологічна документація Setup 1.0.0.exe");
    //   if (
    //     FS_MANAGER.existsSync(
    //       remote.app
    //         .getAppPath()
    //         .toString()
    //         .replace(
    //           '\\app.asar',
    //           '\\installer\\Технологічна документація Setup 1.0.0.exe'
    //         )
    //     )
    //   ) {
    //     shell_managera.showItemInFolder(
    //       remote.app
    //         .getAppPath()
    //         .toString()
    //         .replace(
    //           '\\app.asar',
    //           '\\installer\\Технологічна документація Setup 1.0.0.exe'
    //         )
    //     );
    //   } else {
    //     ERROR(
    //       'Ви мабуть видалили інсталер додатку, скачайте його та запустіть',
    //       'Помилка'
    //     );
    //   }
    //   WINDOWS.close();
    // }
  } else {
    if (!FS_MANAGER.existsSync('resources/DataBase/')) {
      remote.dialog
        .showMessageBox(WINDOWS, {
          type: 'question',
          title: 'Помилка',
          message: 'Бази даних втрачені, ми не змогли ніде їх знайти(резервні копії також втрачені), що ми робимо?',
          buttons: ['Перевстановити додаток', 'Я підгружу файли самостійно'],
        })
        .then((result) => {
          if (result.response === 1) {
            Dialog("Тоді ви маєте натиснути на кнопку 'Експортувати файли' на тому комп'ютері з якого ви хочете підгрузити файли, або вручну їх заархівувати, перекинути та розпакувати у папку resources/DataBase", "Інструкція", [
              {
                button: {
                  text: 'Зрозуміло',
                  id: 'nodely',
                  click: () => {
                    this.parentElement.parentElement.remove();
                    document.querySelector('window_screen').style.cssText = '';
                  },
                },
              },
            ], false)
          } else if (result.response === 1) {
            remote.app.quit();
          }
        });
    } else {
      FS_MANAGER.mkdirSync(PATH_TO_RESERVE_COPY + '\\WindowsMechanic');
      WINDOWS_FS.setAttributesSync(PATH_TO_RESERVE_COPY + '\\WindowsMechanic', {
        IS_HIDDEN: true,
      });
      DBS.forEach((db) => {
        if (
          !FS_MANAGER.existsSync(
            PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + db
          )
        ) {
          FS_MANAGER.writeFile(
            PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + db,
            String(FS_MANAGER.readFileSync('resources/DataBase/' + db)),
            (err) => {
              console.log(err);
            }
          );
        }
      });
    }
  }
};
ضصثقفغ();
