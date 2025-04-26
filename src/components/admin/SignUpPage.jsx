import React, { useState } from 'react';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // First Name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        // Last Name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        // Confirm Password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically send the form data to your backend
            console.log('Form submitted', formData);
            alert('Sign Up Successful!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-md rounded-lg max-w-md w-full p-8 space-y-6">
                <h2 className="text-center text-3xl font-bold text-gray-800">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                  ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                  ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 
                transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? {' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;