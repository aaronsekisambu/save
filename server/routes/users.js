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

router.post('/api/v1/auth/login',
  isValid(validation.userLogin),
  controller.userLogin);

// router.put('/api/v1/auth/profile',
//   isValid(validation.userSignup),
//   controller.createUser);
//
// router.get('/api/v1/auth/profile',
//   isValid(validation.userSignup),
//   controller.createUser);

export default router;
