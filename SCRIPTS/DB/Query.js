const executeQuery = (db, query, result) => {
  db.query(String(query)).then((data) => {
    result(data);
  }).catch(err => {
    result(err)
  });
}