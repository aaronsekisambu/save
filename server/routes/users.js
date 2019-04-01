import express from 'express';
import { celebrate } from 'celebrate';
import userController from '../controllers/users';
import userValidation from '../helpers/userValidations';
import token from '../middleware/Auth';

const router = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });
const verifyToken = token.verifyToken();

router.post('/api/v1/auth/signup',
  isValid(userValidation.userSignup),
  userController.createUser);

router.delete('/api/v1/users/:id',
  isValid(userValidation.deleteUser),
  verifyToken,
  userController.deleteUser);

router.post('/api/v1/auth/login',
  isValid(userValidation.userLogin),
  userController.userLogin);

router.patch('/api/v1/users/:id/approve',
  isValid(userValidation.deleteUser),
  userController.approveUser);

export default router;
