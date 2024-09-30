// import User from '../models/user.model.js';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { redis } from '../lib/redis.js';

dotenv.config();

const tokens = (userID) =>{
    const accessToken = jwt.sign({ userID },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'15m'
    })
    const refreshToken = jwt.sign({ userID },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:'7d'
    })

    return { accessToken, refreshToken };
}

const storeTokens = async (userID,refreshToken) =>{
    await redis.set(`refresh_token:${userID}`,refreshToken,"EX",7*24*60*60); 
}

const setcokkie=(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 15 * 60 * 1000,
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}
export const signup = async (req,res) =>{

    const {email,password,name} = req.body;
    try {
        const userExist = await User.findOne({ email });
        
        if (userExist){
            return res.status(400).json({message:"User already exists"});
        }
        const user = await User.create({name,email,password});
        
        const {accessToken,refreshToken} = tokens(user._id);
        await storeTokens(user._id,refreshToken);        

        setcokkie(res,accessToken,refreshToken);

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        });
        
    } catch (error) {
        res.status(500).json({ message : error.message });     
    }
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = tokens(user._id);
			await storeTokens(user._id, refreshToken);
			setcokkie(res, accessToken, refreshToken);

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};


export const logout = async (req,res) =>{
    try {
        const refresh_token = req.cookies.refreshToken;
        if(refresh_token){
            const decoded = jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userID}`)
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message : "Logged out Successfully"}); 
    } catch (error) {
        res.status(500).json({ message : "Server Error" , error: error.message });
    }
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};