import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex flex-col">
            <div className="text-4xl font-bold text-blue-600 p-2">Expense Tracker</div>
            <div className="flex flex-col px-4 mt-[10%] gap-4">
                <div className="relative">
                    <div
                        className="hover:bg-blue-200 border-slate-300 border-[1px] bg-blue-300 font-bold text-center p-2 text-slate-800 rounded-lg cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        Menu
                    </div>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-300">
                            <div
                                className="hover:bg-blue-200 border-slate-300 border-[1px] p-2 text-center text-slate-800 rounded-t-lg cursor-pointer"
                                onClick={() => navigate('/')}
                            >
                                Dashboard
                            </div>
                            <div
                                className="hover:bg-blue-200 border-slate-300 border-[1px] p-2 text-center text-slate-800 rounded-b-lg cursor-pointer"
                                onClick={logout}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
