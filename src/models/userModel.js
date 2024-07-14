import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"Please provide a username"],
        unique:true,
    },
    email:{
        type:String,
        required: [true,"Please provide an email"],
        unique:true,
    },
    password:{
        type:String,
        required: [true,"Please provide a password"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema);
/*above line esp to connect in nextjs if already created then don't create again*/
export default User;