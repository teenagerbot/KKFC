const EXEC = require("child_process").execFile;
const FS_ = require("fs");
const exe = (filePath) => {
    if (String(filePath)) {
        if (FS_.existsSync(filePath)) {
            EXEC(filePath, (error, stdout, stderr) => {
                console.log(error);
                console.log(stdout);
                console.log(stderr)
            });
        }
    }
}