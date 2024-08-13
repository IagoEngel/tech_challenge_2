export const professorStub = () => {
  return {
    Email: 'iagoengel@yahoo.com',
    Password: '123456',
  };
};

export const professorEncryptedPasswordStub = () => {
  return {
    Email: 'iagoengel@yahoo.com',
    Password: '$2a$08$.NIcMT4SpJQxliAMAr123e3ip.UztmsSo2ut/zKCWAZYOQf9r1uEy',
  };
};

export const professorResponseLoginStub = () => {
  return {
    _id: '66bac23652ae3e8d71b9b3bb',
    Nome: 'Iago Engel Serafin',
    Email: 'iagoengel@yahoo.com',
    Password: '$2a$08$.NIcMT4SpJQxliAMAr123e3ip.UztmsSo2ut/zKCWAZYOQf9r1uEy',
    __v: 0,
  };
};
