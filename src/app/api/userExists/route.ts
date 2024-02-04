import { NextResponse } from "next/server";
import { connectMonfoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
export async function POST(req:any){
    console.log("hello");
    try{ 
        await connectMonfoDB();
        const {email, password} = await req.json();
        
        const user = await User.findOne({email});
        console.log("a",user)
        if(user.password!==password){
            return NextResponse.json({
                message:"An error occured while registering the user."
            },
            { status:500});
        }
        return NextResponse.json({user});
    }catch(error){
        console.log(error);
    }
}