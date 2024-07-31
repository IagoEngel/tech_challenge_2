import { InjectModel } from '@nestjs/mongoose';
import { ProfessorRepository } from '../professor.repository';
import { Professor } from 'src/professor/schemas/professor.schema';
import { Model } from 'mongoose';
import { IPostagem } from 'src/posts/schemas/models/post.interface';
import { Postagem } from 'src/posts/schemas/post.schema';

export class ProfessorMongooseRepository implements ProfessorRepository {
  constructor(
    @InjectModel(Professor.name) private professorModel: Model<Professor>,
    @InjectModel(Postagem.name) private postagemModel: Model<Postagem>,
  ) {}

  getAllPostAdmin(): Promise<IPostagem[]> {
    return this.postagemModel.find().exec();
  }

  async createPost(post: IPostagem): Promise<void> {
    const createPost = new this.postagemModel(post);
    await createPost.save();
  }

  async updatePost(post: IPostagem): Promise<void> {
    const { Id, Titulo, Conteudo, ProfessorId } = post;
    await this.postagemModel
      .updateOne(
        { _id: Id },
        { Titulo: Titulo, Conteudo: Conteudo, ProfessorId: ProfessorId },
      )
      .exec();
  }

  async deletePost(postId: number): Promise<void> {
    await this.postagemModel.deleteOne({ _id: postId }).exec();
  }
}
