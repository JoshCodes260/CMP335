
var express = require('express');
var mysql = require('mysql2');

var app = express();
app.use(express.json());

// Connect to MySQL
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Joshua!15",
    database: "customerdb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

// GET all customers
app.get('/api/customers', function(req, res) {
    con.query("SELECT * FROM customers", function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }
        res.json(result);
    });
});


// POST - Add a new customer
app.post('/api/customers', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;

    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).send("Customer name is required");
    }

    var sql = "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)";
    var values = [name, email || null, phone || null];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        res.status(201).json({
            message: "Customer added!",
            id: result.insertId
        });
    });
});


 // GET a customer by ID
app.get('/api/customers/:id', function(req, res) {
    var id = req.params.id;

    var sql = "SELECT * FROM customers WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.length === 0) {
            return res.status(404).send("Customer not found");
        }

        res.json(result[0]);
    });
});


// PUT - Update a customer by ID
app.put('/api/customers/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;

    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).send("Customer name is required");
    }

    var sql = "UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?";
    var values = [name, email || null, phone || null, id];

    con.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Customer not found");
        }

        res.json({ message: "Customer updated!" });
    });
});


 // DELETE - Delete a customer by ID
app.delete('/api/customers/:id', function(req, res) {
    var id = req.params.id;

    var sql = "DELETE FROM customers WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Customer not found");
        }

        res.json({ message: "Customer deleted!" });
    });
});


// Start server
app.listen(3000, function() {
    console.log("Server running on port 3000");
});
