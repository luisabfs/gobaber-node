import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to show a list of providers', async () => {
    const provider1 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'password',
    });

    const provider2 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: 'password',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Lyla Rose',
      email: 'lyla@gmail.com',
      password: 'password',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([provider1, provider2]);
  });
});
