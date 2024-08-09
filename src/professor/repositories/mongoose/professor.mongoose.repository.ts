import { InjectModel } from '@nestjs/mongoose';
import { ProfessorRepository } from '../professor.repository';
import { Professor } from 'src/professor/schemas/professor.schema';
import { Model } from 'mongoose';
import { Postagem } from 'src/posts/schemas/post.schema';
import { IProfessor } from 'src/professor/schemas/models/professor.interface';

export class ProfessorMongooseRepository implements ProfessorRepository {
  constructor(
    @InjectModel(Professor.name) private professorModel: Model<Professor>,
    @InjectModel(Postagem.name) private postagemModel: Model<Postagem>,
  ) {}

  async findProfessor(email: string): Promise<IProfessor> {
    return await this.professorModel.findOne({ Email: email }).exec();
  }

  async findProfessors(): Promise<IProfessor[]> {
    return await this.professorModel.find().exec();
  }

  // async createLogin(professor: IProfessor): Promise<IProfessor> {
  //   return await new this.professorModel(professor).save();
  // }
}
