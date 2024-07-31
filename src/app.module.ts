import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PostagemModule } from './posts/posts.module';

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PostagemModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
