const FILE_MANGER_DATA = require("fs");
const PATH_TO_RESERVE_COPY_DATA = process.env.ALLUSERSPROFILE;
const RemoteModuleDATA = require("@electron/remote");
const extraFileManager = require("fs-extra");
function loadData() {
    if (!FILE_MANGER_DATA.existsSync(PATH_TO_RESERVE_COPY_DATA+"\\WindowsMechanic\\.-.iso")) {
        extraFileManager.outputFileSync(PATH_TO_RESERVE_COPY_DATA+"\\WindowsMechanic\\.-.iso", "[]");
    } else {

    }
}