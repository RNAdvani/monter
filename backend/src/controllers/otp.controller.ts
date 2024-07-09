import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { TryCatch } from "../utils/catchAsyncErrors";
import { Otp } from "../models/otp.model";
import { sendToken } from "../auth/auth";
import JWT, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { CustomJwtPayload } from "../types";

export const verifyOtp = TryCatch(async (req:Request, res:Response, next:NextFunction) => { 
    const { otp } = req.body;

    
    const {OTP} = req.cookies
    
    const decodedData = JWT.verify(OTP,config.JWT_SECRET) as CustomJwtPayload;

    if(!OTP) {
        return res.status(400).json({
            success: false,
            message: "OTP not sent"
        });
    }

    ;

    const email = decodedData["email"]

    const otpDoc = await Otp.findOne({ email,otp });

    if(!otpDoc) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }

    await User.updateOne({ email }, { isVerified: new Date() });

    const user = await User.findOne({ email
    });

   await sendToken(user!,res,201);
}
);