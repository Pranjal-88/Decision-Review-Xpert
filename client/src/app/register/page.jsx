'use client';

import React from 'react';
import { ChevronRight, User, Lock, Mail, AlertCircle } from 'lucide-react';

const DRXSignup = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error message when user starts typing again
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Password strength validation (at least 8 characters)
  
    try {
      const response = await fetch("https://api.drx.rebec.in/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const json = await response.json();
  
      if (response.ok) {
        window.location.href = '/login';
      } else {
        setErrorMessage(json.error || 'Username already taken');
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

        <div className="text-center relative z-10">
          <div className="flex justify-center items-center mb-4">
            <img className="w-40 invert" src="/drx.png" alt="logo" />
          </div>
          <p className="text-neutral-400 mt-2">AI-Powered Cricket Performance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {errorMessage && (
            <div className="flex items-center p-4 text-red-400 bg-red-950/50 border border-red-900 rounded-lg animate-fadeIn">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="ml-2">{errorMessage}</span>
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
          >
            Sign Up <ChevronRight className="ml-2" />
          </button>
        </form>
        
        <div className="text-center space-y-2 relative z-10">
          <p className="text-sm text-neutral-400">
            Already have an account? <a href="/login" className="text-cyan-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DRXSignup;