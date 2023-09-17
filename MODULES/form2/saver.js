const save = (PATH) => {
  const ths = Array.from(document.querySelectorAll("th"));
  const trs = Array.from(document.querySelectorAll("tr"));
  trs.shift();
  const obres = [];
  trs.forEach(tr => {
    const ob = {};
    const tds = Array.from(tr.querySelectorAll("td"));
    //tds.pop();
    // tds.forEach(tds => {
      for (let c = 0; c < ths.length; c++) {
        ob[ths[c].innerText] = tds[c].querySelector("input").value;
      }
    // });
    obres.push(ob);
  });
  return obres;
}