const ExtraFS = require("fs-extra");
const FILE_MANGER = require("fs");
self.addEventListener('message', async (event) => {
    const FileModule = require("fs");
    const ExtraFS = require("fs-extra");
    const PATH_TO_RESERVE_COPY = process.env.ALLUSERSPROFILE;
    if (event.data.key === "kafedra.read.operations") {
        if (FileModule.existsSync(PATH_TO_RESERVE_COPY+"\\WindowsMechanic\\.-.iso")) {
            self.postMessage({ success: true, operations: JSON.parse(FileModule.readFileSync(PATH_TO_RESERVE_COPY+"\\WindowsMechanic\\.-.iso", "utf-8")) });
        } else {
            ExtraFS.outputFileSync(PATH_TO_RESERVE_COPY+"\\WindowsMechanic\\.-.iso", "[]");
            self.postMessage({success: false});
        }
    } else if (event.data.key === "kafedra.write.operations") {
        FileModule.writeFileSync(PATH_TO_RESERVE_COPY+"\\WindowsMechanic\\.-.iso", JSON.stringify(event.data.content, null, 2))
        self.postMessage({success: true});
    }
})