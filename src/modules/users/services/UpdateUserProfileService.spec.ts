// import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to update the user's profile", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'john@gmail.com',
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('john@gmail.com');
  });
});
