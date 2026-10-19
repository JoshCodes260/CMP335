
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const collections = [
    { id: 1, name: 'Drake', album: 'Take Care', hitSong: 'Gods Plan' },
    { id: 2, name: 'Kendrick Lamar', album: 'DAMN.', hitSong: 'HUMBLE.' },
    { id: 3, name: 'Travis Scott', album: 'ASTROWORLD', hitSong: 'SICKO MODE' },
    { id: 4, name: 'J. Cole', album: '2014 Forest Hills Drive', hitSong: 'No Role Modelz' },
    { id: 5, name: 'Lil Wayne', album: 'Tha Carter III', hitSong: 'A Milli' }
];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/collect.html');
});

app.get('/api/collect', (req, res) => {
    res.send(collections);
});

app.get('/api/collect/:id', (req, res) => {
    const collect = collections.find(
        c => c.id === parseInt(req.params.id)
    );

    if (!collect) {
        return res.status(404).send('Artist not found.');
    }

    res.send(collect);
});

app.post('/api/collect', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send('Name must be at least 3 characters.');
    }

    const collect = {
        id: Math.max(0, ...collections.map(c => c.id)) + 1,
        name: req.body.name,
        album: req.body.album,
        hitSong: req.body.hitSong
    };

    collections.push(collect);
    res.status(201).send(collect);
});

app.put('/api/collect/:id', (req, res) => {
    const collect = collections.find(
        c => c.id === parseInt(req.params.id)
    );

    if (!collect) {
        return res.status(404).send('Artist not found.');
    }

    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send('Name must be at least 3 characters.');
    }

    collect.name = req.body.name;
    collect.album = req.body.album;
    collect.hitSong = req.body.hitSong;

    res.send(collect);
});

app.delete('/api/collect/:id', (req, res) => {
    const collect = collections.find(
        c => c.id === parseInt(req.params.id)
    );

    if (!collect) {
        return res.status(404).send('Artist not found.');
    }

    const index = collections.indexOf(collect);
    collections.splice(index, 1);

    res.send(collect);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
