//Model
var Tasks = require("../models/tasks");

//DTO
var dto = 'titulo prioridade estimativa dificuldade descricao_tarefa tags status inicio fim mais_detalhes notificacoes'

//Controller
module.exports = function(app){
  
  app.post('/tasks', (req, res) => {
    var db = req.db;
    var prioridade = req.body.prioridade;
    var titulo = req.body.titulo;
    var estimativa = req.body.estimativa;
    var dificuldade = req.body.dificuldade;
    var descricao_tarefa = req.body.descricao_tarefa;
    var tags = req.body.tags;
    var status = req.body.status;
    var inicio = req.body.inicio;
    var fim = req.body.fim;
    var mais_detalhes = req.body.mais_detalhes;
    var notificacoes = req.body.notificacoes;

    var new_post = new Tasks({
      prioridade: prioridade,
      titulo: titulo,
      estimativa: estimativa,
      dificuldade: dificuldade,
      descricao_tarefa: descricao_tarefa,
      tags: tags,
      status: status,
      inicio: inicio,
      fim: fim,
      mais_detalhes: mais_detalhes,
      notificacoes: notificacoes,
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
  app.get('/tasks', (req, res) => {
    Tasks.find({}, dto, function (error, tasks) {
      if (error) { console.error(error); }
      res.send({
        tasks: tasks
      })
    }).sort({_id:-1})
  })
  
  // Fetch single post
  app.get('/tasks/:id', (req, res) => {
    var db = req.db;
    Tasks.findById(req.params.id, dto, function (error, tasks) {
      if (error) { console.error(error); }
      res.send(tasks)
    })
  })
  
  // Update a post
  app.put('/tasks/:id', (req, res) => {
    var db = req.db;
    Tasks.findById(req.params.id, dto, function (error, tasks) {
      if (error) { console.error(error); }
      tasks.titulo = req.body.titulo
      tasks.prioridade = req.body.prioridade
      tasks.estimativa = req.body.estimativa
      tasks.dificuldade = req.body.dificuldade
      tasks.descricao_tarefa = req.body.descricao_tarefa
      tasks.tags = req.body.tags
      tasks.status = req.body.status
      tasks.inicio = req.body.inicio
      tasks.fim = req.body.fim
      tasks.mais_detalhes = req.body.mais_detalhes
      tasks.notificacoes = req.body.notificacoes
      //tasks.description = req.body.description
      tasks.save(function (error) {
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
  app.delete('/tasks/:id', (req, res) => {
    var db = req.db;
    Tasks.remove({
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