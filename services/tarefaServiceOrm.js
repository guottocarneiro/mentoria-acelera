import { MyDataSource } from "../data-source";

export class TarefaServiceOrm {
  tarefaRepository = MyDataSource.getRepository(Tarefa);
}

  

