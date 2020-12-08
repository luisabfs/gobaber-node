import AppError from '@shared/errors/AppError';

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

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'old_password',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'john@gmail.com',
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('john@gmail.com');
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'old_password',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'john@gmail.com',
      old_password: 'old_password',
      password: 'new_password',
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('john@gmail.com');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'old_password',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'old_password',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john@gmail.com',
        old_password: 'wrong_old_password',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to an email already in use', async () => {
    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'old_password',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'old_password',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'jane@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile of a non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'invalid-id',
        name: 'John Doe',
        email: 'john@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
