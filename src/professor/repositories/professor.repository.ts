import { IPostagem } from 'src/posts/schemas/models/post.interface';
import { IProfessor } from '../schemas/models/professor.interface';

export abstract class ProfessorRepository {
  abstract findProfessor(email: string): Promise<IProfessor>;
  // abstract createLogin(professor: IProfessor): Promise<IProfessor>;
  abstract getAllPostAdmin(): Promise<IPostagem[]>;
}
