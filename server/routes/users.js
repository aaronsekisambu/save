import express from 'express';
import { celebrate } from 'celebrate';
import userController from '../controllers/users';
import userValidation from '../helpers/userValidation';

const router = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

router.post('/api/v1/auth/signup',
  isValid(userValidation.userSignup),
  userController.createUser);

router.delete('/api/v1/user/:id',
  isValid(userValidation.deleteUser),
  userController.deleteUser);

export default router;
