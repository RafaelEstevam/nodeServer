const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeserver'); // porta mongodb

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// CONTROLLERS
var postControllers = require("./controllers/post")(app);
var taskControllers = require("./controllers/tasks")(app);
var bookControllers = require("./controllers/books")(app);
var usersControllers = require("./controllers/users")(app);

app.listen(process.env.PORT || 8081)