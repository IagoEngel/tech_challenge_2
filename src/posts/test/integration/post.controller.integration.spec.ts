import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import {
  postMongooseStub,
  postMongooseStubWithObjectId,
  postStub,
} from '../stubs/post.stub';
import { IPostagem } from '../../schemas/models/post.interface';

describe('PostagemController', () => {
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

  beforeEach(async () => {
    await dbConnection.collection('postagems').deleteMany({});
  });

  describe('searchPost', () => {
    it('should return an array of Postagems matching a query', async () => {
      await dbConnection.collection('postagems').insertOne(postStub());
      const response = await request(httpServer).post('/posts/search').send({
        queryString: 'Teste, Example',
      });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject([postMongooseStub()]);
    });
  });

  describe('getAllPosts', () => {
    it('should return an array of Postagem', async () => {
      await dbConnection.collection('postagems').insertOne(postStub());
      const response = await request(httpServer).get('/posts');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([postMongooseStub()]);
    });
  });

  describe('getPostById', () => {
    it('should return a Postagem', async () => {
      const post = await dbConnection
        .collection('postagems')
        .insertOne(postStub());
      const response = await request(httpServer).get(
        `/posts/${post.insertedId.toString()}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(postMongooseStub());
    });
  });

  describe('createPost', () => {
    it('should create a Postagem', async () => {
      const loginResponse = await request(httpServer)
        .post('/professores/login')
        .send({
          Email: 'iagoengel@yahoo.com',
          Password: '123456',
        });
      const { token } = loginResponse.body;

      const response = await request(httpServer)
        .post('/posts')
        .auth(token, {
          type: 'bearer',
        })
        .send(postStub());

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({});

      const post = await dbConnection
        .collection('postagems')
        .findOne<IPostagem>({ Titulo: postStub().Titulo });

      expect(post).toMatchObject(postMongooseStubWithObjectId());
    });
  });

  describe('updatePost', () => {
    it('should update a Postagem', async () => {
      const loginResponse = await request(httpServer)
        .post('/professores/login')
        .send({
          Email: 'iagoengel@yahoo.com',
          Password: '123456',
        });
      const { token } = loginResponse.body;

      const post = await dbConnection
        .collection('postagems')
        .insertOne(postStub());

      const response = await request(httpServer)
        .put(`/posts/${post.insertedId.toString()}`)
        .auth(token, {
          type: 'bearer',
        })
        .send({ ...postStub(), Titulo: 'Novo Titulo' });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({});
    });
  });

  describe('deletePost', () => {
    it('should delete a Postagem', async () => {
      const loginResponse = await request(httpServer)
        .post('/professores/login')
        .send({
          Email: 'iagoengel@yahoo.com',
          Password: '123456',
        });
      const { token } = loginResponse.body;

      const post = await dbConnection
        .collection('postagems')
        .insertOne(postStub());

      const response = await request(httpServer)
        .delete(`/posts/${post.insertedId.toString()}`)
        .auth(token, {
          type: 'bearer',
        });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({});
    });
  });
});
