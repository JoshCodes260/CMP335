
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

    var sql = "CREATE TABLE courses (id INT AUTO_INCREMENT PRIMARY KEY, courseNumber VARCHAR(20) NOT NULL, courseName VARCHAR(100), facultyId INT, enrollmentLimit INT, FOREIGN KEY (facultyId) REFERENCES faculty(id))";

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created!");
        con.end();
    });
});
