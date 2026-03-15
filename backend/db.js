import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(()=>{
    console.log("mongoDb connected");
}).catch((err)=>{
    console.log("error occured :",err);
});

const userSchema = new mongoose.Schema({
    username:String,
    password:String
},{ timestamps:true });

const userModel = mongoose.model("user",userSchema);
export default userModel;