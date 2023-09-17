document.querySelector("#coll").onclick = () => {
  windows.minimize()
}
document.querySelector("#min").onclick = function () {
  if (this.className == "win") {
    windows.unmaximize()
    windows.setSize(1000, 650, false)
    this.className = "unwin";
    this.src = "../imgs/uncollapse.png";
  } else {
    windows.maximize()
    this.className = "win";
    this.src = "../imgs/minimize.png";
  }
}
document.querySelector("#clo").onclick = function () {
  if (!IS_SAVED) {
    const Alert = document.createElement("div");
    Alert.id = "aler";
    Alert.className = "alert";
    Alert.innerHTML = /*html*/`<img src="../imgs/close.png" id="cll"><h1>Форма не збережена, що робимо?</h1><button id="saveu">Зберегти</button><button id="closeu">Закрити</button>`;
    document.body.appendChild(Alert)
    document.querySelector("window_screen").style.cssText = `
    z-index: 200;
    display: block;
    `;
    this.style.opacity = "0.4";
    this.style.pointerEvents = "none";
    document.querySelector("#saveu").onclick = () => {
      IS_SAVED = true;
      document.querySelector("window_screen").style.cssText = ``;
      document.querySelector("#aler").remove();
      document.querySelector("#__next").click();
      windows.close();
    }
    document.querySelector("#closeu").onclick = () => {
      windows.close()
    }
    document.querySelector("#cll").onclick = () => {
      document.querySelector("#aler").remove();
      document.querySelector("window_screen").style.cssText = ``;
      document.querySelector("#clo").style.opacity = "1";
      document.querySelector("#clo").style.pointerEvents = "auto";
    }
  } else {
    windows.close()
  }
}