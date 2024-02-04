import { connect } from "http2";
import { NextResponse } from "next/server";
import { connectMonfoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req:any){
    try{
        const {name, email, password} =await req.json();
        // const hashedPassword = await bcrypt.hash(password,10);
        await connectMonfoDB();
        await User.create({name, email, password});
        return NextResponse.json({message:"User registered"},{status:201});
    }catch(error){
        return NextResponse.json({
            message:"An error occured while registering the user."
        },
        { status:500});
    }
}