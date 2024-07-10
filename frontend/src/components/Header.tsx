import React from 'react';
import axios from 'axios';

const Header: React.FC = () => {

    const handleLogout = async () => {
        try {
            // Make a request to logout endpoint using Axios
            await axios.get('http://localhost:3000/api/v1/user/logout',{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
            }});
            // Redirect or perform any other action after successful logout
            // For example, you can redirect to the login page
            window.location.href = '/login';
        } catch (error) {
            // Handle error if logout request fails
            console.error('Logout failed', error);
        }
    };

    return (
        <header className="bg-[#bf84c4] py-4">
            <nav className="container mx-auto flex gap-2 justify-between items-center">
                <div className="text-white text-2xl font-bold">Bookiophile</div>
                <div className="flex space-x-4 w-full justify-start">
                    <a href="/books" className="text-white hover:text-gray-300">Books</a>
                    <a href="/dashboard" className="text-white hover:text-gray-300">Dashboard</a>
                </div>
                <button className="text-white hover:text-gray-300" onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;