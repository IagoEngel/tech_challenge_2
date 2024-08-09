import { compare } from 'bcryptjs';
import { ProfessorRepository } from '../repositories/professor.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Professor } from '../schemas/professor.schema';
import { IProfessor } from '../schemas/models/professor.interface';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async login(email: string, password: string) {
    const professor: Professor =
      await this.professorRepository.findProfessor(email);
    if (!professor) throw new NotFoundException('Professor Not Found');

    const passwordMatches = await compare(password, professor.Password);
    if (!passwordMatches) throw new Error('Email or password is incorrect');

    return professor;
  }

  async findProfessors() {
    return await this.professorRepository.findProfessors();
  }

  async createLogin(professor: IProfessor) {
    return await this.professorRepository.createLogin(professor);
  }
}
