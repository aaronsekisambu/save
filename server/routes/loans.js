import express from 'express';
import { celebrate } from 'celebrate';
import Controller from '../controllers/loans';
import validation from '../helpers/loansValidations';

const route = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

// route.post('/api/v1/loan', isValid(validation.payLoan), Controller.payLoan);
route.post('/api/v1/loan/request',isValid(validation.requestLoan), Controller.requestLoan);
// update a party
route.patch('/api/v1/loan/approve/:id', isValid(validation.approveLoan), Controller.approveLoan);
export default route;
