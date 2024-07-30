import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const SideBar = () => {
    const navigate = useNavigate();
    const [burger, setBurger] = useState(false);
    const token = localStorage.getItem('token');

    const toggleBurger = () => {
        setBurger(!burger);
    };

    return (
        <div className="relative flex">
            {/* Burger icon for small screens */}
            <div className="lg:hidden m-1">
                <FaBars className="text-3xl cursor-pointer" onClick={toggleBurger} />
            </div>
            
            {/* Sidebar */}
            <div className={`fixed lg:relative z-10 top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transition-transform duration-300 ${burger ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="text-4xl font-bold text-blue-600 p-2">Expense Tracker</div>
                <div className="flex flex-col mt-10 gap-4">
                    <div
                        className="hover:bg-blue-200 border-slate-400 border-[1px] p-2 px-3 text-center text-slate-800 rounded-lg cursor-pointer"
                        onClick={() => token ? navigate('/userExpenses') : navigate('/login')}
                    >
                        Dashboard
                    </div>
                </div>
            </div>

            {/* Content Overlay */}
            {burger && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleBurger}></div>}
        </div>
    );
};

export default SideBar;
