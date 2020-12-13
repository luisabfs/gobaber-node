import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PasswordRecoveryController from '../controllers/PasswordRecoveryController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const passwordRecoveryController = new PasswordRecoveryController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/recover',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordRecoveryController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
