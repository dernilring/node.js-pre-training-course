// Express.js GET /todos/search endpoint with query params
// TODO: implement
const express = require("express");

module.exports = function (todos) {
  const router = express.Router();
  router.get("/todos/search", (req, res) => {
    const { title, completed } = req.query;
    let filtered = todos;

    if (title !== undefined) {
      const substr = String(title).toLocaleLowerCase();
      filtered = filtered.filter((todo) =>
        todo.title.toLocaleLowerCase().includes(substr)
      );
    }

    if (completed !== undefined) {
      const compFlag = completed === "true";
      filtered = filtered.filter((todo) => todo.completed === compFlag);
    }
    res.json(filtered);
  });
  return router;
};
