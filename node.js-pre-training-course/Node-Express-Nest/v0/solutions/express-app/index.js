const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Learn Node.js', completed: false },
  { id: 3, title: 'Write code', completed: false },
  { id: 4, title: 'Go to gym', completed: false },
  { id: 5, title: 'Read a book', completed: true }
];

// TODO: Add routes and middleware here
const loggingMiddleware = require('./task-03');
const task01 = require('./task-01');
const task02 = require('./task-02');
const task04 = require('./task-04');

app.use(loggingMiddleware);
app.use(task01(todos));
app.use(task02(todos));
app.use(task04(todos));


app.get('/', (req, res) => {
  res.send('Express ToDo App Template');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
}); 

module.exports = app;