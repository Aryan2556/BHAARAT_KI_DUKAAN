import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectionDB } from './lib/db.js';

// import authRoutes from './routes/auth.routes.js';
// import productRoutes from './routes/product.routes.js';
// import cartRoutes from './routes/cart.routes.js';
// import couponRoutes from './routes/coupon.routes.js';
import {
    authRoutes,
    productRoutes,
    cartRoutes,
    couponRoutes,
    paymentRoutes,
    analyticsRoutes
} from './routes/index.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/coupons',couponRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/analytics',analyticsRoutes);


app.listen(PORT,()=>{
    console.log("Server is running on "+PORT);
    connectionDB();
});




// app.listen(PORT,()=>{console.log("Server is running on http://localhost:"+PORT);})
// "devDependencies": {"nodemon":"^3.1.4" }
// "email":"newadmin@gmail.com",
// "password":"newlearner@34"