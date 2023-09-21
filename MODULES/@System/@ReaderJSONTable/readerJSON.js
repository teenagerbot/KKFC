function readerJSON(object) {
    console.log(object);
    let cont = object;
    document.querySelector('#mor').value = cont['МОР'];
    document.querySelector('#device').value = cont['Пристрій'];
    document.querySelector('#verst').value = cont['верстат'];
    document.querySelector('input').value = cont['номер операції'];
    document.querySelector('#opers').value = cont['назва операції'];
    document.querySelectorAll('input[device]:checked').forEach((dev) => {
        dev.click();
    });
    cont['Пристрої'].forEach((device) => {
        document.querySelector(`[device="${device}"]`).click();
    });
    document.querySelector('#ceh').value = cont['Цех'];
    document.querySelector('#dil').value = cont['Дільниця'];
    document.querySelector('#work').value = cont['Робоче місце'];
    document.querySelector('#tpz').value = cont['Підготовчо-заключний час'];
    document.querySelector('#tsht').value = cont['Штучний час'];
    document.querySelector('#td').value = cont['Допоміжний час'];
    document.querySelector('#to').value = cont['Основний час'];
    document.querySelector('#verst').value = cont['верстат'];
    let perehods = Object.keys(cont['Переходи']);
    let TRS = Array.from(document.querySelectorAll('tr'));
    TRS.shift();
    TRS.forEach((tr) => {
        tr.remove();
    });
    OPERA = 0;
    perehods.forEach((perehid) => {
        const TR = document.createElement('tr');
        const TR1 = document.createElement('tr');
        const TR2 = document.createElement('tr');
        const TR3 = document.createElement('tr');
        TR.innerHTML = /*html*/ `<td>${++OPERA}</td>
                    <td contenteditable="true" namer="Назва дії" window="wind">${cont.Переходи[perehid]["Перехід"]}</td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td class="delete"><img src="../imgs/delete.png" class="rem_transition"></td>`;
        TR1.innerHTML = /*html*/ `<td>${++OPERA}</td>
                    <td contenteditable="true" namer="Інструмент" class="instrument">${cont.Переходи[perehid]['Інструмент']
        }</td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>`;
        TR2.innerHTML = /*html*/ `<td>${++OPERA}</td>
                    <td contenteditable="true" namer="Вимірювальний інструмент" class="vim">${cont.Переходи[perehid]['Вимірювальний інструмент']
        }</td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" class="hidene"></td>`;
        TR3.innerHTML = `<td>${++OPERA}</td>
                    <td contenteditable="true" class="hidene"></td>
                    <td contenteditable="true" tar="ПИ">${cont.Переходи[perehid].data['ПІ']
        }</td>
                    <td contenteditable="true" tar="D,B">${cont.Переходи[perehid].data['D або B']
        }</td>
                    <td contenteditable="true" tar="L">${cont.Переходи[perehid].data.L
        }</td>
                    <td contenteditable="true" tar="t">${cont.Переходи[perehid].data.t
        }</td>
                    <td contenteditable="true" tar="i">${cont.Переходи[perehid].data.i
        }</td>
                    <td contenteditable="true" tar="S">${cont.Переходи[perehid].data.S
        }</td>
                    <td contenteditable="true" tar="n">${cont.Переходи[perehid].data.n
        }</td>
                    <td contenteditable="true" tar="V">${cont.Переходи[perehid].data.V
        }</td>
                    <td contenteditable="true" tar="H">${cont.Переходи[perehid].data.H
        }</td>
                    <td contenteditable="true" tar="Y">${cont.Переходи[perehid].data.Y
        }</td>
                    <td contenteditable="true" tar="X">${cont.Переходи[perehid].data.X
        }</td>
                    <td contenteditable="true" tar="E">${cont.Переходи[perehid].data.E
        }</td>
                    <td contenteditable="true" tar="F">${cont.Переходи[perehid].data.F
        }</td>
                    <td contenteditable="true" tar="h">${cont.Переходи[perehid].data.h
        }</td>
                    <td contenteditable="true" tar="R">${cont.Переходи[perehid].data.R
        }</td>
                    <td contenteditable="true" tar="d">${cont.Переходи[perehid].data.d
        }</td>
                    <td contenteditable="true" tar="Z">${cont.Переходи[perehid].data.Z
        }</td>`;
        document.querySelector('table').appendChild(TR);
        document.querySelector('table').appendChild(TR1);
        document.querySelector('table').appendChild(TR2);
        document.querySelector('table').appendChild(TR3);
    });
    highlight();
}