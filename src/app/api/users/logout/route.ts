/*just clear out the token */

import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response=NextResponse.json({message:"Logout Succesfull",success:true})
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)}); //removing the token and expiring it rn
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}