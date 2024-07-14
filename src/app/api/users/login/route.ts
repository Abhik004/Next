import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel.js'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody;
        console.log(reqBody);
         
        //check if user exists
        const user =await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"User doesn't exist"},{status:400})
        }
        console.log("user exist");
        

        //check the password
        const validPassword=await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }

        //create token data
        const tokendata={
            id:user._id,
            username:user.username,
            email:user.email
        }

        //create token
        const token=await jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1d"}) //token will stay for 1 day

        const response=NextResponse.json({
            message:"Login Succesfull",
            success:true,
        })
        response.cookies.set("token",token,{httpOnly:true})
        return response;

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500}); 
    }
}