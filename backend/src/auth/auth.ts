import { NextFunction, Request, Response } from "express";
import { IUser } from "../schemas/user.schema";
import config from "../config";
import { TryCatch } from "../utils/catchAsyncErrors";
import { CustomJwtPayload, ExtendedRequest } from "../types";
import { User } from "../models/user.model";
import JWT from "jsonwebtoken";

export const sendToken = async (user: IUser, res:Response,statusCode:number) => {
    const token = user.getJWT();
    const options = {
        expires: new Date(Date.now() +(Number(config.COOKIE_EXPIRE)* 24 * 60) * 60 * 1000),
        httpOnly: true
    };

    return res.status(statusCode).cookie("OTP", token, options).json({
        success: true,
    });
}

export const isAuthenticated = TryCatch(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {OTP} = req.cookies;

    if(!OTP) {
        return res.status(401).json({
            success: false,
            message: "Login required"
        });
    }

    const decodedData = JWT.verify(OTP,config.JWT_SECRET) as CustomJwtPayload;


    const user = await User.findById(decodedData.id);

    if(!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    req.user = user;

    next();

});

