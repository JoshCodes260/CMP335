
var apiUrl = "http://localhost:3000/api/courses";


// GET - All courses
async function getCourses() {
    try {
        var response = await fetch(apiUrl);
        if (!response.ok) throw new Error(await response.text());

        var courses = await response.json();
        displayCourses(courses);
    } catch (err) {
        showMessage(err.message);
    }
}


// Display courses
function displayCourses(courses) {
    var table = document.getElementById("courseTable");
    table.innerHTML = "";

    courses.forEach(function(course) {
        var row = table.insertRow();

        row.insertCell().textContent = course.id;
        row.insertCell().textContent = course.courseNumber;
        row.insertCell().textContent = course.courseName || "";

        var facultyName = "";

        if (course.firstName && course.lastName) {
            facultyName = course.firstName + " " + course.lastName;
        } else {
            facultyName = course.facultyId || "";
        }

        row.insertCell().textContent = facultyName;
        row.insertCell().textContent = course.enrollmentLimit ?? "";

        var actions = row.insertCell();

        var edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.className = "btn btn-warning btn-sm me-2";
        edit.onclick = function() {
            editCourse(course);
        };

        var del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "btn btn-danger btn-sm";
        del.onclick = function() {
            deleteCourse(course.id);
        };

        actions.append(edit, del);
    });
}


// Get course form information
function getFormData() {
    var limit = document.getElementById("enrollmentLimit").value;

    return {
        courseNumber: document.getElementById("courseNumber").value,
        courseName: document.getElementById("courseName").value,
        facultyId: Number(document.getElementById("facultyId").value),
        enrollmentLimit: limit === "" ? null : Number(limit)
    };
}


// POST - Add course
async function addCourse() {
    try {
        var response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getFormData())
        });

        if (!response.ok) throw new Error(await response.text());

        clearForm();
        await getCourses();
        showMessage("Course added!");
    } catch (err) {
        showMessage(err.message);
    }
}


// PUT - Update course
async function updateCourse(id) {
    try {
        var response = await fetch(apiUrl + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getFormData())
        });

        if (!response.ok) throw new Error(await response.text());

        clearForm();
        await getCourses();
        showMessage("Course updated!");
    } catch (err) {
        showMessage(err.message);
    }
}


// Fill form for editing
function editCourse(course) {
    document.getElementById("courseId").value = course.id;
    document.getElementById("courseNumber").value = course.courseNumber;
    document.getElementById("courseName").value = course.courseName || "";
    document.getElementById("facultyId").value = course.facultyId || "";
    document.getElementById("enrollmentLimit").value = course.enrollmentLimit ?? "";

    window.scrollTo(0, 0);
}


// DELETE - Remove course
async function deleteCourse(id) {
    if (!confirm("Delete this course?")) return;

    try {
        var response = await fetch(apiUrl + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(await response.text());

        await getCourses();
        showMessage("Course deleted!");
    } catch (err) {
        showMessage(err.message);
    }
}


// GET - Search course by ID
async function searchCourse() {
    var id = document.getElementById("searchId").value;

    if (!/^[1-9]\d*$/.test(id)) {
        showMessage("Enter a valid course ID");
        return;
    }

    try {
        var response = await fetch(apiUrl + "/" + id);
        if (!response.ok) throw new Error(await response.text());

        var course = await response.json();
        displayCourses([course]);
        showMessage("Course found!");
    } catch (err) {
        displayCourses([]);
        showMessage(err.message);
    }
}


// GET - Courses assigned to faculty
async function getFacultyCourses() {
    var id = document.getElementById("scheduleId").value;

    if (!/^[1-9]\d*$/.test(id)) {
        showMessage("Enter a valid faculty ID");
        return;
    }

    try {
        var response = await fetch(apiUrl + "/faculty/" + id);
        if (!response.ok) throw new Error(await response.text());

        var courses = await response.json();
        displayCourses(courses);
        showMessage(courses.length + " course(s) found for faculty ID " + id);
    } catch (err) {
        displayCourses([]);
        showMessage(err.message);
    }
}


// Clear form
function clearForm() {
    document.getElementById("courseForm").reset();
    document.getElementById("courseId").value = "";
}


// Show message
function showMessage(message) {
    document.getElementById("message").textContent = message;
}


// Save course form
document.getElementById("courseForm").onsubmit = function(event) {
    event.preventDefault();

    var id = document.getElementById("courseId").value;

    if (id) {
        updateCourse(id);
    } else {
        addCourse();
    }
};


// Load courses
getCourses();
