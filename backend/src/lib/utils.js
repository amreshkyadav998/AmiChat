import jwt from "jsonwebtoken";

export const generateToken = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn:"7d", //the jwt token will expire in 7 days after 7 days we need to login again
    });

    res.cookie("jwt",token , { //jwt is just the name of cookie we can change it
        maxAge:7*24*60*60*1000 , // 7 days in millisecond
        httpOnly:true, // prevent XSS attacks cross-site scripting attacks
        sameSite:"strict",
        secure: process.env.NODE_ENV != "development",
    });

    return token;
}