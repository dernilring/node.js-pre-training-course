// Express.js static files serving for ToDo frontend
// TODO: implement
module.exports = {}; 


const express = require('express');
const app = express();
app.use(express.static("public"));
