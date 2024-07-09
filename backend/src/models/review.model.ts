import { model, Schema } from "mongoose";
import { IReview } from "../schemas/review.schema";

const reviewSchema = new Schema<IReview>({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Please provide a book"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user"]
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating"]
    },
    review: {
        type: String,
        required: [true, "Please provide a review"]
    }
});


export const Review = model<IReview>("Review", reviewSchema);