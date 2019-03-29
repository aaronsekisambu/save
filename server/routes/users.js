import express from 'express';
import { celebrate } from 'celebrate';
import controller from '../controllers/users';
import validation from '../helpers/userValidations';

const router = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

router.post('/api/v1/auth/signup',
  isValid(validation.userSignup),
  controller.createUser);

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
