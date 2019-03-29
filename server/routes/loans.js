import express from 'express';
import { celebrate } from 'celebrate';
import Controller from '../controllers/loans';
import validation from '../helpers/loansValidations';

const route = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

// route.post('/api/v1/loan', isValid(validation.payLoan), Controller.payLoan);
route.post('/api/v1/loan/request',isValid(validation.requestLoan), Controller.requestLoan);

export default route;
