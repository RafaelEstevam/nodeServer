//Model
var Users = require("../models/users");

//DTO
var dto = 'name email password'

//Controller
module.exports = function(app){
  
  app.post('/users', (req, res) => {
    var db = req.db;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var new_post = new Users({
      name: name,
      email: email,
      password: password
    })
  
    new_post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    })
  })
  
  // Fetch all posts
  app.get('/users', (req, res) => {
    Users.find({}, dto, function (error, users) {

      var userList = [];

      users.forEach(function(item){
        userList.push({_id: item._id, name: item.name, email: item.email})
      })

      if (error) { console.error(error); }
      res.send({
        users: userList
      })
    }).sort({_id:-1})
  })
  
  // Fetch single post
  app.get('/users/:id', (req, res) => {
    var db = req.db;
    Users.findById(req.params.id, dto, function (error, users) {
      if (error) { console.error(error); }
      res.send(users)
    })
  })
  
  // Update a post
  app.put('/users/:id', (req, res) => {
    var db = req.db;
    Users.findById(req.params.id, dto, function (error, users) {
      if (error) { console.error(error); }
      users.name = req.body.name
      users.email = req.body.email
      users.password = req.body.password
      //tasks.description = req.body.description
      users.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
  })
  
  // Delete a post
  app.delete('/users/:id', (req, res) => {
    var db = req.db;
    Users.remove({
      _id: req.params.id
    }, function(err, post){
      if (err)
        res.send(err)
      res.send({
        success: true
      })
    })
  })

  return app
}