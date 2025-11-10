"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChatWidget } from "./ChatWidget";

const roles = [
  "an aspiring Software Engineer",
  "an aspiring Marathon Runner",
  "a Traveller",
  "a Cook",
];

export function Hero() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [fadeOutAnimation, setFadeOutAnimation] = useState(false);
  const [showText, setShowText] = useState(false);
  const [nameText, setNameText] = useState("");
  const [nameComplete, setNameComplete] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleCharIndex, setRoleCharIndex] = useState(0);

  // Trigger fade out and text animation sequence
  useEffect(() => {
    // After 4 seconds, start fading out the animation
    const fadeTimer = setTimeout(() => setFadeOutAnimation(true), 4000);
    // After 4.5 seconds, hide animation and show text
    const hideTimer = setTimeout(() => {
      setShowAnimation(false);
      setShowText(true);
    }, 4500);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
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
      {/* Animated background dots - only show after intro animation */}
      {!showAnimation && (
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
          {/* Plane Animation */}
          {showAnimation && (
            <motion.div
              className="relative w-full h-64 mb-12 overflow-hidden"
              initial={{ opacity: 1 }}
              animate={{ opacity: fadeOutAnimation ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Plane flying from right to left */}
              <motion.div
                className="absolute top-20"
                initial={{ x: "calc(100vw + 200px)" }}
                animate={{ x: "-300px" }}
                transition={{
                  duration: 4,
                  ease: "linear",
                }}
              >
                <svg width="200" height="120" viewBox="0 0 200 120">
                  {/* Contrails/Vapor trails */}
                  <motion.g
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path 
                      d="M 160 55 Q 180 55 200 58" 
                      stroke="#E5E7EB" 
                      strokeWidth="1.5" 
                      fill="none" 
                      opacity="0.4"
                    />
                    <path 
                      d="M 160 65 Q 180 65 200 62" 
                      stroke="#E5E7EB" 
                      strokeWidth="1.5" 
                      fill="none" 
                      opacity="0.4"
                    />
                  </motion.g>

                  {/* Plane body */}
                  <ellipse cx="100" cy="60" rx="50" ry="12" fill="#DC2626" />
                  
                  {/* Cockpit */}
                  <ellipse cx="55" cy="58" rx="15" ry="10" fill="#1E3A8A" opacity="0.7" />
                  <path d="M 45 58 Q 40 55 38 58 Q 40 61 45 58" fill="#60A5FA" opacity="0.5" />
                  
                  {/* Wings */}
                  <path 
                    d="M 80 60 L 80 30 L 120 30 L 120 60" 
                    fill="#EF4444" 
                    stroke="#DC2626" 
                    strokeWidth="2"
                  />
                  <path 
                    d="M 80 60 L 80 90 L 120 90 L 120 60" 
                    fill="#EF4444" 
                    stroke="#DC2626" 
                    strokeWidth="2"
                  />
                  
                  {/* Wing details */}
                  <line x1="85" y1="35" x2="115" y2="35" stroke="#FCA5A5" strokeWidth="1" />
                  <line x1="85" y1="85" x2="115" y2="85" stroke="#FCA5A5" strokeWidth="1" />
                  
                  {/* Tail */}
                  <path 
                    d="M 140 55 L 160 45 L 160 55 Z" 
                    fill="#EF4444" 
                    stroke="#DC2626" 
                    strokeWidth="1.5"
                  />
                  <path 
                    d="M 140 65 L 160 75 L 160 65 Z" 
                    fill="#EF4444" 
                    stroke="#DC2626" 
                    strokeWidth="1.5"
                  />
                  
                  {/* Tail fin */}
                  <path 
                    d="M 145 60 L 155 40 L 160 45 L 150 60 Z" 
                    fill="#EF4444" 
                    stroke="#DC2626" 
                    strokeWidth="1.5"
                  />
                  
                  {/* Windows */}
                  <circle cx="65" cy="58" r="3" fill="#60A5FA" opacity="0.6" />
                  <circle cx="75" cy="58" r="3" fill="#60A5FA" opacity="0.6" />
                  <circle cx="85" cy="58" r="3" fill="#60A5FA" opacity="0.6" />
                  <circle cx="95" cy="58" r="3" fill="#60A5FA" opacity="0.6" />
                  
                  {/* Propeller (if you want) */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "38px", originY: "60px" }}
                  >
                    <ellipse cx="38" cy="60" rx="3" ry="15" fill="#374151" opacity="0.7" />
                    <ellipse cx="38" cy="60" rx="15" ry="3" fill="#374151" opacity="0.7" />
                  </motion.g>
                  
                  {/* Engine glow */}
                  <motion.circle
                    cx="38"
                    cy="60"
                    r="6"
                    fill="#FCD34D"
                    opacity="0.6"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  />

                  {/* Shadow */}
                  <ellipse cx="100" cy="105" rx="45" ry="5" fill="#000" opacity="0.15" />
                </svg>

                {/* Additional vapor trail effect */}
                <div className="absolute top-[55px] left-[160px] flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-px bg-gradient-to-r from-gray-300/40 to-transparent rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: [0, 60, 0],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Text appears after cyclist crosses finish line */}
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
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

          {/* Chat Widget */}
          <ChatWidget />
        </div>
      </div>
    </section>
  );
}
