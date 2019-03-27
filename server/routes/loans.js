import express from 'express';
import { celebrate } from 'celebrate';
import controller from '../controllers/loans.js';
import validation from '../helpers/loansValidations';

const route = express.Router();

route.post('/api/v1/loan', celebrate(validation.payLoan), controller.payLoan);

export default route;