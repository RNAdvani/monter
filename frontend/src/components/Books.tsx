import React from 'react'
import Book from './BookComponent'
import Header from './Header'

interface BookData {
    _id: string;
    title: string;
    author: string;
    description: string;
    genre: string;
}


import axios from 'axios';

const Books = () => {
    const [books, setBooks] = React.useState<BookData[]>([]);

    React.useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/book/all', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setBooks(response.data.book);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    

    return (
        <div className='flex flex-col gap-4 '>
            <Header />
            {
               books && books.map((book) => (
                        <Book
                            bookId={book._id.toString()}
                            key={book._id }
                            title={book.title}
                            author={book.author}
                            description={book.description}
                            genre={book.genre}
                        />
                ))
            }
        </div>
    );
}

export default Books