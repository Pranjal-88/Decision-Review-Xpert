"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Video, Settings, LogOut, Crosshair, Users,
  Calendar, Bell, ChevronLeft, ChevronRight, BarChart3,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/analyze-pose/";

const TrainingVideosPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [apiStatus, setApiStatus] = useState({ status: 'idle', error: null });
  const [feedback, setFeedback] = useState({
    knee: { status: "Not detected", percentage: 0 },
    elbow: { status: "Not detected", percentage: 0 },
    headPosition: { status: "Not detected", percentage: 0 },
  });
  const [mediaStream, setMediaStream] = useState(null);
  const analysisIntervalRef = useRef();

  useEffect(() => {
    checkApiConnection();
    initCamera();
    return cleanup;
  }, []);

  const checkApiConnection = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'OPTIONS',
      });
      console.log('API Connection test:', response.ok ? 'Success' : 'Failed');
      setApiStatus({ status: response.ok ? 'connected' : 'error', error: null });
    } catch (error) {
      console.error('API Connection test failed:', error);
      setApiStatus({ 
        status: 'error', 
        error: `Cannot connect to API at ${API_URL}. Make sure the Flask server is running.`
      });
    }
  };

  const cleanup = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
    }
    setIsRecording(false);
  };

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 30 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          initCanvas();
        };
      }
    } catch (err) {
      console.error("Camera initialization error:", err);
      setApiStatus({ 
        status: 'error', 
        error: `Camera access error: ${err.message}` 
      });
    }
  };

  const initCanvas = () => {
    if (canvasRef.current && videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      canvasRef.current.width = videoWidth || 640;
      canvasRef.current.height = videoHeight || 480;
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) {
      console.log('Video ref not ready');
      return null;
    }
    
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        console.log('Frame captured successfully');
        return dataUrl;
      } catch (error) {
        console.error('Frame capture error:', error);
        return null;
      }
    } else {
      console.log('Video not ready');
      return null;
    }
  };

  const analyzePose = async (frameData) => {
    if (!frameData) {
      console.error('No frame data to send to API');
      return;
    }
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ frame: frameData }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Response:', data);
      
      // Update the feedback state with the API response data
      updateFeedback({
        knee_angle: data.knee_angle,
        elbow_angle: data.elbow_angle,
        head_angle: data.head_position // Assuming this is the correct field name from your API
      });

      // If you have annotated frame data from the API, update the canvas
      if (data.annotated_frame) {
        updateCanvas(data.annotated_frame);
      }
    } catch (error) {
      console.error('API Error:', error);
      setApiStatus({ status: 'error', error: error.message });
    }
  };

  const getFeedbackStatus = (angle, min, max) => {
    if (angle === null || angle === undefined) return "Not detected";
    
    // Add a small tolerance range (e.g., ±10 degrees) for "Correct" status
    const tolerance = 10;
    const targetRange = (max - min) / 2 + min; // Middle of the range
    
    if (Math.abs(angle - targetRange) <= tolerance) {
      return "Correct";
    } else if (angle < targetRange) {
      return "Adjust Higher";
    } else {
      return "Adjust Lower";
    }
  };

  const calculatePercentage = (value, min, max) => {
    if (value === null || value === undefined) return 0;
    
    // Normalize the value to a percentage
    const range = max - min;
    const adjustedValue = Math.min(Math.max(value, min), max);
    return Math.round(((adjustedValue - min) / range) * 100);
  };

  const updateFeedback = (feedbackData) => {
    // Define target ranges for each measurement
    const ranges = {
      knee: { min: 150, max: 180 },    // Typical range for knee extension
      elbow: { min: 0, max: 90 },      // Typical range for elbow flexion
      head: { min: -30, max: 30 }      // Typical range for head position (degrees from vertical)
    };

    setFeedback({
      knee: {
        status: getFeedbackStatus(feedbackData.knee_angle, ranges.knee.min, ranges.knee.max),
        percentage: calculatePercentage(feedbackData.knee_angle, ranges.knee.min, ranges.knee.max)
      },
      elbow: {
        status: getFeedbackStatus(feedbackData.elbow_angle, ranges.elbow.min, ranges.elbow.max),
        percentage: calculatePercentage(feedbackData.elbow_angle, ranges.elbow.min, ranges.elbow.max)
      },
      headPosition: {
        status: getFeedbackStatus(feedbackData.head_angle, ranges.head.min, ranges.head.max),
        percentage: calculatePercentage(feedbackData.head_angle, ranges.head.min, ranges.head.max)
      }
    });
  };

  const startRecording = () => {
    setIsRecording(true);
    setApiStatus({ status: 'recording', error: null });
    
    // Run analysis every 500ms
    analysisIntervalRef.current = setInterval(() => {
      const frameData = captureFrame();
      if (frameData) {
        analyzePose(frameData);  // Pass the captured frame to the API
      }
    }, 500);
  };
  

  const stopRecording = () => {
    setIsRecording(false);
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
    }
    setApiStatus({ status: 'idle', error: null });
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
          
          <a href="/analysis" className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 rounded-lg transition">
            <Crosshair size={20} />
            <span>Trajectory Analysis</span>
          </a>
          
          <a href="/training-videos" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Feed */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Live Feed</h2>
                <div className="text-sm">
                  {apiStatus.status === 'connected' && (
                    <span className="text-green-500">API Connected</span>
                  )}
                  {apiStatus.status === 'error' && (
                    <span className="text-red-500">API Error</span>
                  )}
                </div>
              </div>
              
              <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
                <canvas 
                  ref={canvasRef} 
                  className="absolute top-0 left-0 w-full h-full"
                />
                {apiStatus.error && (
                  <div className="absolute top-0 left-0 right-0 bg-red-500/80 text-white p-2 text-sm">
                    {apiStatus.error}
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={apiStatus.status === 'error'}
                  className={`px-6 py-2 rounded-lg text-white text-sm ${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600" 
                      : apiStatus.status === 'error'
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  } transition`}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Panel */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Real-time Feedback</h2>
              <div className="space-y-4">
                {Object.entries(feedback).map(([key, value]) => (
                  <div key={key} className="p-4 bg-neutral-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-neutral-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span
                        className={`${
                          value.status === "Correct" ? "text-green-500" : 
                          value.status === "Not detected" ? "text-red-500" : "text-yellow-500"
                        }`}
                      >
                        {value.status}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          value.status === "Correct" ? "bg-green-500" : 
                          value.status === "Not detected" ? "bg-red-500" : "bg-yellow-500"
                        }`}
                        style={{ width: `${value.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingVideosPage;