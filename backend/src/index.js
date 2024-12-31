// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // to able to grab the cookies
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

// dotenv
dotenv.config();
const PORT = process.env.PORT;

// this will allow us to extract the json data from the body
app.use(express.json({ limit: '20mb' }));  // Increase the limit to 20MB
app.use(express.urlencoded({ limit: '20mb', extended: true }));
// Middleware to parse cookies from the incoming request and make them accessible via req.cookies
app.use(cookieParser()); 

// cors setup
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// Route Mouting
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

// app listen
server.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
    connectDB();
});