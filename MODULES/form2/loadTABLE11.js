const load = () => {
  const object = JSON.parse(fs.readFileSync(`resources/DataBase/Заготівка.json`, "utf-8"))["Заготівка"]["values"];
  const arr = [];
  object.forEach(element => {
    arr.push(element["Тип заготівки"]);
  });
  return arr;
}