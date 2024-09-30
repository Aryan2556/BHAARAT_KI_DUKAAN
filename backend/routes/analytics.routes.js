import express from 'express';
import { AnalyticsData, getDailySalesData } from '../controllers/index.js';
import { adminRoute, protectRoute } from '../middlewares/auth.middleawares.js';

const router = express.Router();

const FinalDetailedAnalytics = async(req,res) =>{
    try {
        const analyticsData = await AnalyticsData();

        const startDate = new Date();
        const endDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const dailySalesData = await getDailySalesData(startDate,endDate);

        res.json({ analyticsData, dailySalesData });
    } catch (error) {
        console.log("Error in analytics route",error.message);
        res.status(500).json({ message:"Server Error",error:error.message });
    }
};

router.get("/",protectRoute,adminRoute, FinalDetailedAnalytics)
export default router;
