import express from 'express';
import { celebrate } from 'celebrate';
import userController from '../controllers/users';
import userValidation from '../helpers/userValidation';

const router = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

router.post('/api/v1/auth/signup',
  isValid(userValidation.userSignup),
  userController.createUser);

router.delete('/api/v1/users/:id',
<<<<<<< HEAD
  isValid(userValidation.CheckUserId),
=======
  isValid(userValidation.userId),
>>>>>>> [ft-164832221] add user details API
  userController.deleteUser);


router.post('/api/v1/auth/login',
  isValid(userValidation.userLogin),
  userController.userLogin);

router.patch('/api/v1/users/:id/approve',
<<<<<<< HEAD
  isValid(userValidation.checkUserId),
  userController.approveUser);

router.get('/api/v1/users/:id/details',
	isValid(userValidation.checkUserId),
	userController.getDetails);

router.get('/api/v1/users/:id/loan_history',
	isValid(userValidation.checkUserId),
	userController.getUserLoans);

=======
  isValid(userValidation.userId),
  userController.approveUser);

router.get('/api/v1/users/:id/details',
	isValid(userValidation.userId),
	userController.getDetails);

<<<<<<< HEAD
>>>>>>> [ft-164832221] add user details API
=======
router.get('/api/v1/users/:id/loan_history',
	isValid(userValidation.userId),
	userController.getUserLoans);

>>>>>>> [ft-164833612] Add loan history API
export default router;
