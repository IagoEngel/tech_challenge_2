import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostagemService } from '../services/post.service';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { z } from 'zod';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';

const createPostagemSchema = z.object({
  Titulo: z.string(),
  Conteudo: z.string(),
  ProfessorId: z.string(),
});
const updatePostagemSchema = z.object({
  Titulo: z.string(),
  Conteudo: z.string(),
  ProfessorId: z.string(),
});
const searchPostSchema = z.object({
  queryString: z.string(),
});

type CreatePost = z.infer<typeof createPostagemSchema>;
type UpdatePost = z.infer<typeof updatePostagemSchema>;
type SearchPosts = z.infer<typeof searchPostSchema>;
@UseInterceptors(LoggingInterceptor)
@Controller('posts')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Post('/search')
  @HttpCode(HttpStatus.OK)
  async searchPost(@Body() { queryString }: SearchPosts) {
    console.log('Controller queryString ==> ', queryString);
    return this.postagemService.searchPost(queryString);
  }

  @Get()
  async getAllPosts() {
    return this.postagemService.getAllPosts();
  }

  @Get(':postId')
  async getPost(@Param('postId') postId: number) {
    return this.postagemService.getPost(postId);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createPostagemSchema))
  @Post()
  async createPost(@Body() { Titulo, Conteudo, ProfessorId }: CreatePost) {
    return this.postagemService.createPost({
      Titulo,
      Conteudo,
      ProfessorId,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });
  }

  @UseGuards(AuthGuard)
  @Put(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body(new ZodValidationPipe(updatePostagemSchema))
    { Titulo, Conteudo, ProfessorId }: UpdatePost,
  ) {
    return this.postagemService.updatePost({
      id: postId,
      Titulo,
      Conteudo,
      ProfessorId,
      UpdatedAt: new Date(),
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postagemService.deletePost(postId);
  }
}
