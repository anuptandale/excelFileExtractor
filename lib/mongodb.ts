import mongoose from "mongoose";

export const connectMonfoDB = async ()=>{
    const url = process.env.MONGODB_URL?process.env.MONGODB_URL:"";
    try{
        await mongoose.connect(url);
        console.log("connected to mongodb");
    }catch(error){
        console.log("error connecting: ", error);
    }
};