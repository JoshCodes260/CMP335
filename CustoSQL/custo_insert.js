var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Joshua!15",
    database: "customerdb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)";
    var values = ["John Smith", "john@gmail.com", "4025551234"];

    con.query(sql, values, function(err, result) {
        if (err) throw err;
        console.log("Customer inserted!");
        con.end();
    });
});