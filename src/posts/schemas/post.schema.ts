import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IPostagem } from './models/post.interface';

@Schema()
export class Postagem implements IPostagem {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  Id?: string;

  @Prop({})
  Titulo: string;

  @Prop({})
  Conteudo: string;

  @Prop({})
  CreatedAt: Date;

  @Prop({})
  UpdatedAt: Date;

  @Prop({})
  ProfessorId: number;
}
export const PostagemSchema = SchemaFactory.createForClass(Postagem);
