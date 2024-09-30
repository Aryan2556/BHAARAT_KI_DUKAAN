import express from 'express';
import { protectRoute } from '../middlewares/auth.middleawares.js';
import { Checkout, createCheckout } from '../controllers/index.js';

const router = express.Router();

router.post('/checkout-session',protectRoute,createCheckout);
router.post('/checkout-success',protectRoute,Checkout);

export default router;