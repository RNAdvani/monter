import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../utils/catchAsyncErrors";
import { Book } from "../models/book.model";

export const addBook = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, description, genre } = req.body;

    const book = await Book.create({
        title,
        author,
        description,
        genre
    });

    return res.status(201).json({
        success: true,
        book
    });
});

export const getAllBooks = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.find();

    return res.status(200).json({
        success: true,
        book
    });
});

export const getSingleBook = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.bookId);

    if(!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    return res.status(200).json({
        success: true,
        book
    });

});