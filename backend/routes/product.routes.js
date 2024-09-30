import express from 'express';
import { getAllProducts, FeaturedProducts, createProduct, deleteProduct, RecommendedProducts, CategoryProducts, toggleFeaturedProduct } from '../controllers/index.js';
import { adminRoute, protectRoute } from '../middlewares/auth.middleawares.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", FeaturedProducts);
router.get("/recommendations", RecommendedProducts);
router.get("/category/:category", CategoryProducts);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id",protectRoute, adminRoute, deleteProduct)

export default router;