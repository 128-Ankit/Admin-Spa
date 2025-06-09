import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_URL

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'admin'
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (errors.contact && (name === 'email' || name === 'phoneNumber')) {
            setErrors(prev => ({ ...prev, contact: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!formData.email.trim() && !formData.phoneNumber.trim()) {
            newErrors.contact = 'Either email or phone number is required';
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        setErrors({});
        setSuccessMessage('');

        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);

                setSuccessMessage(response.data?.message || 'Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    console.log('Would navigate to login page');
                }, 1500);

                setTimeout(() => {
                    navigate('/login'); 
                }, 3000); // Clear success message after 3 seconds

            } catch (error) {
                const message = error.response?.data?.message || 'Registration failed';
                setServerError(message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-blue-100/20 flex items-center justify-center px-4 py-8">
            <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-2xl max-w-lg w-full p-8 space-y-6 border border-white/30">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #2563eb, #1e40af)' }}>
                        Create Account
                    </h2>
                </div>

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{successMessage}</span>
                    </div>
                )}

                {serverError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm">{serverError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" name="username" value={formData.username} onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white/50 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.username ? 'border-red-300 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'}`} placeholder="Enter username" />
                            </div>
                            {errors.username && <p className="text-red-500 text-xs flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.username}</span></p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white/50 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.email ? 'border-red-300 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'}`} placeholder="your@email.com" />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.email}</span></p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white/50 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.phoneNumber ? 'border-red-300 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'}`} placeholder="+91 xxxxxxxxxx" />
                            </div>
                            {errors.phoneNumber && <p className="text-red-500 text-xs flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.phoneNumber}</span></p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-xl bg-white/50 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.password ? 'border-red-300 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'}`} placeholder="Create password" />
                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.password}</span></p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Role</label>
                        <div className="relative">
                            <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select name="role" value={formData.role} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all duration-200 bg-white/50 hover:border-gray-300">
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full text-white py-3 rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600/20 disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)' }}>
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : 'Create Account'}
                    </button>
                </form>

                <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button className="font-semibold hover:underline transition-colors" style={{ color: '#2563eb' }}>Sign in instead</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
