import mongoose from "mongoose";

export interface IReview extends Document{
    bookId: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    rating: number;
    review: string;
}