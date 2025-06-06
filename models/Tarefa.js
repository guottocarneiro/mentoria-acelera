import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id;

  @Column({type: "varchar", length: 150})
  descricao;

  @Column({type: "boolean"})
  concluida;

  constructor(id, descricao, concluida) {
    this.id = id;
    this.descricao = descricao;
    this.concluida = concluida;
  }
}
