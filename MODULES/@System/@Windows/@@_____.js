var execS = require('child_process').exec;

const AdminChecker = () => {
    execS('NET SESSION', function (err, so, se) {
        const Admin = se.length === 0 ? 'admin' : 'not admin';
        if (remote.app.getAppPath().match(/^(.+\:)/)[0] == "C:" && Admin == 'not admin') {
            Dialog("Додаток встановлено на системний диск, якщо ви хочете щоб весь функціонал працював, запустіть від імені адміністратора(натисніть правою кнопкою миші на іконку додатку та оберіть пункт 'Запуск від імені адміністратора')", "Увага", [
                {
                    button: {
                        text: 'Зрозуміло',
                        id: 'dely',
                        click: () => {
                            this.parentElement.parentElement.remove();
                            document.querySelector('window_screen').style.cssText = '';
                            setTimeout(() => {
                                remote.app.quit()
                            }, 500)
                        },
                    },
                },
            ], false)
        }
    })
}