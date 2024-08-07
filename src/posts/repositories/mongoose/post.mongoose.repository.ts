import { InjectModel } from '@nestjs/mongoose';
import { PostagemRepository } from '../post.repository';
import { Postagem } from 'src/posts/schemas/post.schema';
import { Model } from 'mongoose';
import { IPostagem } from 'src/posts/schemas/models/post.interface';

export class PostagemMongooseRepository implements PostagemRepository {
  constructor(
    @InjectModel(Postagem.name) private postagemModel: Model<Postagem>,
  ) {}

  async getAllPosts(): Promise<IPostagem[]> {
    return this.postagemModel.find().exec();
  }

  getPost(postId: number): Promise<IPostagem> {
    return this.postagemModel.findById(postId).exec();
  }

  searchPost(queryString: string): Promise<IPostagem[]> {
    const queries = queryString.split(', ');

    return this.postagemModel
      .find({
        Titulo: { $regex: queries },
      })
      .exec();
  }

  async createPost(post: IPostagem): Promise<void> {
    const createPost = new this.postagemModel(post);
    await createPost.save();
  }

  async updatePost(post: IPostagem): Promise<void> {
    const { id, Titulo, Conteudo, ProfessorId } = post;
    await this.postagemModel
      .updateOne(
        { _id: id },
        { Titulo: Titulo, Conteudo: Conteudo, ProfessorId: ProfessorId },
      )
      .exec();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postagemModel.deleteOne({ id: postId }).exec();
  }
}
