// Express.js app with GET /todos endpoint

const express = require('express');
const router = express.Router();

const todos = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Learn Node.js', completed: false },
  { id: 3, title: 'Write code', completed: false },
  { id: 4, title: 'Go to gym', completed: false },
  { id: 5, title: 'Read a book', completed: true }
];

router.get('/todos', (req, res) => {
  res.json(todos);
});

module.exports = router;