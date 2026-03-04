import express from 'express';
import { createCheckoutSession } from '../controllers/stripeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/create-session').post(protect, createCheckoutSession);

export default router;
