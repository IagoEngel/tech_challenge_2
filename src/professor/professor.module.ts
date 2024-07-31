import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { PrometheusService } from 'src/shared/services/prometheus.service';
import { Professor, ProfessorSchema } from './schemas/professor.schema';
import { ProfessorRepository } from './repositories/professor.repository';
import { ProfessorMongooseRepository } from './repositories/mongoose/professor.mongoose.repository';
import { ProfessorService } from './services/professor.service';
import { ProfessorController } from './controllers/professor.controller';
import { Postagem, PostagemSchema } from 'src/posts/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Professor.name,
        schema: ProfessorSchema,
      },
      {
        name: Postagem.name,
        schema: PostagemSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ProfessorRepository,
      useClass: ProfessorMongooseRepository,
    },
    ProfessorService,
    // PrometheusService,
  ],
  controllers: [ProfessorController],
})
export class ProfessorModule {}
