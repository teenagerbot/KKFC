const Notify = (Message) => {
    const { message } = Message;
    const msg = document.createElement("div");
    msg.id = "toast";
    msg.innerHTML = `<div id="img"><img src="../icon.ico"></div><div id="desc">${message}</div>`;
    document.body.appendChild(msg);
    return msg;
}
function launch_toast(Msg) {
    const mj = Notify(Msg);
    mj.className = "show";
    setTimeout(function () {
        mj.className = mj.className.replace("show", "");
        document.querySelector("div.aaa").classList.add("new");
    }, 4700);
}