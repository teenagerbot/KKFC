const fgr = require("fs");
function isEmpty(path) {
    return fgr.readdirSync(path).length === 0;
}