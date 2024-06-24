import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleShow = ()=>{
        setShowPassword((prev)=>!prev)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', formData);
            if (response.data.success) {
                console.log("token", response.data.token)
                localStorage.setItem('token', response.data.token);
                navigate('/userExpenses');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                        <div onClick={handleShow} className=' border-[1px] w-fit mt-2 bg-indigo-600 text-white font-semibold  border-slate-400 p-1 rounded-md hover:scale-105'>{showPassword ? "hide" : "show"}</div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
