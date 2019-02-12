//Model
var Post = require("../models/post");

//Controller
module.exports = function(app){
  app.post('/posts', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;

    var new_post = new Post({
      title: title,
      description: description
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
  app.get('/posts', (req, res) => {
    Post.find({}, 'title description', function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      })
    }).sort({_id:-1})
  })
  
  // Fetch single post
  app.get('/posts/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) { console.error(error); }
      res.send(post)
    })
  })
  
  // Update a post
  app.put('/posts/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) { console.error(error); }
  
      post.title = req.body.title
      post.description = req.body.description
      post.save(function (error) {
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
  app.delete('/posts/:id', (req, res) => {
    var db = req.db;
    Post.remove({
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