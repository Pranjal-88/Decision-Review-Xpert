'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  Users,
  TrendingUp,
  Activity,
  Video,
  Calendar,
  Award,
  Settings,
  LogOut,
  Crosshair,
  Target,
  LineChart,
  PlayCircle,
  Bell
} from 'lucide-react';

const DRXDashboard = () => {
  const [recentMatches, setRecentMatches] = useState([]);
  const [upcomingTraining, setUpcomingTraining] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get random items
  const getRandomItems = (data, count) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Replace with actual API endpoints
        const [playersResponse, trainingResponse] = await Promise.all([
            fetch("https://api.drx.rebec.in/players"),
            fetch("https://api.drx.rebec.in/training"),
        ]);

        const playersData = await playersResponse.json();
        const trainingData = await trainingResponse.json();

        // Randomly select 3 items from each
        setRecentMatches(getRandomItems(playersData, 1));
        setUpcomingTraining(getRandomItems(trainingData, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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
          <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white">
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </a>
          
          <a href="/main-video" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <Video size={20} />
            <span>Training Videos</span>
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
            <h1 className="text-2xl font-bold text-white">Welcome back Player</h1>
            <p className="text-neutral-400">Here's what's happening with your team today</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/notifications" className="p-2 text-neutral-400 hover:text-white transition">
              <Bell size={24} />
            </a>
            <a href="/profile" className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <a href="/stats/accuracy" className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-cyan-500" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">87%</h3>
            <p className="text-neutral-400">Average Accuracy</p>
          </a>

          <a href="/stats/prediction" className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Target className="h-6 w-6 text-blue-500" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">92%</h3>
            <p className="text-neutral-400">Prediction Rate</p>
          </a>

          <a href="/players/active" className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">24</h3>
            <p className="text-neutral-400">Active Players</p>
          </a>

          <a href="/training/sessions" className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <Award className="h-6 w-6 text-pink-500" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">156</h3>
            <p className="text-neutral-400">Training Sessions</p>
          </a>
        </div>

        {/* Recent Activity and Training Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Matches */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Analysis</h2>
              {/* <a href="/players" className="text-cyan-500 hover:underline text-sm">View All</a> */}
            </div>
            <div className="space-y-4">
              {loading ? (
                <p className="text-neutral-400">Loading...</p>
              ) : recentMatches.length > 0 ? (
                recentMatches.map((match) => (
                  <a 
                    href={`/analysis/${match.id}`} 
                    key={match.id} 
                    className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg hover:bg-neutral-700/50 transition"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Model Image */}
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={match.photograph} 
                          alt={`${match.player_name} Model`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-medium">{match.player_name}</p>
                        <p className="text-neutral-400 text-sm">{match.team}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{match.average}</p>
                      <p className="text-sm text-neutral-400">{match.role}</p>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-neutral-400">No recent analysis found.</p>
              )}
            </div>
          </div>

          {/* Training Schedule */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Upcoming Training</h2>
              {/* <a href="/schedule" className="text-cyan-500 hover:underline text-sm">View Schedule</a> */}
            </div>
            <div className="space-y-4">
              {loading ? (
                <p className="text-neutral-400">Loading...</p>
              ) : upcomingTraining.length > 0 ? (
                upcomingTraining.map((session) => (
                  <a 
                    href={`/training/${session.id}`} 
                    key={session.id} 
                    className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg hover:bg-neutral-700/50 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                        <Target size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{session.remark}</p>
                        <p className="text-neutral-400 text-sm">{session.time}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-500">
                      {session.date}
                    </span>
                  </a>
                ))
              ) : (
                <p className="text-neutral-400">No upcoming training sessions.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRXDashboard;