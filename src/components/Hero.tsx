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
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(currentRole.substring(0, charIndex + (isDeleting ? -1 : 1)));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

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
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Hi, I'm <span className="text-red-600">Sri Charan</span>
            </h1>
            
            <div className="text-3xl md:text-4xl text-gray-300 font-mono h-12 flex items-center">
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 text-red-600"
              >
                |
              </motion.span>
            </div>
          </motion.div>

          {/* Running person animation */}
          <div className="relative w-full h-48 my-12 overflow-hidden">
            <motion.div
              className="absolute"
              initial={{ x: "100vw" }}
              animate={{ x: -250 }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* 3D Runner */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 100 120"
                    fill="none"
                  >
                    {/* Shadow */}
                    <motion.ellipse
                      cx="50"
                      cy="110"
                      rx="20"
                      ry="4"
                      fill="#000"
                      opacity="0.3"
                      animate={{
                        scaleX: [1, 0.8, 1],
                        opacity: [0.3, 0.2, 0.3],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                      }}
                    />

                    {/* Head */}
                    <circle cx="50" cy="25" r="12" fill="#FFA07A" />
                    <circle cx="47" cy="23" r="2" fill="#000" />
                    <circle cx="53" cy="23" r="2" fill="#000" />
                    <path d="M 45 28 Q 50 30 55 28" stroke="#000" strokeWidth="1" fill="none" strokeLinecap="round" />
                    
                    {/* Hair */}
                    <path d="M 40 20 Q 50 15 60 20" fill="#8B4513" />

                    {/* Body */}
                    <ellipse cx="50" cy="55" rx="15" ry="22" fill="#FF6B6B" />
                    
                    {/* Running number */}
                    <text x="45" y="60" fontSize="10" fill="#FFF" fontWeight="bold">42</text>

                    {/* Arms */}
                    <motion.g
                      animate={{
                        rotate: [0, -25, 0, 25, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ originX: "50px", originY: "45px" }}
                    >
                      {/* Left arm */}
                      <ellipse cx="35" cy="50" rx="5" ry="18" fill="#FFA07A" transform="rotate(-30 35 50)" />
                      <circle cx="32" cy="62" r="4" fill="#FFB6C1" />
                    </motion.g>

                    <motion.g
                      animate={{
                        rotate: [0, 25, 0, -25, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ originX: "50px", originY: "45px" }}
                    >
                      {/* Right arm */}
                      <ellipse cx="65" cy="50" rx="5" ry="18" fill="#FFA07A" transform="rotate(30 65 50)" />
                      <circle cx="68" cy="62" r="4" fill="#FFB6C1" />
                    </motion.g>

                    {/* Legs */}
                    <motion.g
                      animate={{
                        rotate: [0, 40, 0, -40, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ originX: "45px", originY: "75px" }}
                    >
                      {/* Left leg */}
                      <ellipse cx="45" cy="85" rx="6" ry="20" fill="#4169E1" />
                      <ellipse cx="45" cy="102" rx="7" ry="6" fill="#1E90FF" />
                    </motion.g>

                    <motion.g
                      animate={{
                        rotate: [0, -40, 0, 40, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ originX: "55px", originY: "75px" }}
                    >
                      {/* Right leg */}
                      <ellipse cx="55" cy="85" rx="6" ry="20" fill="#4169E1" />
                      <ellipse cx="55" cy="102" rx="7" ry="6" fill="#1E90FF" />
                    </motion.g>
                  </svg>
                </motion.div>

                {/* Speed lines */}
                <div className="absolute top-1/2 -translate-y-1/2 left-full ml-6 flex flex-col gap-3">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-0.5 bg-gradient-to-r from-red-600/60 to-transparent rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: [0, 40, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>

                {/* Dust particles */}
                <div className="absolute bottom-0 left-0 right-0">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gray-500/40 rounded-full"
                      style={{
                        left: `${20 + i * 15}px`,
                        bottom: "5px",
                      }}
                      animate={{
                        y: [0, -20, -40],
                        x: [0, Math.random() * 20 - 10],
                        opacity: [0.6, 0.3, 0],
                        scale: [1, 0.5, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chat Widget */}
          <ChatWidget />
        </div>
      </div>
    </section>
  );
}
