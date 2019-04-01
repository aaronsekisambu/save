import express from 'express';
import { celebrate } from 'celebrate';
import userController from '../controllers/users';
import userValidation from '../helpers/userValidations';

const router = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

router.post('/api/v1/auth/signup',
  isValid(userValidation.userSignup),
  userController.createUser);

router.delete('/api/v1/users/:id',
  isValid(userValidation.userId),
  userController.deleteUser);

router.post('/api/v1/auth/login',
  isValid(userValidation.userLogin),
  userController.userLogin);

router.patch('/api/v1/users/:id/approve',
  isValid(userValidation.userId),
  userController.approveUser);

router.get('/api/v1/users/:id/details',
<<<<<<< HEAD
  isValid(userValidation.userId),
  userController.getDetails);
=======
	isValid(userValidation.userId),
	userController.getDetails);
>>>>>>> c4474ae6c58ee52533fa4a25898f08967b26f0f7

export default router;
