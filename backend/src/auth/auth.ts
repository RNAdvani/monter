import { NextFunction, Request, Response } from "express";
import { IUser } from "../schemas/user.schema";
import config from "../config";
import { TryCatch } from "../utils/catchAsyncErrors";
import { ExtendedRequest } from "../types";
import { User } from "../models/user.model";

export const sendToken = async (user: IUser, res:Response,statusCode:number) => {
    const token = user.getJWT();
    const options = {
        expires: new Date(Date.now() + statusCode===200?(Number(config.COOKIE_EXPIRE)* 24 * 60):Number(config.OTP_EXPIRE) * 60 * 1000),
        httpOnly: true
    };

    res.status(statusCode).cookie(statusCode===200?"token":"OTP", token, options).json({
        success: true,
        user,
        token
    });

    return token;
}

export const isAuthenticated = TryCatch(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {token} = req.cookies;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Login required"
        });
    }

    const user = await User.findById(token.id);

    if(!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    req.user = user;

    next();

});

