/*we can use two ways for mailer component- one complete backend 
domain.com/verifytoken/assasasdfdgfdffg(only server)
or
domain.com/verifytoken?token=adadfdf(client)
*/

import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
        //creating a hashed token
        const hashedToken=await bcryptjs.hash(userId.toString(),10) //everytime we might not be sure that we'll get a json response , might be a bson response from mongo so convert it to string
        
        if (emailType==="VERIFY"){
            //for verify token
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry:Date.now()+3600000} /*findbyId finds the id and updates the value... based on the userId provided verifytoken will get the new token... 360000ms time given*/
            )
        }
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000} /*findbyId finds the id and updates the value... based on the userId provided verifytoken will get the new token... 360000ms time given*/
            )
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
        });
        const mailOptions={
            from: 'abc@gmail.com',
            to:email,
            subject: emailType==="VERIFY"?"Verify your email":"Reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"Verify your email":"Reset your password"}
            or copy paste the link below in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse=await transport.sendMail(mailOptions);
    
    } catch (error:any) {
        throw new Error(error.message);
    }
}