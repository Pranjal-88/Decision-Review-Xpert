"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  BarChart3,
  Users,
  Video,
  Calendar,
  Settings,
  LogOut,
  Crosshair,
  Bell,
  PlayCircle,
  StopCircle,
  ArrowUp,
  ArrowDown,
  Check,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const TrainingVideosPage = () => {
  // State management
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Camera handling functions
  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 30 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Failed to access camera. Please ensure camera permissions are granted."
      );
      setIsRecording(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    setFeedback(null);
  };

  // Frame capture and analysis
  const captureAndAnalyzeFrame = async () => {
    if (!videoRef.current || !isRecording || isLoading) return;

    try {
      setIsLoading(true);

      // Capture frame from video
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      // Convert to base64
      const base64Frame = canvas.toDataURL("image/jpeg").split(",")[1];

      // Send to API
      const response = await fetch("http://localhost:5000/api/analyze-pose/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ frame: base64Frame }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setFeedback(data.feedback);
        setError(null);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error in frame analysis:", err);
      setError(
        "Failed to analyze frame. Please check if the server is running."
      );
      setIsRecording(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect for handling recording state
  useEffect(() => {
    let interval;

    if (isRecording) {
      startCamera();
      interval = setInterval(captureAndAnalyzeFrame, 1000); // Analyze every second
    } else {
      stopCamera();
    }

    return () => {
      if (interval) clearInterval(interval);
      stopCamera();
    };
  }, [isRecording]);

  // Feedback handling functions
  const getFeedbackStatus = (angle, type) => {
    if (!angle) return null;

    const ranges = {
      elbow_angle: { low: 80, high: 120 },
      head_angle: { low: 0, high: 45 },
      knee_angle: { low: 150, high: 180 },
    };

    const range = ranges[type];
    if (angle < range.low) return "down";
    if (angle > range.high) return "up";
    return "good";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "up":
        return "bg-red-500";
      case "down":
        return "bg-yellow-500";
      default:
        return "bg-neutral-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "good":
        return <Check className="text-green-500" />;
      case "up":
        return <ArrowUp className="text-red-500" />;
      case "down":
        return <ArrowDown className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white text-center">
            DRX Analytics
          </h1>
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
            className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white"
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
            <h1 className="text-2xl font-bold text-white">Training Videos</h1>
            <p className="text-neutral-400">
              Record and analyze your training sessions
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-neutral-400 hover:text-white transition">
              <Bell size={24} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600" />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2 text-red-500">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Video and Parameters Side by Side */}
        <div className="flex gap-8">
          {/* Video Section */}
          <div className="flex-1 bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Live Feed</h2>
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white transition`}
                disabled={isLoading}
              >
                {isRecording ? (
                  <>
                    <StopCircle size={20} />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <PlayCircle size={20} />
                    <span>Start Recording</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative aspect-video bg-neutral-800 rounded-lg overflow-hidden">
              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-contain bg-neutral-800"
              />
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white">Processing...</div>
                </div>
              )}
            </div>
          </div>

          {/* Parameters Section */}
          <div className="w-80 space-y-6">
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
              <h2 className="text-lg font-semibold text-white mb-6">
                Pose Analysis
              </h2>
              <div className="space-y-6">
                {["elbow_angle", "head_angle", "knee_angle"].map((metric) => {
                  const value = feedback?.[metric];
                  const status = getFeedbackStatus(value, metric);
                  return (
                    <div key={metric} className="bg-neutral-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white capitalize">
                          {metric.replace("_", " ")}
                        </h3>
                        {getStatusIcon(status)}
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-white">
                              {value ? `${value.toFixed(1)}°` : "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-2 overflow-hidden rounded bg-neutral-700">
                          <div
                            className={`${getStatusColor(
                              status
                            )} transition-all duration-500`}
                            style={{
                              width: value ? `${(value / 180) * 100}%` : "0%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingVideosPage;
