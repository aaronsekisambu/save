import express from 'express';
import { celebrate } from 'celebrate';
import loanController from '../controllers/loans';
import loanValidation from '../helpers/loansValidations';
import token from '../middleware/Auth';

const route = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });
const verifyToken = token.verifyToken();

route.post('/api/v1/loan/:id', isValid(loanValidation.payLoan), loanController.payLoan);
route.post('/api/v1/loan/request', isValid(loanValidation.requestLoan), verifyToken, loanController.requestLoan);
route.patch('/api/v1/approve/:id', isValid(loanValidation.approveLoan), verifyToken, loanController.approveLoan);
route.patch('/api/v1/loan/request/:id', isValid(loanValidation.approveLoan), verifyToken, loanController.approveLoanRequest);
route.post('/api/v1/loan/status', isValid(loanValidation.checkLoanStatus), loanController.checkLoanStatus);

export default route;
