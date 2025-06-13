const express = require('express');
const router = express.Router();
import TarefaController from './controllers/tarefaController.js';

// Rota para listar todas as tarefas (GET /tarefas) // GET -> https://www.tarefas.com/ 
router.get('/', TarefaController.listarTarefas);

// Rota para buscar uma tarefa por ID (GET /tarefas/:id) // GET -> https://www.tarefas.com/1 
router.get('/:id', TarefaController.buscarTarefaPorId);

// Rota para criar uma nova tarefa (POST /tarefas) // POST https://www.tarefas.com/
router.post('/', TarefaController.criarTarefa);

// Rota para atualizar uma tarefa existente (PUT /tarefas/:id) // PUT https://www.tarefas.com/1
router.put('/:id', TarefaController.atualizarTarefa);

// Rota para deletar uma tarefa (DELETE /tarefas/:id) // DELETE https://www.tarefas.com/1
router.delete('/:id', TarefaController.deletarTarefa);

module.exports = router;