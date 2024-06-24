import React, { useState } from 'react';

const Navbar = () => {
    const [showUserDetails, setShowUserDetails] = useState(false);

    // Mock user data extraction from token (you may need to parse your actual token structure)
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : { email: 'user@example.com', name: 'John Doe' };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page or any other page
    };

    

    return (
        <div className=" flex h-[40px] items-center justify-end border-slate-400 relative ml-[20%]">
            <div
                className="bg-blue-600 justify-center rounded-full w-fit font-semibold p-1 px-2 hover:scale-105 text-white hover:cursor-pointer"
                onClick={() => setShowUserDetails(!showUserDetails)}
            >
                user
            </div>
            {showUserDetails && (
                <div className="absolute z-10 top-[50px] right-0 bg-white border border-slate-400 rounded-lg shadow-lg p-4">
                    <p className="text-black font-semibold">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                    <div className="flex justify-end">
                        <button
                            className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
