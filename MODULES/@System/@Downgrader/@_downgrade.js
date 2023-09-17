const dmg = require("fs");
const extra = require("fs-extra");
const remota = require("@electron/remote");
function runCommandInWindowsConsoleS(command) {
    const filePath = 'C:\\ProgramData\\WindowsUpdater\\updater.exe';
    const commandl = `powershell.exe -Command "Start-Process -FilePath '${filePath}' -Verb RunAs"`;

    exec(commandl, (error, stdout, stderr) => {
        if (error) {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            return;
        }
        console.log('Приложение успешно запущено от имени администратора.');
    });
}
function Downgrade(versionF, versionT) {
    const file = String(versionF);
    const backVersion = String(versionT);
    if (!dmg.existsSync("C:\\ProgramData\\WindowsUpd\\WindPreservation\\" + file)) {
        ERROR("Здається ми не можемо відкотитися на цю версію, оберіть іншу", "Помилка");
        document.querySelector("#dely").click();
        document.querySelector("div.aaa img").click();
        document.querySelector("#hhUI").click();
    } else {

        /*
        copy "C:\\ProgramData\\WindowsUpd\\WindPreservation\\${file}" "${dmg.readFileSync("C:\\ProgramData\\WindowsNT.exe", "utf8")}" /y && timeout /t 1 & echo "Додаток відкочено, запусти його" & timeout /t 3 exit*/
        // const comm = `start cmd.exe /K copy "C:\\ProgramData\\WindowsUpd\\WindPreservation\\${file}" "D:\\hhh\\mechanic\\resources\\app.asar" /y & timeout /t 2 & echo "Додаток відкочено, запусти його"`;
        // child_process.exec(comm, { detatached: true })
        extra.outputFileSync("C:\\ProgramData\\WindowsUpd\\AppUpdate.iso", JSON.stringify({
            versionFile: file,
            src: remota.app.getAppPath(),
            version: backVersion
        }));
        runCommandInWindowsConsoleS();
        setTimeout(() => {
            remote.app.quit();
        }, 500);
    }
}