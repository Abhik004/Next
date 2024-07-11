import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel.js'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { error } from 'console';

connect()


export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {username,email,password} = reqBody;
        console.log(reqBody);

        //check if user already exist
        const user=await User.findOne({email})
        if (user){
            return NextResponse.json({error:"User already exist"},{status:400})
        }

        //hash the password
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt)

        //create a new user in db
        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })

        //saving the user
        const savedUser=await newUser.save()
        console.log(savedUser);
        
        return NextResponse.json({
            message:"User Created Succesfully",
            success:true,
            savedUser
        })
        

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}