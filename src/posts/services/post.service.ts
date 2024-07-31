import { Injectable, NotFoundException } from '@nestjs/common';
import { PostagemRepository } from '../repositories/post.repository';

@Injectable()
export class PostagemService {
  constructor(private readonly postagemRepository: PostagemRepository) {}

  // ALUNOS
  async getAllPosts() {
    return await this.postagemRepository.getAllPosts();
  }

  async getPost(postId: number) {
    const postagem = await this.postagemRepository.getPost(postId);

    if (!postagem) throw new NotFoundException('Postagem Not Found');

    return postagem;
  }

  async searchPost(queryString: string) {
    return await this.postagemRepository.searchPost(queryString);
  }
}
