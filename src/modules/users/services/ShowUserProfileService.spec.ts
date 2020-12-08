import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowUserProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'password',
    });

    const profile = await showUserProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jane Doe');
    expect(profile.email).toBe('jane@gmail.com');
  });

  it('should not be able to show the profile of a non-existing user', async () => {
    await expect(
      showUserProfile.execute({
        user_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
