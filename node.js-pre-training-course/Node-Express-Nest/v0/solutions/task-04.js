// Express.js app with GET /todos/:id endpoint
const express = require('express');

module.exports = function(todos) {
  const router = express.Router();
  
  router.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'todo not found'
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  });
  
  return router;
};