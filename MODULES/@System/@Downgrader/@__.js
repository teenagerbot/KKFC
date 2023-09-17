const fgt = require("fs");
const DowngradeManager = () => {
    if (fgt.existsSync("C:\\ProgramData\\WindowsUpd\\WindPreservation")) {
        let files = fgt.readdirSync("C:\\ProgramData\\WindowsUpd\\WindPreservation");
        const Versions = [];
        if (files.length > 0) {
            files.forEach(file => {
                const Version = file.replace(/app\_(.+)\.rollback/g, "$1");
                if (Version.split(".").length == 3) {
                    Versions.push({
                        version: Version,
                        file: file
                    });
                    // deepcode ignore DuplicateIfBody: <please specify a reason of ignoring this>
                } else {
                    const ds = new Date(Number(Version));
                    Versions.push({
                        file: file,
                        date: ds.getDate(),
                        month: ds.getMonth(),
                        year: ds.getFullYear(),
                        seconds: ds.getSeconds(),
                        hour: ds.getHours(),
                        minutes: ds.getMinutes()
                    });
                }
            })
            return Versions;
        }
    }
}