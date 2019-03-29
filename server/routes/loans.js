import express from 'express';
import { celebrate } from 'celebrate';
<<<<<<< HEAD
import loanController from '../controllers/loans';
import loanValidation from '../helpers/loansValidations';
=======
import Controller from '../controllers/loans';
import validation from '../helpers/loansValidations';
>>>>>>> [ft-#164831850] finishes the request loan endpoint

const route = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });

<<<<<<< HEAD
route.post('/api/v1/loan', isValid(loanValidation.payLoan), loanController.payLoan);
route.post('/api/v1/loan/request', isValid(loanValidation.requestLoan), loanController.requestLoan);
=======
// route.post('/api/v1/loan', isValid(validation.payLoan), Controller.payLoan);
route.post('/api/v1/loan/request',isValid(validation.requestLoan), Controller.requestLoan);

>>>>>>> [ft-#164831850] finishes the request loan endpoint
export default route;
