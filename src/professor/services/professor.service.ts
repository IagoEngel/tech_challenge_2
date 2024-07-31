import { IPostagem } from 'src/posts/schemas/models/post.interface';
import { ProfessorRepository } from '../repositories/professor.repository';

export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async getAllPostAdmin() {
    return await this.professorRepository.getAllPostAdmin();
  }

  async createPost(post: IPostagem) {
    return await this.professorRepository.createPost(post);
  }

  async updatePost(post: IPostagem) {
    return await this.professorRepository.updatePost(post);
  }

  async deletePost(postId: number) {
    return await this.professorRepository.deletePost(postId);
  }
}
