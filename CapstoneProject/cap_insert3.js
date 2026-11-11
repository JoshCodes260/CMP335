
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

    var sql = "INSERT INTO courses (courseNumber, courseName, facultyId, enrollmentLimit) VALUES (?, ?, ?, ?)";
    var values = ["CMP335", "Web Application Development", 1, 25];

    con.query(sql, values, function(err, result) {
        if (err) throw err;
        console.log("Course inserted!");
        con.end();
    });
});
