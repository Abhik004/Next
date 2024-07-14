import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log(token); // Log the token for debugging

    // Find the user with the given token and ensure the token is not expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }
    });

    // If no user is found or token is expired
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    console.log(user); // Log the user for debugging

    // Set user as verified
    user.isVerified = true;
    user.verifyToken = null; // Set to null to indicate the token is used
    user.verifyTokenExpiry = null; // Set to null to indicate the token is expired

    await user.save();

    // Respond with success message
    return NextResponse.json({
      message: "Email verified successfully",
      success: true
    });

  } catch (error: any) {
    // Log the error for debugging
    console.error(error);
    // Respond with error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
