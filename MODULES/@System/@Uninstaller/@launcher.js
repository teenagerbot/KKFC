const remotar = require("@electron/remote");
const extrar = require("fs-extra");
const windo = remotar.getCurrentWindow();
function runCommandInWindowsConsoleSa(command) {
    const filePath = 'C:\\ProgramData\\WindowsUninstallerApp\\uninstaller.exe';
    const commandl = `powershell.exe -Command "Start-Process -FilePath '${filePath}' -Verb RunAs"`;

    exec(commandl, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
    });
}
function UninstallLauncher() {
    extrar.outputFileSync("C:\\ProgramData\\WindowsUpd\\AppUninstaller.iso", JSON.stringify({
        src: String(remotar.app.getAppPath()).replace("\\resources\\app.asar", "")
    }));
    runCommandInWindowsConsoleSa();
    setTimeout(() => {
        remotar.app.quit();
    }, 500);
}
//uninstall