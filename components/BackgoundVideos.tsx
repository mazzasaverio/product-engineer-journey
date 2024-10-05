"use client";

// components/BackgroundVideo.tsx
import React, { useState, useEffect } from "react";

const BackgroundVideo = ({ children }: { children: React.ReactNode }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = [
    "videos/35259-407130709_tiny.mp4",
    "videos/184479-873483949_tiny.mp4",
    "videos/224512_tiny.mp4",
    "videos/126928-737187461_tiny.mp4",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => {
        if (prevIndex === videos.length - 1) {
          return 0; // Torna al primo video
        }
        return prevIndex + 1;
      });
    }, 5000); // Cambia video ogni 3 secondi

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <video
        key={currentVideoIndex} // Chiave unica per forzare il ricaricamento
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundVideo;
