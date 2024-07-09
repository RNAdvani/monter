import mongoose from "mongoose";

export interface IBook extends Document{
    title: string;
    author: string;
    description: string;
    genre: string;
    reviews: string[];
    addedBy: mongoose.Schema.Types.ObjectId;
}
