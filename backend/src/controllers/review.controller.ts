import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types";
import { TryCatch } from "../utils/catchAsyncErrors";
import { Review } from "../models/review.model";

export const addReview = TryCatch(async (req:ExtendedRequest, res:Response, next:NextFunction) => {

    const { rating, review, bookId } = req.body;

    await Review.create({
        bookId,
        user: req.user._id,
        rating,
        review
    });

    return res.status(200).json({
        success: true,
        message: 'Review added successfully'
    })
});