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

    var sql = "INSERT INTO students (lastName, firstName, email) VALUES (?, ?, ?)";
    var values = ["Smith", "John", "john@gmail.com"];

    con.query(sql, values, function(err, result) {
        if (err) throw err;
        console.log("Student inserted!");
        con.end();
    });
});