import mongoose, { Schema, models } from "mongoose";
interface IUserActivation extends Document {
    email: string;
    name:string;
    password:string;
  }
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required: true,
    },
   
} ,{ timestamps: true});

const User =models.User || mongoose.model<IUserActivation>("User", userSchema);
export default User;