import mongoose from "mongoose";


export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
                useNewUrlParser: true,    // Use the new URL parser
                useUnifiedTopology: true, // Use the new connection management engine
            });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log("MongoDB connection error:",error);
    }
}