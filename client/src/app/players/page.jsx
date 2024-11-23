'use client';
import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Search,
  Filter,
  Video,
  Calendar,
  Settings,
  LogOut,
  Crosshair,
  Bell,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  BatterySoftware, // for batsman icon
  Target // for bowler icon
} from 'lucide-react';

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);

  // Fetch player data from API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/players');
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-4">
        <div className="mb-8">
          <a href="/">
            <img className="w-32 invert mx-auto" src="/drx.png" alt="DRX Logo" />
          </a>
        </div>
        
        <nav className="space-y-2">
          <a href="/" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </a>
          
          <a href="/players" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white">
            <Users size={20} />
            <span>Players</span>
          </a>
          
          <a href="/analysis" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <Crosshair size={20} />
            <span>Trajectory Analysis</span>
          </a>
          
          <a href="/training-videos" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <Video size={20} />
            <span>Training Videos</span>
          </a>
          
          <a href="/schedule" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <Calendar size={20} />
            <span>Schedule</span>
          </a>
          
          <a href="/settings" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <Settings size={20} />
            <span>Settings</span>
          </a>
          
          <a href="/login" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <LogOut size={20} />
            <span>Logout</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Players Management</h1>
            <p className="text-neutral-400">View and manage all player profiles and analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/notifications" className="p-2 text-neutral-400 hover:text-white transition">
              <Bell size={24} />
            </a>
            <a href="/profile" className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600" />
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search players..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white hover:bg-neutral-800 transition">
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player) => (
            <div key={player.id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition group">
              {/* Player Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={player.photograph} 
                  alt={player.player_name}
                  className="w-full h-full object-cover shadow-none"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 to-transparent" /> */}
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-neutral-800/80 rounded-lg text-neutral-400 hover:text-white transition">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
              
              {/* Player Info Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{player.player_name}</h3>
                  <div className="p-2 bg-neutral-800 rounded-lg">
                    {player.role === "Batsman" ? (
                      <Crosshair size={20} className="text-cyan-500" />
                    ) : (
                      <Target size={20} className="text-blue-500" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Average</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{player.average}</span>
  {Math.round(player.average) % 2 === 0 ? (
    <TrendingUp size={16} className="text-green-500" />
  ) : (
    <TrendingDown size={16} className="text-red-500" />
  )}
</div>

                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Team</span>
                    <span className="text-white font-medium">{player.team}</span>
                  </div>

                  <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Status</span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
    {"Available"}
  </span>
</div>

                  
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
