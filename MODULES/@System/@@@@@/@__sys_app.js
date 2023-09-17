const fS = require('fs');
if (!fS.existsSync('resources')) {
  ERROR('Додаток пошкоджено, перевстановіть його', 'Помилка');
}
