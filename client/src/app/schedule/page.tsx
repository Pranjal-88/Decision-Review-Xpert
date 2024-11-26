"use client";
import React, { useState, useEffect } from "react";
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
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";

const SchedulePage = () => {
  const [teamMatches, setTeamMatches] = useState([]);
  const [trainingSchedule, setTraining] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/matches")
      .then((response) => response.json())
      .then((data) => setTeamMatches(data))
      .catch((error) => console.error("Error fetching matches:", error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/training")
      .then((response) => response.json())
      .then((data) => setTraining(data))
      .catch((error) => console.error("Error fetching matches:", error));
  }, []);

  // Function to get format-specific colors
  const getFormatColor = (format) => {
    switch (format.toLowerCase()) {
      case "t20":
        return "bg-green-500/10 text-green-500";
      case "test":
        return "bg-red-500/10 text-red-500";
      case "odi":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-blue-500/10 text-blue-500";
    }
  };

  // Function to get role-specific border color
  const getRoleColors = (role) => {
    return role === "Bowler"
      ? {
          border: "border-green-500",
          icon: "text-green-500",
          badge: "bg-green-500/10 text-green-500",
        }
      : {
          border: "border-purple-500",
          icon: "text-purple-500",
          badge: "bg-purple-500/10 text-purple-500",
        };
  };

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
            className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white"
          >
            <Calendar size={20} />
            <span>Schedule</span>
          </a>

          <a
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition"
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
            <h1 className="text-2xl font-bold text-white">Team Schedule</h1>
            <p className="text-neutral-400">
              Manage upcoming matches and training sessions
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-neutral-900 rounded-lg p-2">
              <button className="p-1 text-neutral-400 hover:text-white transition">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 text-neutral-400 hover:text-white transition">
                <ChevronRight size={20} />
              </button>
            </div>
            <a
              href="/notifications"
              className="p-2 text-neutral-400 hover:text-white transition"
            >
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
              <div
                key={match.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={match.team_logo}
                    alt={match.team_name}
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-800"
                  />
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getFormatColor(
                      match.format
                    )}`}
                  >
                    {match.format}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  vs {match.team_name}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-neutral-400">
                    {match.date} at {match.time}
                  </p>
                  <p className="text-neutral-400">{match.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Training Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              Individual Training
            </h2>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white text-sm">
              Schedule Training
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingSchedule.map((session) => {
              const roleColors = getRoleColors(session.player.role);

              return (
                <div
                  key={session.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-800 transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://127.0.0.1:8000/${session.player.photograph}`}
                        alt={session.player.player_name}
                        className={`w-12 h-12 rounded-full object-cover border-2 ${roleColors.border}`}
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {session.player.player_name}
                        </h3>
                        <p className="text-sm text-neutral-400">
                          {session.player.role}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors.badge}`}
                    >
                      {session.remark}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm mt-4">
                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Target size={16} className={roleColors.icon} />
                        <span className="text-neutral-400">Coach</span>
                      </div>
                      <span className="text-white">
                        {session.player.role === "Batsman"
                          ? "Ravi Shastri"
                          : "Dale Steyn"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className={roleColors.icon} />
                        <span className="text-neutral-400">Date</span>
                      </div>
                      <span className="text-white">{session.date}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className={roleColors.icon} />
                        <span className="text-neutral-400">Time</span>
                      </div>
                      <span className="text-white">{session.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
