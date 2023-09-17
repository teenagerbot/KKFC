function Dialog(description, title, buttons, closeButton = true) {
  document.querySelectorAll(".dialog_win").forEach(d => d.remove())
  if (typeof buttons == 'object' && String(description) && String(title)) {
    const Dial = document.createElement('div');
    Dial.className = 'dialog_win';
    Dial.innerHTML = /*html*/ `${closeButton ? `<img src="../imgs/close.png" class="closer">` : ''
      }<h2>${String(title)}</h2>
        <p>${String(description)}</p>
        <div class="buttons">
            ${buttons
        .map((btn) => {
          return `<button id="${btn.button.id}" onclick="(${String(
            btn.button.click
          )})()">${String(btn.button.text)}</button>`;
        })
        .join('')}
        </div>`;
    document.body.appendChild(Dial);
    if (closeButton) {
      document.querySelector('.closer').onclick = () => {
        Dial.remove();
        document.querySelector('window_screen').style.cssText = '';
      };
    }
    document.querySelector('window_screen').style.cssText = `z-index: 200;
        display: block;`;
    return Dial;
  }
}
