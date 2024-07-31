import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrometheusService } from 'src/shared/services/prometheus.service';
import { Professor, ProfessorSchema } from './schemas/professor.schema';
import { ProfessorRepository } from './repositories/professor.repository';
import { ProfessorMongooseRepository } from './repositories/mongoose/professor.mongoose.repository';
import { ProfessorService } from './services/professor.service';
import { ProfessorController } from './controllers/professor.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Professor.name,
        schema: ProfessorSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ProfessorRepository,
      useClass: ProfessorMongooseRepository,
    },
    ProfessorService,
    PrometheusService,
  ],
  controllers: [ProfessorController],
})
export class ProfessorModule {}
