import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;

        // if user doesn't have token , or not authenticated
        if(!token){
            return res.status(401).json({message:"Unauthorized - No Token Provided"}); // 401 code use for unauthorized
        }

        // if user having token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); // dont want to send the password so -ve sign

        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }

        req.user = user;

        next(); // calling updateProfile() function
    } catch (error) {
        console.log("Error in protectRoute Middleware: ",error.message);
        res.status(500).json({message:"Internal Server error"});
    }
}