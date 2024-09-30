import express from 'express';
import { protectRoute } from '../middlewares/auth.middleawares.js';
import { getCoupons, validateCoupon } from '../controllers/index.js';

const router = express.Router();

router.get("/", protectRoute,getCoupons);
router.get("/validate", protectRoute,validateCoupon);

export default router;