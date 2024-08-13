import mongoose from 'mongoose';

export const postStub = () => {
  return {
    Titulo: 'Postagem Teste',
    Conteudo: 'Conteudo Teste',
    ProfessorId: '66bac23652ae3e8d71b9b3bb',
  };
};

export const postMongooseStub = () => {
  return {
    Titulo: 'Postagem Teste',
    Conteudo: 'Conteudo Teste',
    ProfessorId: {
      _id: '66bac23652ae3e8d71b9b3bb',
      Email: 'iagoengel@yahoo.com',
      Nome: 'Iago Engel Serafin',
      Password: '$2a$08$.NIcMT4SpJQxliAMAr123e3ip.UztmsSo2ut/zKCWAZYOQf9r1uEy',
    },
  };
};

export const postMongooseStubWithObjectId = () => {
  return {
    Titulo: 'Postagem Teste',
    Conteudo: 'Conteudo Teste',
    ProfessorId: new mongoose.Types.ObjectId('66bac23652ae3e8d71b9b3bb'),
  };
};
