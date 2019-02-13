//Model
var Book = require("../models/book");

//Controller
module.exports = function(app){
  app.post('/books', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;

    var new_book = new Book({
      title: title,
      description: description
    })
  
    new_book.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Book saved successfully!'
      })
    })
  })
  
  // Fetch all posts
  app.get('/books', (req, res) => {
    Book.find({}, 'title description', function (error, books) {
      if (error) { console.error(error); }
      res.send({
        books: books
      })
    }).sort({_id:-1})
  })
  
  // Fetch single post
  app.get('/books/:id', (req, res) => {
    var db = req.db;
    Book.findById(req.params.id, 'title description', function (error, book) {
      if (error) { console.error(error); }
      res.send(book)
    })
  })
  
  // Update a post
  app.put('/books/:id', (req, res) => {
    var db = req.db;
    Book.findById(req.params.id, 'title description', function (error, book) {
      if (error) { console.error(error); }
  
      book.title = req.body.title
      book.description = req.body.description
      book.save(function (error) {
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
  app.delete('/books/:id', (req, res) => {
    var db = req.db;
    Book.remove({
      _id: req.params.id
    }, function(err, book){
      if (err)
        res.send(err)
      res.send({
        success: true
      })
    })
  })

  return app
}