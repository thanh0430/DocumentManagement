import React, { useState } from 'react';
import UseCustomerService from "../hooks/UseCustomerService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { loginCustomer } = UseCustomerService();
    const [inputValue, setInputValue] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // Thêm state cho loading
    const navigate = useNavigate();

    const onInputChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value });
    };

    const handleLogin = async () => {
        const { email, password } = inputValue;
    
        if (!email || !password) {
            setErrorMessage('Vui lòng nhập đầy đủ email và password.');
            return;
        }   
    
        setErrorMessage(''); 
        setLoading(true); 
    
        try {
            const result = await loginCustomer(inputValue); 
            console.log("login result:", result); 
    
            if (result.statusCode === 201) {
                localStorage.setItem('token', result.data);
                navigate('/'); 
            } else {
                setErrorMessage(result.message || 'Đăng nhập thất bại.'); 
            }
        } catch (error) {
            console.error("Login error:", error); // Log lỗi
            setErrorMessage('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'); 
        } finally {
            setLoading(false); 
        }
    };    

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Đăng Nhập</h1>
                        </div>
                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="email"
                                        name="email"
                                        type="text"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Email address"
                                        value={inputValue.email}
                                        onChange={onInputChange}
                                    />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Password"
                                        value={inputValue.password}
                                        onChange={onInputChange}
                                    />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={handleLogin}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                        disabled={loading} // Disable button khi đang loading
                                    >
                                        {loading ? 'Đang Đăng Nhập...' : 'Đăng Nhập'} {/* Thay đổi text khi loading */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
