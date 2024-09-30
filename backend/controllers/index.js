import { AnalyticsData, getDailySalesData } from './analytics.controller.js';
import { signup,login,logout,getProfile,refreshToken } from './auth.controller.js';
import { addInCart, CartProducts, removeFromAllCart, UpdateQunatity } from './cart.controller.js';
import { getCoupons, validateCoupon } from './coupon.controller.js';
import { Checkout, createCheckout } from './payment.controller.js';
import { getAllProducts, FeaturedProducts, createProduct, deleteProduct, RecommendedProducts, CategoryProducts, toggleFeaturedProduct } from './product.controller.js';

export{
    AnalyticsData, 
    getDailySalesData,
    signup,
    login,
    logout,
    getProfile,
    refreshToken,
    addInCart,
    CartProducts,
    removeFromAllCart,
    UpdateQunatity,
    getCoupons,
    validateCoupon,
    Checkout,
    createCheckout,
    getAllProducts,
    FeaturedProducts,
    createProduct,
    deleteProduct,
    RecommendedProducts,
    CategoryProducts,
    toggleFeaturedProduct 
};