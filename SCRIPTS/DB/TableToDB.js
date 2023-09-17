const toDB = (__db) => {
  const TableName = document.querySelector("h2").innerText;
  const Keys = document.querySelectorAll("table th");
  document.querySelectorAll("table tr").forEach(tr => {
    tr.querySelectorAll("td").forEach(td => {
      console.log(Keys[td.cellIndex], ": ", td.innerHTML)
      executeQuery(__db, `UPDATE [${TableName}] SET [${Keys[td.cellIndex].innerText}] = "${td.innerHTML.replace(/"/g, '\\"')}"
WHERE [${Keys[td.cellIndex].innerText}] = "${td.getAttribute("sql").replace(/"/g, '\\"')}";`, res => {
        console.log(res)
        document.title = document.title.replace(/\s\- не збережено$/, "");
        saveState = false;
      })
  })
})
}