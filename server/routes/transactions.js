// the routes for the transactions comes work
import express from 'express';
import transaction from '../controllers/transactions';

const router = express.Router();

// route for saving money
router.post('/api/v1/saves', transaction.save);
router.put('/api/v1/saves/:id', transaction.updateSaving);

export default router;
