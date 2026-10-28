var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Joshua!15"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});