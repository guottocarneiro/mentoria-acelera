// controllers/tarefaController.js
const tarefaService = require('./services/tarefaService');

class TarefaController {
  listarTarefas(req, res) {
    try {
      const tarefas = tarefaService.listarTodas();
      res.status(200).json(tarefas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar tarefas', error: error.message });
    }
  }

  buscarTarefaPorId(req, res) {
    try {
      const tarefa = tarefaService.buscarPorId(req.params.id);
      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      res.status(200).json(tarefa);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tarefa', error: error.message });
    }
  }

  criarTarefa(req, res) {
    try {
      const { descricao } = req.body;
      if (!descricao) {
        return res.status(400).json({ message: 'Descrição é obrigatória' });
      }
      const novaTarefa = tarefaService.criar(descricao);
      res.status(201).json(novaTarefa);
    } catch (error) {
      res.status(400).json({ message: error.message }); // Erros de validação do service
    }
  }

  atualizarTarefa(req, res) {
    try {
      const { descricao, concluida } = req.body;
      const tarefaAtualizada = tarefaService.atualizar(req.params.id, descricao, concluida);
      if (!tarefaAtualizada) {
        return res.status(404).json({ message: 'Tarefa não encontrada para atualização' });
      }
      res.status(200).json(tarefaAtualizada);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar tarefa', error: error.message });
    }
  }

  deletarTarefa(req, res) {
    try {
      const deletado = tarefaService.deletar(req.params.id);
      if (!deletado) {
        return res.status(404).json({ message: 'Tarefa não encontrada para deleção' });
      }
      res.status(204).send(); // 204 No Content
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
    }
  }
}

module.exports = new TarefaController(); // Exporta uma instância do controller