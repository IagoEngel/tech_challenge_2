import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProfessor } from './models/professor.interface';
import mongoose from 'mongoose';

@Schema()
export class Professor implements IProfessor {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  Id?: string;

  @Prop({})
  Nome: string;
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);
