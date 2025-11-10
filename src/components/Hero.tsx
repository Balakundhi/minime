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
  const [showText, setShowText] = useState(false);
  const [nameText, setNameText] = useState("");
  const [nameComplete, setNameComplete] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleCharIndex, setRoleCharIndex] = useState(0);

  // Trigger text animation after 3 seconds (cyclist crosses finish line)
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 3000);
    return () => clearTimeout(timer);
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
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Cyclist Animation */}
          <div className="relative w-full h-48 mb-12 overflow-hidden">
            {/* Finish Line */}
            <motion.div
              className="absolute left-10 top-0 bottom-0 flex items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Checkered flag pattern */}
              <div className="relative">
                <svg width="60" height="80" viewBox="0 0 60 80">
                  {/* Flag pole */}
                  <rect x="0" y="0" width="3" height="80" fill="#888" />
                  {/* Checkered flag */}
                  {[0, 1, 2, 3].map((row) =>
                    [0, 1, 2, 3].map((col) => {
                      const isBlack = (row + col) % 2 === 0;
                      return (
                        <motion.rect
                          key={`${row}-${col}`}
                          x={8 + col * 12}
                          y={row * 10}
                          width="12"
                          height="10"
                          fill={isBlack ? "#000" : "#FFF"}
                          animate={{
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: (row + col) * 0.1,
                          }}
                        />
                      );
                    })
                  )}
                </svg>
                <motion.div
                  className="absolute -bottom-2 left-0 text-xs text-gray-500 whitespace-nowrap font-bold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  FINISH
                </motion.div>
              </div>
            </motion.div>

            {/* Cyclist */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              initial={{ x: "100vw" }}
              animate={{ x: -150 }}
              transition={{
                duration: 3,
                ease: "linear",
              }}
            >
              <svg width="140" height="100" viewBox="0 0 140 100">
                {/* Shadow */}
                <ellipse cx="70" cy="90" rx="30" ry="5" fill="#000" opacity="0.2" />
                
                {/* Bike Frame */}
                <path d="M 45 50 L 75 50 L 95 30 L 75 50 L 75 70" stroke="#DC2626" strokeWidth="3" fill="none" />
                <path d="M 45 50 L 45 70" stroke="#DC2626" strokeWidth="3" />
                
                {/* Handlebars */}
                <path d="M 95 30 L 105 25" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Seat */}
                <ellipse cx="48" cy="48" rx="8" ry="4" fill="#333" />
                
                {/* Pedals */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "75px", originY: "70px" }}
                >
                  <circle cx="75" cy="70" r="3" fill="#666" />
                  <rect x="73" y="58" width="4" height="10" fill="#444" />
                  <rect x="73" y="72" width="4" height="10" fill="#444" />
                </motion.g>
                
                {/* Front Wheel */}
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "100px", originY: "85px" }}
                >
                  <circle cx="100" cy="85" r="15" stroke="#333" strokeWidth="3" fill="none" />
                  <circle cx="100" cy="85" r="2" fill="#333" />
                  <line x1="100" y1="85" x2="100" y2="70" stroke="#333" strokeWidth="1.5" />
                  <line x1="100" y1="85" x2="115" y2="85" stroke="#333" strokeWidth="1.5" />
                </motion.g>
                
                {/* Back Wheel */}
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "45px", originY: "85px" }}
                >
                  <circle cx="45" cy="85" r="15" stroke="#333" strokeWidth="3" fill="none" />
                  <circle cx="45" cy="85" r="2" fill="#333" />
                  <line x1="45" y1="85" x2="45" y2="70" stroke="#333" strokeWidth="1.5" />
                  <line x1="45" y1="85" x2="60" y2="85" stroke="#333" strokeWidth="1.5" />
                </motion.g>
                
                {/* Rider Body */}
                <ellipse cx="60" cy="38" rx="12" ry="16" fill="#3B82F6" />
                
                {/* Rider Head */}
                <circle cx="75" cy="25" r="10" fill="#FFA07A" />
                <circle cx="73" cy="23" r="1.5" fill="#000" />
                <circle cx="77" cy="23" r="1.5" fill="#000" />
                <path d="M 72 28 Q 75 29 78 28" stroke="#000" strokeWidth="0.8" fill="none" />
                
                {/* Helmet */}
                <path d="M 67 20 Q 75 15 83 20 Q 83 25 75 25 Q 67 25 67 20" fill="#DC2626" />
                
                {/* Arms */}
                <motion.line
                  x1="65"
                  y1="35"
                  x2="95"
                  y2="28"
                  stroke="#FFA07A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{ x2: [95, 97, 95] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                
                {/* Legs */}
                <motion.g
                  animate={{ rotate: [0, 180] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "75px", originY: "70px" }}
                >
                  <line x1="60" y1="50" x2="75" y2="60" stroke="#FFA07A" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="75" y1="60" x2="73" y2="72" stroke="#FFA07A" strokeWidth="4" strokeLinecap="round" />
                </motion.g>
                
                {/* Speed lines */}
                <motion.g
                  animate={{ opacity: [0, 0.6, 0], x: [0, -20] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                >
                  <line x1="30" y1="45" x2="10" y2="45" stroke="#DC2626" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
                  <line x1="25" y1="55" x2="5" y2="55" stroke="#DC2626" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
                  <line x1="35" y1="65" x2="15" y2="65" stroke="#DC2626" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
                </motion.g>
              </svg>
            </motion.div>
          </div>

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
