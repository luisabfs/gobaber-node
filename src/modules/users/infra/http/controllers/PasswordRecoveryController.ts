import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendPasswordRecoveryEmailService from '@modules/users/services/SendPasswordRecoveryEmailService';

export default class PasswordRecoveryController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendPasswordRecoveryEmail = container.resolve(
      SendPasswordRecoveryEmailService,
    );

    await sendPasswordRecoveryEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
