import { IProfessor } from 'src/professor/schemas/models/professor.interface';

export interface IPostagem {
  id?: string;
  Titulo: string;
  Conteudo: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ProfessorId: IProfessor | string;
}
