class Loader {
  loader;
  constructor() {}
  Loader() {
    const wins = document.createElement("div");
    wins.innerHTML = /*html*/ `<img src="../loaders/loading.svg">`;
    wins.className = "loader";
    document.body.appendChild(wins);
    this.loader = wins;
  }
  Destroy() {
    this.loader.remove();
  }
}
