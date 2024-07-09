import config from "../config";
import { Otp } from "../models/otp.model";
import { Resend } from 'resend'

const resend = new Resend(config.RESEND_API_KEY!);

export const sendEmail = async(email: string)=>{

    const otp = await generateOtp(email);

    await resend.emails.send({
        from :"onboarding@resend.dev",
        to: email,
        subject:"Conform your email",
        html:`<p>Your otp for book application is ${otp}</p>`
    })
}

export const generateOtp = async (email: string) => {
   try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    if(await Otp.findOne({ email })) {
        await Otp.updateOne({ email }, { otp, expiresAt });
    }

    await Otp.create({
        email,
        otp,
        expiresAt
    });
    return otp;
   } catch (error) {
    console.log(error);
   }
}


