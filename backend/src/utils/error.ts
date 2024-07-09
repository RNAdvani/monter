import { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error{
    constructor(message:string,public statusCode:number){
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.constructor)
    }
}

export const errorHandler = (err: ErrorHandler, req:Request,res:Response,next:NextFunction) => {
    err.statusCode ||=  500;
    err.message  ||= "Internal Server Error";

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    });
}