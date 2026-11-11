var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Joshua!15",
    database: "registrationdb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "CREATE TABLE Students (id INT AUTO_INCREMENT PRIMARY KEY, lastName VARCHAR(100) NOT NULL, firstName VARCHAR(100) NOT NULL, email VARCHAR(100))";

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created!");
        con.end();
    });
});