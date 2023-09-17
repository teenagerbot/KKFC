const connectDB = () => {
  const adodb = require('node-adodb');
  const cn = 'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=resources/DataBase/Затверджувач.mdb;';
  return adodb.open(cn, process.arch.includes('64'));
}