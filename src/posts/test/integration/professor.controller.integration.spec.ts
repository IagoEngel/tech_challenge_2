import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import {
  professorEncryptedPasswordStub,
  professorResponseLoginStub,
  professorStub,
} from '../stubs/professor.stub';

describe('ProfessorController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('login', () => {
    it('should be a successful login', async () => {
      const response = await request(httpServer)
        .post('/professores/login')
        .send(professorStub());

      const { professor, token } = response.body;

      expect(response.status).toBe(201);
      expect(professor).toMatchObject(professorResponseLoginStub());
      expect(token).toBeDefined();
    });
  });

  describe('findProfessors', () => {
    it('should return an array of Professores', async () => {
      const response = await request(httpServer).get('/professores');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([professorEncryptedPasswordStub()]);
    });
  });

  describe('new-professor', () => {
    it('should create and return a Professor', async () => {
      const response = await request(httpServer)
        .post('/professores/new-professor')
        .send({
          Nome: 'Teste 1',
          Email: 'teste@teste.com',
          Password: '1234567',
        });

      expect(response.status).toBe(201);

      const { _id } = response.body;
      expect(_id).toBeDefined();

      await dbConnection
        .collection('professors')
        .deleteOne({ Nome: 'Teste 1' });
    });
  });
});
