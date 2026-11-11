
var express = require('express');
var mysql = require('mysql2');

var app = express();
app.use(express.json());

// Connect to MySQL
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Joshua!15",
    database: "registrationdb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

// GET all students
app.get('/api/students', function(req, res) {
    con.query("SELECT * FROM students", function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }
        res.json(result);
    });
});


// POST - Add a new student
app.post('/api/students', function(req, res) {
    var lastName = req.body.lastName;
    var firstName = req.body.firstName;
    var email = req.body.email;


    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
    return res.status(400).send("Student last name is required");
}

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
    return res.status(400).send("Student first name is required");
}

    var sql = "INSERT INTO students (lastName, firstName, email) VALUES (?, ?, ?)";
    var values = [lastName, firstName, email || null];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        res.status(201).json({
            message: "Student added!",
            id: result.insertId
        });
    });
});


 // GET a student by ID
app.get('/api/students/:id', function(req, res) {
    var id = req.params.id;

    var sql = "SELECT * FROM students WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.length === 0) {
            return res.status(404).send("Student not found");
        }

        res.json(result[0]);
    });
});


// PUT - Update a student by ID
app.put('/api/students/:id', function(req, res) {
    var id = req.params.id;
    var lastName = req.body.lastName;
    var firstName = req.body.firstName;
    var email = req.body.email;

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
        return res.status(400).send("Student last name is required");
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
        return res.status(400).send("Student first name is required");
    }

    var sql = "UPDATE students SET lastName = ?, firstName = ?, email = ? WHERE id = ?";
    var values = [lastName, firstName, email || null, id];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Student not found");
        }

        res.json({ message: "Student updated!" });
    });
});


 // DELETE - Delete a student by ID
app.delete('/api/students/:id', function(req, res) {
    var id = req.params.id;

    var sql = "DELETE FROM students WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Student not found");
        }

        res.json({ message: "Student deleted!" });
    });
});

// GET all faculty
app.get('/api/faculty', function(req, res) {
    con.query("SELECT * FROM faculty", function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }
        res.json(result);
    });
});


// POST - Add a new faculty member
app.post('/api/faculty', function(req, res) {
    var lastName = req.body.lastName;
    var firstName = req.body.firstName;
    var email = req.body.email;

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
        return res.status(400).send("Faculty last name is required");
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
        return res.status(400).send("Faculty first name is required");
    }

    var sql = "INSERT INTO faculty (lastName, firstName, email) VALUES (?, ?, ?)";
    var values = [lastName, firstName, email || null];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        res.status(201).json({
            message: "Faculty added!",
            id: result.insertId
        });
    });
});


// GET a faculty member by ID
app.get('/api/faculty/:id', function(req, res) {
    var id = req.params.id;

    var sql = "SELECT * FROM faculty WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.length === 0) {
            return res.status(404).send("Faculty not found");
        }

        res.json(result[0]);
    });
});


// PUT - Update a faculty member by ID
app.put('/api/faculty/:id', function(req, res) {
    var id = req.params.id;
    var lastName = req.body.lastName;
    var firstName = req.body.firstName;
    var email = req.body.email;

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
        return res.status(400).send("Faculty last name is required");
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
        return res.status(400).send("Faculty first name is required");
    }

    var sql = "UPDATE faculty SET lastName = ?, firstName = ?, email = ? WHERE id = ?";
    var values = [lastName, firstName, email || null, id];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Faculty not found");
        }

        res.json({ message: "Faculty updated!" });
    });
});


// DELETE - Delete a faculty member by ID
app.delete('/api/faculty/:id', function(req, res) {
    var id = req.params.id;

    var sql = "DELETE FROM faculty WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Faculty not found");
        }

        res.json({ message: "Faculty deleted!" });
    });
});

// GET all faculty
app.get('/api/faculty', function(req, res) {
    con.query("SELECT * FROM faculty", function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }
        res.json(result);
    });
});


// POST - Add a new faculty member
app.post('/api/faculty', function(req, res) {
    var lastName = req.body.lastName;
    var firstName = req.body.firstName;
    var email = req.body.email;

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
        return res.status(400).send("Faculty last name is required");
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
        return res.status(400).send("Faculty first name is required");
    }

    var sql = "INSERT INTO faculty (lastName, firstName, email) VALUES (?, ?, ?)";
    var values = [lastName, firstName, email || null];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        res.status(201).json({
            message: "Faculty added!",
            id: result.insertId
        });
    });
});


