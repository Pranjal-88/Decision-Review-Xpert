"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Settings,
  LogOut,
  Crosshair,
  Users,
  Calendar,
  Target,
  Bell,
  ChevronLeft,
  ChevronRight,
  BarChart3
} from 'lucide-react';

const TrainingVideosPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    initCamera();
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Add recording logic here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Add stop recording logic here
  };

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
          
          <a href="/analysis" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white">
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
            <h1 className="text-2xl font-bold text-white">Game Analysis</h1>
            <p className="text-neutral-400">Record and analyze your cricket techniques</p>
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
            <a href="/notifications" className="p-2 text-neutral-400 hover:text-white transition">
              <Bell size={24} />
            </a>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600" />
          </div>
        </div>

        {/* Video Feed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Feed */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Live Feed</h2>
              <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`px-6 py-2 rounded-lg text-white text-sm ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                  } transition`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Panel */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Real-time Feedback</h2>
              <div className="space-y-4">
                {/* Feedback items will be populated here */}
                <div className="p-4 bg-neutral-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400">Elbow Angle</span>
                    <span className="text-green-500">Correct</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400">Head Position</span>
                    <span className="text-yellow-500">Adjust Slightly</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400">Knee Bend</span>
                    <span className="text-green-500">Perfect</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingVideosPage;