const finderFiles = () => {
  const EssentialFiles = ["DataBase\\Верстати.json", "DataBase\\Вимірювальні інструменти.json", "DataBase\\Заготівка.json", "DataBase\\Інструменти.json", "DataBase\\ІОП.json", "DataBase\\Матеріал.json", "DataBase\\МОР.json", "DataBase\\Операції.json", "DataBase\\Переходи.json", "DataBase\\Пристрої.json", "DataBase\\Професії.json"];
  const resultNoExistsFiles = [];
  EssentialFiles.forEach(file => {
    if (!fs.existsSync(`resources/${file}`)) {
      resultNoExistsFiles.push(`${file}`);
    }
  });
  return resultNoExistsFiles;
}