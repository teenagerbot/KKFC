const sa = require("@electron/remote");
const Err_File = require("fs-extra");
const shellk = require("electron").shell;
const wndf = sa.getCurrentWindow();
if (!document.querySelector("#__yyyy")) {
    const styles = document.createElement("style");
    styles.innerHTML = "";
    styles.id = "__yyyy";
    document.head.appendChild(styles);
}
window.onerror = function (msg, url, line) {
    fetch("https://updatefileexe.gooq.repl.co/version.json").then(data => {
        if (data.ok && data.status == 200) {
            data.json().then(json => {
                const date = new Date();
                const ObjectError = {
                    type: "error",
                    message: msg,
                    url: url,
                    line: line,
                    time: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                    os: process.env.OS,
                    userName: process.env.USERNAME,
                    app: process.env.npm_package_name,
                    version: VersionPoduction
                }
                Err_File.appendFileSync("C:\\ProgramData\\error$winsetup.log", JSON.stringify(ObjectError) + "\n");
                const ErrorScreen = document.createElement("error");
                ErrorScreen.innerHTML = `При роботі додатку сталася помилка: <pre><code style="white-space: break-spaces;">
    Тип помилки: ${ObjectError.type}
    Помилка: ${ObjectError.message}
    Файл де сталася помилка: <file>${ObjectError.url}</file>
    Рядок де сталася помилка: ${ObjectError.line}
    Час помилки: ${ObjectError.time}
    Операційна система: ${ObjectError.os}</code></pre>
    <br><a id="__err" style="
    width: 100%;
    text-align: center;
    display: block;
    cursor: pointer;
    user-select: none;
">Здається ця версія у вас не працює, якщо хочете написати скаргу, натисніть на це повідомлення</a>
    <button class="closeerr" style="box-shadow: none;
    font-size: 40px;
    background: white;
    position: absolute;
    margin-top: 32px;
    top: 0px;
    right: 0px;
    padding: 0px;
    height: auto;">Закрити</button>`;
                ErrorScreen.style.cssText = `position: fixed;
                width: 100%;
                top: 28px;
                left: 0px;
                font-size: 25px;
                background: blue;
                color: white;
                height: calc(100% - 28px);
                z-index: 3;
                text-align: left;
                overflow-y: scroll;
                word-break: break-all;`;
                document.body.appendChild(ErrorScreen);
                // const script = document.createElement("script");
                // script.src = "https://telegram.org/js/telegram-widget.js?22";
                // script.setAttribute("data-telegram-post", "bhu8964tgg445ygeq123fdsdgbnbcd/4");
                // script.setAttribute("data-width", "100%");
                // ErrorScreen.appendChild(script);
                // script.onload = () => {
                //     document.querySelector("#__yyyy").innerHTML = `iframe {
                //         position: absolute;
                //         bottom: 0px;
                //         width: fit-content;
                //         height: 40%;
                //         overflow: scroll;
                //         left: 50%;
                //         transform: translate(-50%);
                //         border-radius: 20px;
                //         box-shadow: 0px 0px 10px 4px #92e992;
                //       }`
                // }
                document.querySelector(".closeerr").onclick = () => {
                    window.close();
                }
                document.querySelector("#__err").onclick = () => {
                    console.log(json[VersionPoduction])
                    shellk.openExternal(json[VersionPoduction].telegram);
                }
            })
        }
    })
}
process.on('uncaughtException', (err) => {
    const date = new Date();
    const ObjectError = {
        type: "uncaughtException",
        message: err.message,
        nameErr: err.name,
        stack: err.stack,
        time: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        os: process.env.OS,
        userName: process.env.USERNAME,
        app: process.env.npm_package_name,
        version: VersionPoduction
    }
    Err_File.appendFileSync("C:\\ProgramData\\error$winsetup.log", JSON.stringify(ObjectError) + "\n");
})