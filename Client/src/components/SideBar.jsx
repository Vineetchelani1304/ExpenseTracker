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
        <div className="flex flex-col text-center justify-center items-center">
            <div className="text-4xl font-bold text-blue-600 p-2">Expense Tracker</div>
            <div className="flex flex-col  mt-[10%] gap-4">
                <div
                    className="hover:bg-blue-200 border-slate-400 border-[1px] p-2 px-3 text-center text-slate-800 rounded-lg cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Dashboard
                </div>
                <div
                    className="hover:bg-blue-200 border-slate-400 border-[1px] p-2 text-center text-slate-800 rounded-lg cursor-pointer"
                    onClick={logout}
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default SideBar;
