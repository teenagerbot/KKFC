function createOperation() {
    document.querySelector("h1 d").innerText = Number(document.querySelector("h1 d").innerText) + 1;
    document.querySelector("input").value = Number(document.querySelector("h1 d").innerText) * 5;
    let TRS = Array.from(document.querySelectorAll('tr'));
    TRS.shift();
    TRS.forEach((tr) => {
        tr.remove();
    });
    clearInputs();
    Checker();
}
function clearInputs() {
    document.querySelector('#opers').value = '';
    document.querySelector('#verst').value = '';
    document.querySelector('#mor').value = '';
    document.querySelector('#ceh').value = '';
    document.querySelector('#dil').value = '';
    document.querySelector('#work').value = '';
    document.querySelector('#tsht').value = '';
    document.querySelector('#tpz').value = '';
    document.querySelector('#td').value = '';
    document.querySelector('#to').value = '';
    document.querySelector('#opers').style.background = 'pink';
    document.querySelector('#verst').style.background = 'pink';
    document.querySelector('#mor').style.background = 'pink';
    document.querySelector('#ceh').style.background = 'pink';
    document.querySelector('#dil').style.background = 'pink';
    document.querySelector('#work').style.background = 'pink';
    document.querySelector('#tsht').style.background = 'pink';
    document.querySelector('#tpz').style.background = 'pink';
    document.querySelector('#td').style.background = 'pink';
    document.querySelector('#to').style.background = 'pink';
    document.querySelectorAll("input[type='checkbox']").forEach(input => input.checked = false);
}