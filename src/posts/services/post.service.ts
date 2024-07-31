import { Injectable, NotFoundException } from '@nestjs/common';
import { PostagemRepository } from '../repositories/post.repository';
import { IPostagem } from '../schemas/models/post.interface';

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

  async createPost(post: IPostagem): Promise<void> {
    return await this.postagemRepository.createPost(post);
  }

  async updatePost(post: IPostagem): Promise<void> {
    return await this.postagemRepository.updatePost(post);
  }

  async deletePost(postId: string): Promise<void> {
    return await this.postagemRepository.deletePost(postId);
  }
}
