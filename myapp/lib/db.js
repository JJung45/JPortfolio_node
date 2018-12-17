// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('db.json');
// const db = low(adapter);
// db.defaults({posting:[]}).write();
// module.exports = db;

var mysql      = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1111',
    database : 'traveldiary',
  });
  
  db.connect();

  module.exports = db;