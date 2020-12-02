import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createSession = new CreateSessionService(fakeUsersRepository);
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    const response = await createSession.execute({
      email: 'jane@gmail.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
  });
});
