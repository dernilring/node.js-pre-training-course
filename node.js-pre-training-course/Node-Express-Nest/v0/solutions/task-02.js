// Express.js app with POST /todos endpoint
const express = require('express');
const router = express.Router();

router.post('/todos', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'title is required'
    });
  }
  
  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
    title: title,
    completed: false
  };
  
  todos.push(newTodo);
  res.status(201).json({
    success: true,
    message: 'new todo added',
    data: newTodo
  });
});

module.exports = router;
