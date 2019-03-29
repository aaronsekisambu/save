import express from 'express';
import { celebrate } from 'celebrate';
import controller from '../controllers/users';
import validation from '../helpers/validations';

const router = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

router.post('/signup',
  isValid(validation.userSignup),
  controller.createUser);

router.delete('/api/v1/user/:id', isValid(userValidation.deleteUser), userController.deleteUser);

export default router;
