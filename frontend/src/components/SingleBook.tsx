
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string
}

interface Review {
    bookId: string;
    rating: number;
    review: string;
    // Add more properties as needed
}


const SingleBook = () => {
    const {bookId} = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/book/single/${bookId}`,{
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.data.book;
                console.log(data);
                setBook(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookData();
    }, [bookId]);

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Post the review to the server
        const review: Review = {
            bookId: bookId!,
            rating: rating!,
            review: comment
        };
        console.log(review)
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/review/add`, review ,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.data;
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
        <div className='p-8'>
           
            <h1 className="text-3xl font-bold mb-4">Title: {book.title}</h1>
            <p className="text-lg">Author: {book.author}</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Review</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label className="flex flex-col">
                    <span className="text-lg">Rating:</span>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating!}
                        onChange={handleRatingChange}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="text-lg">Comment:</span>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Submit Review
                </button>
            </form>
        </div>
        </div>
    );
};

export default SingleBook;