//
// Quick-n-dirty Example API Server for Skedulo intervew questions
//

// Imports
const express = require('express');
const app = express();
let path = require('path');
let url = require('url');
// const cors = require('cors');

// to allow cross-origin resource sharing - axios from http://localhost:8082 (react App)
// app.use(
//   cors({
//     origin: '*',
//     credentials: true
//   })
// );

// Some sample data
var people = [
  { id: '1', name: 'Bill Gates', org: 'Microsoft' },
  { id: '2', name: 'Steve Jobs', org: 'Apple' },
  { id: '3', name: 'Barack Obama', org: 'Government' },
  { id: '4', name: 'Jonathan Doe', org: 'ACME' }
];

var interests = [
  { personId: '1', name: 'Skiing' },
  { personId: '1', name: 'Philanthropy' },
  { personId: '2', name: 'Fonts' },
  { personId: '3', name: 'Basketball' }
];

var skills = [
  { personId: '1', name: 'C++' },
  { personId: '1', name: 'Basic' },
  { personId: '1', name: 'Monopoly' },
  { personId: '2', name: 'Turtlenecks' },
  { personId: '2', name: 'Instagram' },
  { personId: '3', name: 'Basketball' },
  { personId: '3', name: 'Cycling' }
];

// Allow static content
app.use(express.static(path.join(__dirname, 'public')));

// API to get a list of people
app.get('/people', (req, res) => res.json(people));

// API to get the id of the richest person
app.get('/richest', (req, res) => res.json({ richestPerson: 2 }));

// Get a list of interest for the given people ids. (/interests?personIds=1,2,3)
app.get('/interests', function(req, res) {
  let query = url.parse(req.url, true).query;
  if (!query.personIds) {
    return res.status(500).send({ error: "Parameter 'personIds' required" });
  }
  let personIds = query.personIds.split(',');
  let results = interests.filter(
    interest => personIds.indexOf(interest.personId) >= 0
  );
  res.json(results);
});

// Get a list of skills for the given people ids. (/skills?personIds=1,2,3)
app.get('/skills', function(req, res) {
  let query = url.parse(req.url, true).query;
  if (!query.personIds) {
    return res.status(500).send({ error: "Parameter 'personIds' required" });
  }
  let personIds = query.personIds.split(',');
  console.log(personIds);
  let results = skills.filter(skill => personIds.indexOf(skill.personId) >= 0);
  res.json(results);
});

app.get('/', (req, res) => res.send('<b>hi world</b>'));

// POST method route
app.post('/', (req, res) => res.send('POST request to the homepage'));

// Start the server!
app.listen(3000, () => console.log('xpress4'));
