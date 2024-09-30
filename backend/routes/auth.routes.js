import express from 'express';
import { signup,login,logout,getProfile,refreshToken } from '../controllers/index.js';
import { protectRoute } from '../middlewares/auth.middleawares.js';

const router = express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.get('/profile',protectRoute,getProfile);

router.post('/refresh-token',refreshToken);

export default router;