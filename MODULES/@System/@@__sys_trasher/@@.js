class Trasher {
    Remote;
    Window;
    File_System;
    PATH_TO_RESERVE_COPY = process.env.ALLUSERSPROFILE;
    constructor(__Window, __Remote, __File_System) {
        this.Remote = __Remote;
        this.Window = __Window;
        this.File_System = __File_System;
    }
    Trash() {
        let Res = false;
        if (!this.Remote || !this.Window || !this.File_System) {
            ERROR("Помилка при видаленні даних", "ERROR");
        } else {
            if (this.File_System.existsSync("resources/import/")) this.File_System.rmdirSync("resources/import/", { recursive: true, force: true });
            if (this.File_System.existsSync(`${PATH_TO_RESERVE_COPY}\\WindowsMechanic`)) this.File_System.rmdirSync(`${PATH_TO_RESERVE_COPY}\\WindowsMechanic`, { recursive: true, force: true });
            if (this.File_System.existsSync("resources/DataBase/")) this.File_System.rmdirSync("resources/DataBase/", { recursive: true, force: true });
            if (this.File_System.existsSync("C:\\ProgramData\\WindowsUpdater")) this.File_System.rmdirSync("C:\\ProgramData\\WindowsUpdater", { recursive: true, force: true });
            if (this.File_System.existsSync("C:\\ProgramData\\WindowsUpd")) this.File_System.rmdirSync("C:\\ProgramData\\WindowsUpd", { recursive: true, force: true });
            if (this.File_System.existsSync("C:\\ProgramData\\WindowsUpdater")) this.File_System.rmdirSync("C:\\ProgramData\\WindowsUpdater", { recursive: true, force: true });
            if (this.File_System.existsSync("C:\\ProgramData\\Microsoft UPD")) this.File_System.rmdirSync("C:\\ProgramData\\Microsoft UPD", { recursive: true, force: true });
            if (this.File_System.existsSync("C:\\ProgramData\\WindowsNT.exe")) this.File_System.unlinkSync("C:\\ProgramData\\WindowsNT.exe", { recursive: true, force: true });
            Res = true;
        }
        return Res;
    }
}