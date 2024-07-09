import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../utils/catchAsyncErrors";
import { User } from "../models/user.model";
import { generateOtp } from "../actions/otp.action";
import { sendToken } from "../auth/auth";
import { ExtendedRequest } from "../types";

export const registerUser = TryCatch(async (req:Request, res:Response, next:NextFunction) => {
    const { email, password,username } = req.body;

    const user = await User.create({
        email,
        password,
        username
    });

    await generateOtp(email);

    await sendToken(user, res, 201);
});

export const loginUser = TryCatch(async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    } 

    if(!user.isVerified){
        return res.status(400).json({
            success: false,
            message: "Email not verified"
        });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    await sendToken(user, res, 200);
});

export const completeProfile = TryCatch(async (req:ExtendedRequest, res:Response, next:NextFunction) => {

    const {userlocation,dob,work,bio} = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, {
        userlocation,
        dob,
        work,
        bio
    }, { new: true });

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: user
    });

});


export const getUserProfile = TryCatch(async (req:ExtendedRequest, res:Response, next:NextFunction) => {
    const user = await User.findById(req.user.id);

    return res.status(200).json({
        success: true,
        data: user
    });

}
);