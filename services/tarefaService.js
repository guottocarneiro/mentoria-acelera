// services/tarefaService.js
import Tarefa from '../models/Tarefa.js';
const { LowSync } = require('lowdb');

// --- Nosso Adaptador Síncrono em Memória Personalizado ---
class InMemorySyncAdapter {
  #data = null; // Onde os dados serão armazenados internamente no adaptador

  constructor() {
    // Opcional: log para ver quando é criado
    // console.log('InMemorySyncAdapter instanciado.');
  }

  read() {
    // Retorna os dados atualmente armazenados.
    // Se for null (ex: primeira leitura), LowSync usará os dados padrão.
    // console.log('InMemorySyncAdapter: Lendo dados:', this.#data);
    return this.#data;
  }

  write(data) {
    // Armazena os novos dados. LowSync chama isso quando db.write() é usado.
    // console.log('InMemorySyncAdapter: Escrevendo dados:', data);
    this.#data = data;
  }
}
// --- Fim do Adaptador Personalizado ---

// Estrutura de dados padrão para o nosso banco em memória
const defaultData = {
  tarefas: [
    new Tarefa(1, 'Estudar Node.js com lowdb (custom adapter)', false),
    new Tarefa(2, 'Apresentar API de exemplo atualizada', true),
  ],
  proximoId: 3, // Gerenciador de ID dentro do "banco"
};

// Instancia nosso adaptador personalizado
const adapter = new InMemorySyncAdapter();

// Instancia o LowSync com nosso adaptador e os dados padrão
const db = new LowSync(adapter, defaultData);

// Realiza a leitura inicial.
// Isso fará com que o adapter.read() seja chamado. Como ele retornará null inicialmente,
// o LowSync usará o defaultData para popular db.data.
// Em seguida, LowSync chamará adapter.write(defaultData), armazenando os dados iniciais no nosso adaptador.
db.read();

// Se após db.read(), db.data ainda for null (o que não deveria acontecer se defaultData foi fornecido),
// você pode forçar a inicialização (embora LowSync deva cuidar disso):
// if (db.data === null) {
//   db.data = defaultData;
//   db.write();
// }


class TarefaService {
  listarTodas() {
    return db.data.tarefas;
  }

  buscarPorId(id) {
    const idNumerico = parseInt(id);
    return db.data.tarefas.find(tarefa => tarefa.id === idNumerico);
  }

  criar(descricao) {
    if (!descricao) {
      throw new Error('Descrição é obrigatória.');
    }
    const novaTarefa = new Tarefa(db.data.proximoId, descricao);
    db.data.proximoId++;
    db.data.tarefas.push(novaTarefa);
    db.write(); // Isso chamará adapter.write(db.data)
    return novaTarefa;
  }

  atualizar(id, descricao, concluida) {
    const idNumerico = parseInt(id);
    const tarefa = db.data.tarefas.find(t => t.id === idNumerico);

    if (!tarefa) {
      return null;
    }

    let modificado = false;
    if (descricao !== undefined && tarefa.descricao !== descricao) {
      tarefa.descricao = descricao;
      modificado = true;
    }
    if (concluida !== undefined && tarefa.concluida !== concluida) {
      tarefa.concluida = concluida;
      modificado = true;
    }

    if (modificado) {
      db.write();
    }
    return tarefa;
  }

  deletar(id) {
    const idNumerico = parseInt(id);
    const tamanhoOriginal = db.data.tarefas.length;
    db.data.tarefas = db.data.tarefas.filter(tarefa => tarefa.id !== idNumerico);

    if (db.data.tarefas.length < tamanhoOriginal) {
      db.write();
      return true;
    }
    return false;
  }
}

module.exports = new TarefaService();