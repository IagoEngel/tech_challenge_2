import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Postagem, PostagemSchema } from './schemas/post.schema';
import { PostagemRepository } from './repositories/post.repository';
import { PostagemMongooseRepository } from './repositories/mongoose/post.mongoose.repository';
import { PostagemService } from './services/post.service';
import { PrometheusService } from '../shared/services/prometheus.service';
import { PostagemController } from './controllers/post.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Postagem.name,
        schema: PostagemSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PostagemRepository,
      useClass: PostagemMongooseRepository,
    },
    PostagemService,
    PrometheusService,
  ],
  controllers: [PostagemController],
})
export class PostagemModule {}
