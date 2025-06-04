const express = require('express');
const router = express.Router();
const tarefaController = require('./tarefaController');

// Rota para listar todas as tarefas (GET /tarefas) // GET -> https://www.tarefas.com/ 
router.get('/', tarefaController.listarTarefas);

// Rota para buscar uma tarefa por ID (GET /tarefas/:id) // GET -> https://www.tarefas.com/1 
router.get('/:id', tarefaController.buscarTarefaPorId);

// Rota para criar uma nova tarefa (POST /tarefas) // POST https://www.tarefas.com/
router.post('/', tarefaController.criarTarefa);

// Rota para atualizar uma tarefa existente (PUT /tarefas/:id) // PUT https://www.tarefas.com/1
router.put('/:id', tarefaController.atualizarTarefa);

// Rota para deletar uma tarefa (DELETE /tarefas/:id) // DELETE https://www.tarefas.com/1
router.delete('/:id', tarefaController.deletarTarefa);

module.exports = router;