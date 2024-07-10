import React from 'react';
import { useNavigate } from 'react-router-dom';

type BookProps = {
    title: string;
    author: string;
    description: string;
    genre: string;
    bookId: string;
};

const Book: React.FC<BookProps> = ({ title, author, description, genre, bookId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/books/${bookId}`);
    };

    return (
        <div onClick={handleClick} className="max-w-sm mx-auto cursor-pointer bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img

                        className="h-48 w-full object-cover md:w-48"
                        src={`https://via.placeholder.com/150?text=${title}`}
                        alt={title}
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {genre}
                    </div>
                    <p
                        className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                        
                    >
                        {title}
                    </p>
                    <p className="mt-2 text-gray-500">{description}</p>
                    <p className="mt-4 text-gray-700 font-bold">{author}</p>
                </div>
            </div>
        </div>
    );
};

export default Book;

