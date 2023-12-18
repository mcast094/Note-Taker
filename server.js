const express = require('express');
const fs = require("fs");
const PORT = 3001;
const app = express();
const dataBase = require('./db/db.json');

// assigns Unique ID to new notes 
const { v4: uuidv4 } = require('uuid');

app.use(express.static('public'));
app.use(express.json());
// API routes
// GET /notes
app.get('/api/notes', (req, res) => {
    fs.reqdFile('./db/db.json', (err, data) => {
        if (err) throw err; 
        let dbData = JSON.parse(data);
        res.json(dbData);
    });
});

//  POST
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    dataBase.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(dataBase));
    res.json(dataBase);
});

// Delete
app.delete('/api/notes/:id', (req, res) => {
    const newDataBase = dataBase.filter((note) => 
        note.id !== req.params.id);

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});