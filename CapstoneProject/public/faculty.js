
var apiUrl = "http://localhost:3000/api/faculty";


// GET - All faculty
async function getFaculty() {
    try {
        var response = await fetch(apiUrl);
        if (!response.ok) throw new Error(await response.text());

        var faculty = await response.json();
        displayFaculty(faculty);
    } catch (err) {
        showMessage(err.message);
    }
}


// Display faculty
function displayFaculty(faculty) {
    var table = document.getElementById("facultyTable");
    table.innerHTML = "";

    faculty.forEach(function(person) {
        var row = table.insertRow();

        row.insertCell().textContent = person.id;
        row.insertCell().textContent = person.firstName;
        row.insertCell().textContent = person.lastName;
        row.insertCell().textContent = person.email || "";

        var actions = row.insertCell();

        var edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.className = "btn btn-warning btn-sm me-2";
        edit.onclick = function() {
            editFaculty(person);
        };

        var del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "btn btn-danger btn-sm";
        del.onclick = function() {
            deleteFaculty(person.id);
        };

        actions.append(edit, del);
    });
}


// Get form information
function getFormData() {
    return {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value
    };
}


// POST - Add faculty
async function addFaculty() {
    try {
        var response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getFormData())
        });

        if (!response.ok) throw new Error(await response.text());

        clearForm();
        await getFaculty();
        showMessage("Faculty added!");
    } catch (err) {
        showMessage(err.message);
    }
}


// PUT - Update faculty
async function updateFaculty(id) {
    try {
        var response = await fetch(apiUrl + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getFormData())
        });

        if (!response.ok) throw new Error(await response.text());

        clearForm();
        await getFaculty();
        showMessage("Faculty updated!");
    } catch (err) {
        showMessage(err.message);
    }
}


// Fill form for editing
function editFaculty(person) {
    document.getElementById("facultyId").value = person.id;
    document.getElementById("firstName").value = person.firstName;
    document.getElementById("lastName").value = person.lastName;
    document.getElementById("email").value = person.email || "";

    window.scrollTo(0, 0);
}


// DELETE - Remove faculty
async function deleteFaculty(id) {
    if (!confirm("Delete this faculty member?")) return;

    try {
        var response = await fetch(apiUrl + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(await response.text());

        await getFaculty();
        showMessage("Faculty deleted!");
    } catch (err) {
        showMessage(err.message);
    }
}


// GET - Search faculty by ID
async function searchFaculty() {
    var id = document.getElementById("searchId").value;

    if (!/^[1-9]\d*$/.test(id)) {
        showMessage("Enter a valid faculty ID");
        return;
    }

    try {
        var response = await fetch(apiUrl + "/" + id);
        if (!response.ok) throw new Error(await response.text());

        var person = await response.json();
        displayFaculty([person]);
        showMessage("Faculty found!");
    } catch (err) {
        displayFaculty([]);
        showMessage(err.message);
    }
}


// Clear form
function clearForm() {
    document.getElementById("facultyForm").reset();
    document.getElementById("facultyId").value = "";
}


// Show message
function showMessage(message) {
    document.getElementById("message").textContent = message;
}


// Save form
document.getElementById("facultyForm").onsubmit = function(event) {
    event.preventDefault();

    var id = document.getElementById("facultyId").value;

    if (id) {
        updateFaculty(id);
    } else {
        addFaculty();
    }
};


// Load faculty
getFaculty();
