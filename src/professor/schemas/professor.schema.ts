import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProfessor } from './models/professor.interface';
import mongoose from 'mongoose';

@Schema()
export class Professor implements IProfessor {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;

  @Prop({})
  Nome: string;

  @Prop({})
  Email: string;

  @Prop({})
  Password: string;
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);
