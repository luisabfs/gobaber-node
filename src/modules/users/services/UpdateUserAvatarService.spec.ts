import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update a new avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'filename.jpg',
    });

    expect(user.avatar).toBe('filename.jpg');
  });

  it('should not be able to update avatar of non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'invalid-id',
        avatarFilename: 'filename.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'old_filename.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'new_filename.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('old_filename.jpg');
    expect(user.avatar).toBe('new_filename.jpg');
  });
});
