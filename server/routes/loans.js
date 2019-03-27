import express from 'express';
import { celebrate } from 'celebrate';
import controller from '../controllers/loans.js';
import validation from '../helpers/loansValidations';

const route = express.Router();
const isValid = (params) => celebrate(params, { abortEarly: false });

route.post('/api/v1/loan', isValid(validation.payLoan), controller.payLoan);

export default route;