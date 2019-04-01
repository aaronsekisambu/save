import express from 'express';
import { celebrate } from 'celebrate';
import loanController from '../controllers/loans';
import loanValidation from '../helpers/loansValidations';

const route = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

route.post('/api/v1/loan', isValid(loanValidation.payLoan), loanController.payLoan);
route.post('/api/v1/loan/request', isValid(loanValidation.requestLoan), loanController.requestLoan);
route.patch('/api/v1/approve/:id', isValid(loanValidation.approveLoan), loanController.approveLoan);
export default route;
