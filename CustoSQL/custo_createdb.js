var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Joshua!15"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE customerdb", function(err, result) {
        if (err) throw err;
        console.log("Database created!");
        con.end();
    });
});