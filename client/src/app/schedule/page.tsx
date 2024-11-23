"use client";
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  BarChart3,
  Video,
  Settings,
  LogOut,
  Crosshair,
  Users,
  Target,
  Bell,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

const SchedulePage = () => {
  const [teamMatches, setTeamMatches] = useState([]);
  const trainingSchedule = [
    {
      id: 1,
      title: "Batting Practice",
      player: "David Warner",
      time: "9:00 AM",
      coach: "Mike Hussey",
      type: "Individual",
      focus: "Power Hitting",
      photoId: "123"
    },
    {
      id: 2,
      title: "Bowling Analysis",
      player: "Pat Cummins",
      time: "11:00 AM",
      coach: "Brett Lee",
      type: "Individual",
      focus: "Speed Training",
      photoId: "456"
    },
    {
      id: 3,
      title: "Fielding Drills",
      player: "Steve Smith",
      time: "2:00 PM",
      coach: "Ricky Ponting",
      type: "Individual",
      focus: "Reflexes",
      photoId: "789"
    }
  ];

  useEffect(() => {
    // Fetch matches from the backend API
    fetch('http://127.0.0.1:8000/matches')
      .then(response => response.json())
      .then(data => setTeamMatches(data))
      .catch(error => console.error('Error fetching matches:', error));
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
          
          <a href="/players" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
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
          
          <a href="/schedule" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white">
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
            <h1 className="text-2xl font-bold text-white">Team Schedule</h1>
            <p className="text-neutral-400">Manage upcoming matches and training sessions</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-neutral-900 rounded-lg p-2">
              <button className="p-1 text-neutral-400 hover:text-white transition">
                <ChevronLeft size={20} />
              </button>
              <span className="text-white px-2">March 2024</span>
              <button className="p-1 text-neutral-400 hover:text-white transition">
                <ChevronRight size={20} />
              </button>
            </div>
            <a href="/notifications" className="p-2 text-neutral-400 hover:text-white transition">
              <Bell size={24} />
            </a>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600" />
          </div>
        </div>

        {/* Team Matches Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Team Matches</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white text-sm">
              Add Match
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMatches.map((match) => (
              <div key={match.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition">
                <div className="flex items-center justify-between mb-4">
                <img 
                    src={match.team_logo} 
                    alt={match.team_name}
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-800"
                  />
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                    {match.format}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">vs {match.team_name}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-neutral-400">{match.date} at {match.time}</p>
                  <p className="text-neutral-400">{match.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Training Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Individual Training</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white text-sm">
              Schedule Training
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingSchedule.map((session) => (
              <div key={session.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={`/api/placeholder/64/64/${session.photoId}`} 
                      alt={session.player}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white">{session.player}</h3>
                      <p className="text-sm text-neutral-400">{session.title}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500">
                    {session.focus}
                  </span>
                </div>
                <div className="space-y-3 text-sm mt-4">
                  <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Target size={16} className="text-purple-500" />
                      <span className="text-neutral-400">Coach</span>
                    </div>
                    <span className="text-white">{session.coach}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-purple-500" />
                      <span className="text-neutral-400">Time</span>
                    </div>
                    <span className="text-white">{session.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;