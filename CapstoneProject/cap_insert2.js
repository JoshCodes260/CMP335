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

    var sql = "INSERT INTO faculty (lastName, firstName, email) VALUES (?, ?, ?)";
    var values = ["Meysenburg", "Mark", "mark@gmail.com"];

    con.query(sql, values, function(err, result) {
        if (err) throw err;
        console.log("Faculty member inserted!");
        con.end();
    });
});