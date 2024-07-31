import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostagemService } from '../services/post.service';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { z } from 'zod';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';

const createPostagemSchema = z.object({
  Titulo: z.string(),
  Conteudo: z.string(),
  ProfessorId: z.coerce.number(),
});
const updatePostagemSchema = z.object({
  Titulo: z.string(),
  Conteudo: z.string(),
  ProfessorId: z.coerce.number(),
});

type CreatePost = z.infer<typeof createPostagemSchema>;
type UpdatePost = z.infer<typeof updatePostagemSchema>;
@UseInterceptors(LoggingInterceptor)
@Controller('posts')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  async getAllPosts() {
    return this.postagemService.getAllPosts();
  }

  @Get(':postId')
  async getPost(@Param('postId') postId: number) {
    return this.postagemService.getPost(postId);
  }

  @Get('/search')
  async searchPost(@Body() queryString: string) {
    return this.postagemService.searchPost(queryString);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createPostagemSchema))
  @Post()
  async createPost(@Body() { Titulo, Conteudo, ProfessorId }: CreatePost) {
    return this.postagemService.createPost({
      Titulo,
      Conteudo,
      ProfessorId,
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
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  async deletePost(postId: string) {
    return this.postagemService.deletePost(postId);
  }
}
