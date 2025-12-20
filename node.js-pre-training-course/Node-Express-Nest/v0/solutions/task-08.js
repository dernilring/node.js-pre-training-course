// Express.js static files serving for ToDo frontend
// TODO: implement
const express = require("express");
module.exports = function (app) {
  app.use("/static", express.static("public"));
};
