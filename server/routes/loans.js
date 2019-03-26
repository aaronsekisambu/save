import express from 'express';
import { celebrate } from 'celebrate';
import controller from '../controllers/loans';
import validation from '../helpers/loansValidations';

const route = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

route.post('/api/v1/loan', isValid(validation.payLoan), controller.payLoan);
route.post('/api/v1/loan/request', controller.requestLoan);

export default route;
