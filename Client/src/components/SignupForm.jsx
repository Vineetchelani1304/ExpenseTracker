import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../utils/backendUrl';

const Signup = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirm,setShowConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const handleShowConfirm = ()=>{
        setShowConfirm((prev)=>!prev)
    }
    const handleclick = ()=>{
        navigate('/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            console.log("formData", formData)

            console.log("backend url", BACKEND_URL)
            const response = await axios.post(`${BACKEND_URL}/signup`, formData);
            if (response.data.success) {
                navigate('/login');
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
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
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
                            type={showPassword ?"text":"password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                        <div onClick={handleShow} className=' border-[1px] w-fit mt-2 bg-indigo-600 font-semibold text-white border-slate-400 hover:cursor-pointer p-1 rounded-md hover:scale-105'>{showPassword ? "hide" : "show"}</div>

                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                        <input
                            type={showConfirm ?"text":"password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                        <div onClick={handleShowConfirm} className=' border-[1px] w-fit mt-2 bg-indigo-600 font-semibold text-white border-slate-400 p-1 rounded-md hover:scale-105 hover:cursor-pointer'>{showConfirm ? "hide" : "show"}</div>

                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className=" underline text-blue-600 hover:cursor-pointer" onClick={handleclick}>Already have an account!</p>
            </div>
            
        </div>
    );
};

export default Signup;
