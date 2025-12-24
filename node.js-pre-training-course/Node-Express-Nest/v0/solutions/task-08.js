// Express.js static files serving for ToDo frontend
// TODO: implement
const express = require("express");
module.exports = function handleStaticFiles() {
  return express.static("public");
};
