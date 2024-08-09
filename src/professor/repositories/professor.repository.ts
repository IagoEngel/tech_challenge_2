import { IProfessor } from '../schemas/models/professor.interface';

export abstract class ProfessorRepository {
  abstract findProfessor(email: string): Promise<IProfessor>;
  abstract findProfessors(): Promise<IProfessor[]>;
  abstract createLogin(professor: IProfessor): Promise<IProfessor>;
}
