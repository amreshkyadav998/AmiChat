import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;
        // {_id:{$ne : loggedInUserId}} -> this indicating where id not equal to  loggedInUserId 
        const filteredUsers = await User.find({_id:{$ne : loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

// to get the message by users
export const getMessages = async(req,res) => {
    try {
        // id:userToChatId -> here id rename to chat id , req.params se access ho rha hai id
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId}, //if sender is me and receiver is other user
                {senderId:userToChatId,receiverId:myId} //if sender is other user and receiver is me
            ]
        })

        res.status(200).json({messages});
    } catch (error) {
        console.log("Error in get message controller: ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

// to send the messages
export const sendMessage = async(req,res) => {
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params; //id from web[parameter] //rename id to receiverId
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        })

        await newMessage.save();

        //todo : realtime functionality goes here => socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}