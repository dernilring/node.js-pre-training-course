// Express.js app with GET /todos endpoint

const express = require('express');

module.exports = function(todos) {
  const router = express.Router();
  
  router.get('/todos', (req, res) => {
    res.json(todos);
  });
  
  return router;
};