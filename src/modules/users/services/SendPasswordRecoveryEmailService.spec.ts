import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendPasswordRecoveryEmailService from './SendPasswordRecoveryEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendPasswordRecoveryEmail: SendPasswordRecoveryEmailService;

describe('SendPasswordRecoveryEmail', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendPasswordRecoveryEmail = new SendPasswordRecoveryEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send a recovery password email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    await sendPasswordRecoveryEmail.execute({
      email: 'jane@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover password of a non-existing user', async () => {
    await expect(
      sendPasswordRecoveryEmail.execute({
        email: 'jane@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a password recovery token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    await sendPasswordRecoveryEmail.execute({
      email: 'jane@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
