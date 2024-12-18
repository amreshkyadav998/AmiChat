import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// signup controller
export const signup = async(req,res) => {
    const {email ,fullName,password} =  req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All field are required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }

        const user = await User.findOne({email});

        //check if user with particular email already exists
        if(user){
            return res.status(400).json({message:"Email already exists"});
        }

        //hash the password
        const salt = await bcrypt.genSalt(10); //genSalt means generate salt
        const hashedPassword =  await bcrypt.hash(password,salt); //hash the entered password with salt


        //create new user
        const newUser = new User({
            email,
            fullName,
            password:hashedPassword,
        });

        if(newUser){
            //generate jwt token
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });
        }
        console.log("newUser details:",newUser);

    } catch (error) {
        console.log("Error in signup controlled",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

// login controller
export const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        //find user
        const user = await User.findOne({email});

        // if user not found
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        // if user exist then compare password
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        // if password is not matched
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        // if password is matched then generate the token
        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export const logout = (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Internal Server error"});
    }
};

// update the profile pic  and after updation of profile pic , whole profile updated with updated one
export const updateProfile = async(req,res) => {
    try {
        const {profilePic} = req.body;

        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error occured in update profile: ",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth Controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}