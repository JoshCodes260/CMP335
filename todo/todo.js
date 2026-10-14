
const express = require('express');
const app = express();

app.use(express.json());

const todos = [
    { id: 1, name: 'Study for Exam', due: 'Thursday', status: 'Not Complete'},
    { id: 2, name: 'Clean Room', due: 'Friday', status: 'Complete'},
    { id: 3, name: 'Go to Gym', due: 'Monday', status: 'Complete'},
    { id: 4, name: 'Finish Project', due: 'Sunday', status: 'Not Complete'},
    { id: 5, name: 'Take Out Trash', due: 'Wednesday', status: 'Complete'}
];

app.get('/', (req, res) => {
    res.send(todos);
});

app.get('/api/todo', (req, res) => {
    res.send(todos);
});

app.get('/api/todo/:id', (req, res) => {
    const todo = todos.find(
        c => c.id === parseInt(req.params.id)
    );

    if (!todo) {
        return res.status(404).send(
            'The TODO with the given ID was not found.'
        );
    }

    res.send(todo);
});

app.post('/api/todo', (req, res) => {

    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send(
            'Name is required and should be minimum 3 characters.'
        );
    }

    const todo = {
        id: Math.max(0, ...todos.map(t => t.id)) + 1,
        name: req.body.name,
        due: req.body.due,
        status: req.body.status || 'Not Complete'
    };

    todos.push(todo);

    res.send(todo);
});

app.put('/api/todo/:id', (req, res) => {

    const todo = todos.find(
        c => c.id === parseInt(req.params.id)
    );

    if (!todo) {
        return res.status(404).send(
            'The TODO with the given ID was not found.'
        );
    }

    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send(
            'Name is required and should be minimum 3 characters.'
        );
    }

    todo.name = req.body.name;
    todo.due = req.body.due;
    todo.status = req.body.status;

    res.send(todo);
});

app.delete('/api/todo/:id', (req, res) => {

    const todo = todos.find(
        c => c.id === parseInt(req.params.id)
    );

    if (!todo) {
        return res.status(404).send(
            'The TODO with the given ID was not found.'
        );
    }

    const index = todos.indexOf(todo);

    todos.splice(index, 1);

    res.send(todo);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
