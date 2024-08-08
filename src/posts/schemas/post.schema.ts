import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IPostagem } from './models/post.interface';
import { ProfessorSchema } from 'src/professor/schemas/professor.schema';
import { IProfessor } from 'src/professor/schemas/models/professor.interface';

@Schema()
export class Postagem implements IPostagem {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;

  @Prop({})
  Titulo: string;

  @Prop({})
  Conteudo: string;

  @Prop({})
  CreatedAt: Date;

  @Prop({})
  UpdatedAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    schema: ProfessorSchema,
  })
  ProfessorId: IProfessor | string;
}
export const PostagemSchema = SchemaFactory.createForClass(Postagem);
