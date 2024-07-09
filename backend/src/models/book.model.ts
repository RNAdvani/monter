import { model, Schema } from "mongoose";
import { IBook } from "../schemas/book.schema";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    author: {
        type: String,
        required: [true, "Please provide an author"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"]
    },
    genre: {
        type: String,
        required: [true, "Please provide a genre"]
    }
});

export const Book = model<IBook>("Book", bookSchema);

