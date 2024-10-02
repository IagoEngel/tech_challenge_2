import { InjectModel } from '@nestjs/mongoose';
import { PostagemRepository } from '../post.repository';
import { Postagem } from '../../schemas/post.schema';
import { Model } from 'mongoose';
import { IPostagem } from '../../schemas/models/post.interface';

export class PostagemMongooseRepository implements PostagemRepository {
  constructor(
    @InjectModel(Postagem.name) private postagemModel: Model<Postagem>,
  ) {}

  async getAllPosts(): Promise<IPostagem[]> {
    return this.postagemModel.find().populate('ProfessorId').exec();
  }

  getPost(postId: number): Promise<IPostagem> {
    return this.postagemModel.findById(postId).populate('ProfessorId').exec();
  }

  async searchPost(queryString: string): Promise<IPostagem[]> {
    const queries = queryString.split(', ');

    const aux = [];
    for (let i = 0; i < queries.length; i++) {
      const element = await this.postagemModel
        .find({
          Titulo: { $regex: queries[i], $options: 'i' },
        })
        .populate('ProfessorId')
        .exec();

      for (let j = 0; j < element.length; j++) {
        if (!aux.includes(element[j])) {
          aux.push(element[j]);
        }
      }
    }

    return aux;
  }

  async createPost(post: IPostagem): Promise<void> {
    const createPost = new this.postagemModel(post);
    await createPost.save();
  }

  async updatePost(post: IPostagem): Promise<void> {
    const { id, Titulo, Conteudo, UpdatedAt, ProfessorId } = post;
    await this.postagemModel
      .updateOne(
        { _id: id },
        { Titulo: Titulo, Conteudo, UpdatedAt, ProfessorId },
      )
      .exec();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postagemModel.findByIdAndDelete(postId).exec();
  }
}
