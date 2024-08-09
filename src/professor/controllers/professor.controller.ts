import {
  Body,
  Controller,
  Get,
  // UseInterceptors,
} from '@nestjs/common';
// import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { ProfessorService } from '../services/professor.service';
import { z } from 'zod';
// import { hash } from 'bcryptjs';

const loginProfessorSchema = z.object({
  Email: z.string(),
  Password: z.string(),
});

type LoginProfessorGet = z.infer<typeof loginProfessorSchema>;

// @UseInterceptors(LoggingInterceptor)
@Controller('professores')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get('login')
  async login(
    @Body(new ZodValidationPipe(loginProfessorSchema))
    { Email, Password }: LoginProfessorGet,
  ) {
    return this.professorService.login(Email, Password);
  }

  @Get()
  async findProfessors() {
    return this.professorService.findProfessors();
  }

  // @Post('new-professor')
  // async createLogin(
  //   @Body(new ZodValidationPipe(loginProfessorSchema))
  //   { Nome, Email, Password }: LoginProfessorGet,
  // ) {
  //   const hashedPassword = await hash(Password, 8);
  //   return this.professorService.createLogin({
  //     Nome,
  //     Email,
  //     Password: hashedPassword,
  //   });
  // }
}
