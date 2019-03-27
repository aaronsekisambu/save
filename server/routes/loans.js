/* 
* routes for the loan goes here
*/

// importing the modules
import express from 'express';
import Loan from '../controllers/loans';

const routes = express.Router();

routes.post('/api/v1/loans/request', Loan.requestLoan);

export default routes;
