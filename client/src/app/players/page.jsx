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
  Target,
  ChevronDown,
  Plus,
} from 'lucide-react';

// Custom Role Filter Component
const RoleFilter = ({ selectedRole, onRoleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { id: 'all', label: 'All Roles', icon: <Filter size={16} /> },
    { id: 'batsman', label: 'Batsman', icon: <Crosshair size={16} /> },
    { id: 'bowler', label: 'Bowler', icon: <Target size={16} /> }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-white hover:border-neutral-700 transition-colors focus:outline-none focus:border-cyan-500"
      >
        <Filter size={18} className="text-neutral-400" />
        <span className="text-sm font-medium">
          {roles.find(role => role.id === selectedRole.toLowerCase())?.label || 'All Roles'}
        </span>
        <ChevronDown
          size={16}
          className={`text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 origin-top-right bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg">
          <div className="py-1">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  onRoleChange(role.id === 'all' ? 'All' : role.label);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-4 py-2 text-sm ${
                  selectedRole.toLowerCase() === role.id
                    ? 'bg-cyan-500/10 text-cyan-500'
                    : 'text-white hover:bg-neutral-800'
                } transition-colors`}
              >
                <span className="w-4 h-4">{role.icon}</span>
                <span>{role.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Player Card Component
const PlayerCard = ({ player }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={player.photograph}
          alt={player.player_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 bg-neutral-800/80 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-700/80 transition">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-500 transition">
              {player.player_name}
            </h3>
            <p className="text-sm text-neutral-400">{player.role}</p>
          </div>
          <div className="p-2 bg-neutral-800 rounded-lg">
            {player.role === 'Batsman' ? (
              <Crosshair size={20} className="text-cyan-500" />
            ) : (
              <Target size={20} className="text-blue-500" />
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">Average</span>
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
            <span className="text-sm text-neutral-400">Team</span>
            <span className="text-white font-medium">{player.team}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">Status</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
              Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

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

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.player_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.team.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === 'All' || player.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-4">
        <div className="mb-8">
          <a href="/" className="block">
            <img className="w-32 invert mx-auto" src="/drx.png" alt="DRX Logo" />
          </a>
        </div>

        <nav className="space-y-2">
          {[
            { href: '/', icon: <BarChart3 size={20} />, label: 'Dashboard' },
            { href: '/players', icon: <Users size={20} />, label: 'Players', active: true },
            { href: '/analysis', icon: <Crosshair size={20} />, label: 'Trajectory Analysis' },
            { href: '/training-videos', icon: <Video size={20} />, label: 'Training Videos' },
            { href: '/schedule', icon: <Calendar size={20} />, label: 'Schedule' },
            { href: '/settings', icon: <Settings size={20} />, label: 'Settings' },
            { href: '/login', icon: <LogOut size={20} />, label: 'Logout' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                item.active
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                  : 'text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Players Management</h1>
            <p className="text-neutral-400">
              View and manage all player profiles and analytics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white hover:opacity-90 transition">
              <Plus size={20} />
              <span>Add Player</span>
            </button>
            <a
              href="/notifications"
              className="p-2 text-neutral-400 hover:text-white transition"
            >
              <Bell size={24} />
            </a>
            <a
              href="/profile"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600"
            />
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search players or teams..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <RoleFilter selectedRole={roleFilter} onRoleChange={setRoleFilter} />
          </div>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Users size={48} className="text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No players found</h3>
            <p className="text-neutral-400 text-center max-w-md">
              No players match your current search criteria. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;