'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Lock } from 'lucide-react';

const DRXLogin = () => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!isClient) {
    return null;
  }

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
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
          >
            Login <ChevronRight className="ml-2" />
          </button>
        </form>
        
        <div className="text-center space-y-2 relative z-10">
          <a href="#" className="text-neutral-300 hover:text-cyan-500 text-sm transition">Forgot Password?</a>
          <p className="text-sm text-neutral-400">
            Don't have an account? <a href="/register" className="text-cyan-500 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DRXLogin;
