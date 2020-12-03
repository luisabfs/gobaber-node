// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendPasswordRecoveryEmailService from './SendPasswordRecoveryEmailService';

describe('SendPasswordRecoveryEmail', () => {
  it('should be able to send a recovery password email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    const sendPasswordRecoveryEmail = new SendPasswordRecoveryEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await sendPasswordRecoveryEmail.execute({
      email: 'jane@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
