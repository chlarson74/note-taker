const express = require('express');
// path is a Node.js utility module that works with file and dir paths
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// below will create a route for getting the /notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// below is a wildcard route for all other GET request (*)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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