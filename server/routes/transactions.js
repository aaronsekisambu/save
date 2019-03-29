// the routes for the transactions comes work
import express from 'express';
import Transaction from '../controllers/transactions';

const router = express.Router();

// route for saving money
router.post('/api/v1/saves', Transaction.save );

export default router;