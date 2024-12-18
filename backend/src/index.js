// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // to able to grab the cookies
const app = express();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

// dotenv
dotenv.config();
const PORT = process.env.PORT;

// this will allow us to extract the json data from the body
app.use(express.json());
// Middleware to parse cookies from the incoming request and make them accessible via req.cookies
app.use(cookieParser()); 

// Route Mouting
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

// app listen
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
    connectDB();
});