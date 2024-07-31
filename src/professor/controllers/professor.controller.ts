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
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { ProfessorService } from '../services/professor.service';
import { z } from 'zod';

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
@Controller('professores')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get()
  async getAllPostAdmin() {
    return this.professorService.getAllPostAdmin();
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createPostagemSchema))
  @Post()
  async createPost(@Body() { Titulo, Conteudo, ProfessorId }: CreatePost) {
    return this.professorService.createPost({
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
    return this.professorService.updatePost({
      Id: postId,
      Titulo,
      Conteudo,
      ProfessorId,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  async deletePost(postId: number) {
    return this.professorService.deletePost(postId);
  }
}
