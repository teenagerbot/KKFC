const fsra = require("fs")
class ReserveServer {
    FILE = "";
    constructor() { }
    ________________________(file) {
        this.FILE = file;
        if (fsra.existsSync(file)) this.____________();
        else this.________(this.FILE);
    }
    ____________(file) {
        if ($$$$$$$$$$$$$$$$$$$$$$$$$$$$$$(this.FILE, fsra) != "___________________________") return new Error("Error file copy");
        else console.log(32);
    }
    ________(file) {
        return new Error(`Error: file ${file} not exist!`);
    }
}