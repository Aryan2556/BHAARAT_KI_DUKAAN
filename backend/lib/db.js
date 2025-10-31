import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectionDB = async () =>{
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongo DB connected");
    } catch(error){
        console.log("failed to fetch : ",error.message);
        process.exit(1);
    }
};