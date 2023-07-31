//this is the file that is being run with multiple routes coming from it - thursday 72723 18:14 demo
const express = require('express');
// path is a Node.js utility module that works with file and dir paths
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const uniqid = require('uniqid');

//NODE is saying that something is already running on PORT 3001 - I need to learn how to kill that operation

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.json())
// below will create a route for getting the /notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json','utf-8',(err, data) => {
    res.send(data)
    console.log(data)
  })
})

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json','utf-8',(err, data) => {
    const notes =  JSON.parse(data)
    const newNote = {
      ...req.body,
      id : uniqid()
    }
    notes.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(newNote)
     })
  })
})


app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json','utf-8',(err, data) => {
    const notes =  JSON.parse(data)
    const filterNotes = notes.filter(note => note.id !== req.params.id )
    fs.writeFile('./db/db.json', JSON.stringify(filterNotes), (err, data) => {
      res.json(200)
     })
  })
})

// below is a wildcard route for all other GET request (*)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); //refer to lesson 5 in 11-Express Course Directory
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page, 
    // I am presented with a page with existing notes listed in the left-hand column, 
    // plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text, a (GET REQUEST)Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon the new note I have entered, is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column, that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page, I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

// free student HEROKU app   