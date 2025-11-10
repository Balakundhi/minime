"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChatWidget } from "./ChatWidget";
import Image from "next/image";

const roles = [
  "an aspiring Software Engineer",
  "an aspiring Marathon Runner",
  "a Traveller",
  "a Photographer and a Cook",
];

export function Hero() {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraClick, setCameraClick] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoToCircle, setPhotoToCircle] = useState(false);
  const [photoToTop, setPhotoToTop] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [nameText, setNameText] = useState("");
  const [nameComplete, setNameComplete] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleCharIndex, setRoleCharIndex] = useState(0);

  // Camera and photo animation sequence
  useEffect(() => {
    // After 2 seconds, show camera
    const showCameraTimer = setTimeout(() => setShowCamera(true), 2000);
    // After 2.5 seconds, camera clicks (flash)
    const clickTimer = setTimeout(() => {
      setCameraClick(true);
      setShowFlash(true);
    }, 2500);
    // After 2.8 seconds, flash disappears
    const flashTimer = setTimeout(() => setShowFlash(false), 2800);
    // After 3 seconds, hide camera and show full photo
    const hideTimer = setTimeout(() => {
      setShowCamera(false);
      setShowPhoto(true);
    }, 3000);
    // After 4.5 seconds, start shrinking photo to circle
    const circleTimer = setTimeout(() => setPhotoToCircle(true), 4500);
    // After 5.5 seconds, move photo to top
    const topTimer = setTimeout(() => setPhotoToTop(true), 5500);
    // After 6 seconds, show text
    const textTimer = setTimeout(() => setShowText(true), 6000);
    
    return () => {
      clearTimeout(showCameraTimer);
      clearTimeout(clickTimer);
      clearTimeout(flashTimer);
      clearTimeout(hideTimer);
      clearTimeout(circleTimer);
      clearTimeout(topTimer);
      clearTimeout(textTimer);
    };
  }, []);

  // Type "Hi, I'm Sri Charan" once
  useEffect(() => {
    if (!showText || nameComplete) return;
    const fullName = "Hi, I'm Sri Charan";
    
    if (nameText.length < fullName.length) {
      const timeout = setTimeout(() => {
        setNameText(fullName.substring(0, nameText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setNameComplete(true);
      // Show chat widget after name is complete
      setTimeout(() => setShowChatWidget(true), 500);
    }
  }, [showText, nameText, nameComplete]);

  // Type roles continuously after name is complete
  useEffect(() => {
    if (!nameComplete) return;

    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && roleCharIndex === currentRole.length) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && roleCharIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setRoleText(currentRole.substring(0, roleCharIndex + (isDeleting ? -1 : 1)));
      setRoleCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [roleCharIndex, isDeleting, roleIndex, nameComplete]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Flash effect */}
      {showFlash && (
        <motion.div
          className="absolute inset-0 bg-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Animated background dots - only show after camera animation */}
      {showText && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Camera Animation */}
          {showCamera && (
            <motion.div
              className="relative w-full h-64 mb-12 overflow-hidden flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Camera */}
              <motion.div
                animate={{
                  scale: cameraClick ? [1, 0.95, 1] : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <svg width="180" height="140" viewBox="0 0 180 140">
                  {/* Camera Body */}
                  <rect x="40" y="50" width="100" height="60" rx="8" fill="#374151" />
                  <rect x="45" y="55" width="90" height="50" rx="5" fill="#4B5563" />
                  
                  {/* Lens */}
                  <circle cx="90" cy="80" r="25" fill="#1F2937" />
                  <circle cx="90" cy="80" r="20" fill="#374151" />
                  <circle cx="90" cy="80" r="15" fill="#000" />
                  
                  {/* Lens reflection */}
                  <circle cx="85" cy="75" r="5" fill="#60A5FA" opacity="0.4" />
                  
                  {/* Flash (red light when clicked) */}
                  <motion.rect
                    x="120"
                    y="60"
                    width="12"
                    height="10"
                    rx="2"
                    fill={cameraClick ? "#FCD34D" : "#DC2626"}
                    animate={cameraClick ? {
                      opacity: [1, 0.3, 1],
                    } : {}}
                    transition={{ duration: 0.15 }}
                  />
                  
                  {/* Viewfinder */}
                  <rect x="65" y="45" width="15" height="8" rx="2" fill="#1F2937" />
                  
                  {/* Shutter button */}
                  <circle cx="130" cy="52" r="4" fill="#EF4444" />
                  
                  {/* Grip texture */}
                  <rect x="42" y="70" width="3" height="15" fill="#1F2937" opacity="0.5" />
                  <rect x="47" y="70" width="3" height="15" fill="#1F2937" opacity="0.5" />
                  
                  {/* Camera brand/details */}
                  <text x="60" y="68" fontSize="8" fill="#9CA3AF" fontFamily="monospace">MINI</text>
                  <text x="60" y="100" fontSize="6" fill="#6B7280" fontFamily="monospace">PHOTOGRAPHER</text>
                </svg>
              </motion.div>
            </motion.div>
          )}

          {/* Photo Reveal Animation */}
          {showPhoto && (
            <motion.div
              className="absolute top-0 left-0 right-0 flex justify-center z-40"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                y: photoToTop ? "3rem" : "50vh",
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                y: { duration: 0.8, delay: 0.5 },
              }}
            >
              <motion.div
                className="relative overflow-hidden"
                animate={{
                  width: photoToCircle ? "240px" : "min(70vw, 500px)",
                  height: photoToCircle ? "240px" : "min(70vh, 600px)",
                }}
                transition={{ duration: 0.8 }}
                style={{
                  borderRadius: photoToCircle ? "50%" : "16px",
                  border: photoToCircle ? "5px solid #DC2626" : "8px solid rgba(220, 38, 38, 0.3)",
                  boxShadow: photoToCircle 
                    ? "0 0 40px rgba(220, 38, 38, 0.6), 0 0 80px rgba(220, 38, 38, 0.3)" 
                    : "0 30px 80px rgba(0,0,0,0.7)"
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Sri Charan Balakundhi"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  priority
                />
              </motion.div>
            </motion.div>
          )}

          {/* Text appears after photo moves to top */}
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 mt-56"
            >
              {/* Main heading - types once and stays */}
              <div className="text-6xl md:text-7xl font-bold leading-tight min-h-[5rem] flex items-center justify-center">
                <span className="text-white font-mono">
                  {nameText.split("Sri Charan")[0]}
                  {nameText.includes("Sri Charan") && <span className="text-red-600">Sri Charan</span>}
                </span>
                {!nameComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-1 text-red-600"
                  >
                    |
                  </motion.span>
                )}
              </div>
              
              {/* Role text - continuously types */}
              {nameComplete && (
                <div className="text-3xl md:text-4xl text-gray-300 font-mono h-12 flex items-center justify-center">
                  <span>{roleText}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-1 text-red-600"
                  >
                    |
                  </motion.span>
                </div>
              )}
            </motion.div>
          )}

          {/* Chat Widget - only show after text appears */}
          {showChatWidget && <ChatWidget />}
        </div>
      </div>
    </section>
  );
}