// GET a faculty member by ID
app.get('/api/faculty/:id', function(req, res) {
    var id = req.params.id;

    var sql = "SELECT * FROM faculty WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.length === 0) {
            return res.status(404).send("Faculty not found");
        }

        res.json(result[0]);
    });
});


// PUT - Update a faculty member by ID
app.put('/api/faculty/:id', function(req, res) {
    var id = req.params.id;
    var lastName = req.body.lastName;
    var firstName = req.body.firstName;
    var email = req.body.email;

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
        return res.status(400).send("Faculty last name is required");
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
        return res.status(400).send("Faculty first name is required");
    }

    var sql = "UPDATE faculty SET lastName = ?, firstName = ?, email = ? WHERE id = ?";
    var values = [lastName, firstName, email || null, id];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Faculty not found");
        }

        res.json({ message: "Faculty updated!" });
    });
});


// DELETE - Delete a faculty member by ID
app.delete('/api/faculty/:id', function(req, res) {
    var id = req.params.id;

    var sql = "DELETE FROM faculty WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);

            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).send("Cannot delete faculty assigned to a course");
            }

            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Faculty not found");
        }

        res.json({ message: "Faculty deleted!" });
    });
});


// GET all courses
app.get('/api/courses', function(req, res) {
    con.query("SELECT * FROM courses", function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }
        res.json(result);
    });
});


// GET all courses for a faculty member
app.get('/api/courses/faculty/:facultyId', function(req, res) {
    var facultyId = req.params.facultyId;

    var sql = "SELECT courses.*, faculty.firstName, faculty.lastName " +
              "FROM courses JOIN faculty ON courses.facultyId = faculty.id " +
              "WHERE courses.facultyId = ?";

    con.query(sql, [facultyId], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        res.json(result);
    });
});


// GET a course by ID
app.get('/api/courses/:id', function(req, res) {
    var id = req.params.id;

    var sql = "SELECT * FROM courses WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.length === 0) {
            return res.status(404).send("Course not found");
        }

        res.json(result[0]);
    });
});


// POST - Add a new course
app.post('/api/courses', function(req, res) {
    var courseNumber = req.body.courseNumber;
    var courseName = req.body.courseName;
    var facultyId = req.body.facultyId;
    var enrollmentLimit = req.body.enrollmentLimit;

    if (!courseNumber || typeof courseNumber !== 'string' || !courseNumber.trim()) {
        return res.status(400).send("Course number is required");
    }

    var sql = "INSERT INTO courses (courseNumber, courseName, facultyId, enrollmentLimit) VALUES (?, ?, ?, ?)";
    var values = [courseNumber, courseName || null, facultyId ?? null, enrollmentLimit ?? null];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);

            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).send("Faculty ID does not exist");
            }

            return res.status(500).send("Database error");
        }

        res.status(201).json({
            message: "Course added!",
            id: result.insertId
        });
    });
});


// PUT - Update a course by ID
app.put('/api/courses/:id', function(req, res) {
    var id = req.params.id;
    var courseNumber = req.body.courseNumber;
    var courseName = req.body.courseName;
    var facultyId = req.body.facultyId;
    var enrollmentLimit = req.body.enrollmentLimit;

    if (!courseNumber || typeof courseNumber !== 'string' || !courseNumber.trim()) {
        return res.status(400).send("Course number is required");
    }

    var sql = "UPDATE courses SET courseNumber = ?, courseName = ?, facultyId = ?, enrollmentLimit = ? WHERE id = ?";
    var values = [courseNumber, courseName || null, facultyId ?? null, enrollmentLimit ?? null, id];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);

            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).send("Faculty ID does not exist");
            }

            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Course not found");
        }

        res.json({ message: "Course updated!" });
    });
});


// DELETE - Delete a course by ID
app.delete('/api/courses/:id', function(req, res) {
    var id = req.params.id;

    var sql = "DELETE FROM courses WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Course not found");
        }

        res.json({ message: "Course deleted!" });
    });
});


// Start server
app.listen(3000, function() {
    console.log("Server running on port 3000");
});
