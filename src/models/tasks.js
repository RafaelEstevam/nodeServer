var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  prioridade: String,
  titulo: String,
  prioridade: String,
  estimativa: String,
  dificuldade: String,
  descricao_tarefa: String,
  tags: String,
  status: String,
  inicio: String,
  fim: String,
  mais_detalhes: String,
  notificacoes: Boolean
});

var Tasks = mongoose.model("Tasks", TaskSchema);
module.exports = Tasks;