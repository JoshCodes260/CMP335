
var apiUrl = "http://localhost:3000/api/students";


// GET - Get all students
async function getStudents() {
    try {
        var response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Could not load students");

        var students = await response.json();
        displayStudents(students);
    } catch (err) {
        showMessage(err.message);
    }
}


// Display students in the table
function displayStudents(students) {
    var table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(function(student) {
        var row = table.insertRow();

        row.insertCell().textContent = student.id;
        row.insertCell().textContent = student.firstName;
        row.insertCell().textContent = student.lastName;
        row.insertCell().textContent = student.email || "";

        var actions = row.insertCell();

        var edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.className = "btn btn-warning btn-sm me-2";
        edit.onclick = function() {
            editStudent(student);
        };

        var del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "btn btn-danger btn-sm";
        del.onclick = function() {
            deleteStudent(student.id);
        };

        actions.append(edit, del);
    });
}


// Get information from the form
function getFormData() {
    return {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value
    };
}


// POST - Add a student
async function addStudent() {
    try {
        var response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getFormData())
        });

        if (!response.ok) throw new Error(await response.text());

        clearForm();
        await getStudents();
        showMessage("Student added!");
    } catch (err) {
        showMessage(err.message);
    }
}


// PUT - Update a student
async function updateStudent(id) {
    try {
        var response = await fetch(apiUrl + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getFormData())
        });

        if (!response.ok) throw new Error(await response.text());

        clearForm();
        await getStudents();
        showMessage("Student updated!");
    } catch (err) {
        showMessage(err.message);
    }
}


// Fill the form to edit a student
function editStudent(student) {
    document.getElementById("studentId").value = student.id;
    document.getElementById("firstName").value = student.firstName;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("email").value = student.email || "";

    window.scrollTo(0, 0);
}


// DELETE - Delete a student
async function deleteStudent(id) {
    if (!confirm("Delete this student?")) return;

    try {
        var response = await fetch(apiUrl + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(await response.text());

        await getStudents();
        showMessage("Student deleted!");
    } catch (err) {
        showMessage(err.message);
    }
}


// GET - Search for a student by ID
async function searchStudent() {
    var id = document.getElementById("searchId").value;

    if (!/^[1-9]\d*$/.test(id)) {
        showMessage("Enter a valid student ID");
        return;
    }

    try {
        var response = await fetch(apiUrl + "/" + id);

        if (!response.ok) throw new Error(await response.text());

        var student = await response.json();
        displayStudents([student]);
        showMessage("Student found!");
    } catch (err) {
        displayStudents([]);
        showMessage(err.message);
    }
}


// Clear the form
function clearForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value = "";
}


// Display messages
function showMessage(message) {
    document.getElementById("message").textContent = message;
}


// Decide whether to add or update
document.getElementById("studentForm").onsubmit = function(event) {
    event.preventDefault();

    var id = document.getElementById("studentId").value;

    if (id) {
        updateStudent(id);
    } else {
        addStudent();
    }
};


// Load students when the page opens
getStudents();
