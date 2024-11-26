import React from "react";
import {
  BarChart3,
  Users,
  Settings,
  LogOut,
  Crosshair,
  Video,
  Calendar,
  Bell,
  User,
  Lock,
  Globe,
  Eye,
  Palette,
  Monitor,
} from "lucide-react";
import Link from "next/link";

const DRXSettings = () => {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-4">
        <div className="mb-8">
          <Link href="/">
            <img
              className="w-32 invert mx-auto"
              src="/drx.png"
              alt="DRX Logo"
            />
          </Link>
        </div>

        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition"
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </Link>

          <a
            href="/players"
            className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition"
          >
            <Users size={20} />
            <span>Players</span>
          </a>

          {/* <a href="/analysis" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <Crosshair size={20} />
            <span>Trajectory Analysis</span>
          </a> */}

          <a
            href="/training-videos"
            className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition"
          >
            <Video size={20} />
            <span>Training Videos</span>
          </a>

          <a
            href="/schedule"
            className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition"
          >
            <Calendar size={20} />
            <span>Schedule</span>
          </a>

          <a
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white"
          >
            <Settings size={20} />
            <span>Settings</span>
          </a>

          <a
            href="/login"
            className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition"
          >
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
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-neutral-400">
              Manage your account and preferences
            </p>
          </div>
          <div className="flex items-center space-x-4">
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

        {/* Settings Sections */}
        <div className="grid grid-cols-1 gap-6">
          {/* Profile Settings */}
          {/* <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-cyan-500" />
              <h2 className="text-xl font-bold text-white">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Role</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white"
                  placeholder="Your role"
                />
              </div>
            </div>
          </div> */}

          {/* Security Settings */}
          {/* <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Current Password</label>
                <input 
                  type="password" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">New Password</label>
                <input 
                  type="password" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div> */}

          {/* Preferences */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Monitor className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-bold text-white">Preferences</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Language
                </label>
                <select className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Time Zone
                </label>
                <select className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white">
                  <option>UTC (GMT+0)</option>
                  <option>EST (GMT-5)</option>
                  <option>PST (GMT-8)</option>
                  <option>IST (GMT+5:30)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Theme
                </label>
                <select className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white">
                  <option>Dark (Default)</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="h-6 w-6 text-pink-500" />
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-sm text-neutral-400">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Push Notifications</p>
                  <p className="text-sm text-neutral-400">
                    Receive browser notifications
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Update Notifications</p>
                  <p className="text-sm text-neutral-400">
                    Get notified about system updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRXSettings;
