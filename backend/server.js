import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from "cors";
import { connectionDB } from './lib/db.js';

dotenv.config();

import {
    authRoutes,
    productRoutes,
    cartRoutes,
    couponRoutes,
    paymentRoutes,
    analyticsRoutes
} from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 7800;

const __dirname = path.resolve();


app.use(express.json({ limit: "920mb" }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));



app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
    connectionDB();
});


