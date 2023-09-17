const remote = require("@electron/remote");
function ERROR(message, title) {
  remote.dialog.showErrorBox(title, message);
}