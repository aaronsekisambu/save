// the routes for the transactions comes work
import express from 'express';
import { celebrate } from 'celebrate';
import transaction from '../controllers/transactions';
import transValidation from '../helpers/transValidation';
import token from '../middleware/Auth';

const router = express.Router();
const isValid = params => celebrate(params, { abortEarly: false });
const verifyToken = token.verifyToken();

// route for saving money
router.post('/api/v1/saves', isValid(transValidation.save), verifyToken, transaction.save);
router.put('/api/v1/saves/:id', verifyToken, transaction.updateSaving);

export default router;
