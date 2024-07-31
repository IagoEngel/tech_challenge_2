import { Body, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { PostagemService } from '../services/post.service';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('posts')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  // ALUNOS
  @Get()
  async getAllPosts() {
    return this.postagemService.getAllPosts();
  }

  @Get(':postId')
  async getPost(@Param('postId') postId: number) {
    return this.postagemService.getPost(postId);
  }

  @Get()
  async searchPost(@Body() queryString: string) {
    return this.postagemService.searchPost(queryString);
  }
}
