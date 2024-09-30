import express from 'express';
import { addInCart, CartProducts, removeFromAllCart, UpdateQunatity } from '../controllers/index.js';
import { protectRoute } from '../middlewares/auth.middleawares.js';


const router= express.Router();

router.post("/", protectRoute ,addInCart);
router.get("/",protectRoute, CartProducts);
router.delete("/", protectRoute ,removeFromAllCart);
router.put("/:id", protectRoute ,UpdateQunatity);

export default router;