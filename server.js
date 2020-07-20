
const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db.json"));
});

app.post("/api/notes", function(req, res) {
 
    fs.readFile(path.join(__dirname, "db.json"), "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }
        console.log(response)
        const notes = JSON.parse(response);
        const noteRequest = req.body;
        console.log(noteRequest)
        const newNoteId = notes.length + 1;
        const newNote = {
            id: newNoteId,
            title: noteRequest.title,
            text: noteRequest.text
        };
        notes.push(newNote);
        console.log(notes)
        res.json(newNote);
        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes, null, 2), function(err) {
            if (err) throw err;
        });
       
    });
});