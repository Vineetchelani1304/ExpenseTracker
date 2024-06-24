import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const SideBar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // toast.success('Logged Out');
        navigate('/login');
    };

    return (
        <div className="flex flex-col">
            <div className="text-4xl font-bold text-blue-600 p-2">Expense Tracker</div>
            <div className="flex flex-col px-4 mt-[10%] gap-4">
                <div 
                    className="hover:bg-blue-200 border-slate-300 border-[1px] bg-blue-300 font-bold text-center p-2 text-slate-800 rounded-lg" 
                    onClick={() => navigate('/')}
                >
                    Dashboard
                </div>
                <div 
                    className="hover:bg-blue-200 font-bold text-center bg-blue-300 border-slate-300 border-[1px] p-2 text-slate-800 rounded-lg" 
                    onClick={logout}
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default SideBar;
