"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChatWidget } from "./ChatWidget";

const roles = [
  "an aspiring Software Engineer",
  "an aspiring Marathon Runner",
  "a World Traveller",
  "a Cook",
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
              Hi, I'm <span className="text-blue-400">Sri Charan</span>
            </h1>
            
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl text-gray-300 font-light h-12"
            >
              {roles[currentRole]}
            </motion.div>
          </motion.div>

          {/* Running person animation */}
          <div className="relative w-full h-40 my-12 overflow-hidden">
            <motion.div
              className="absolute flex items-center gap-4"
              initial={{ x: "100vw" }}
              animate={{ x: -200 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Runner silhouette with trail effect */}
              <div className="relative">
                {/* Motion trails */}
                <motion.div
                  className="absolute w-16 h-20 bg-blue-400/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Runner figure */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-blue-400"
                  >
                    {/* Head */}
                    <circle cx="12" cy="5" r="2" fill="currentColor" />
                    {/* Body */}
                    <path
                      d="M12 7 L12 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Arms - animated running pose */}
                    <motion.path
                      d="M12 9 L15 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{
                        d: ["M12 9 L15 12", "M12 9 L9 12", "M12 9 L15 12"],
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.path
                      d="M12 9 L9 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{
                        d: ["M12 9 L9 12", "M12 9 L15 12", "M12 9 L9 12"],
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Legs - animated running pose */}
                    <motion.path
                      d="M12 14 L14 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{
                        d: ["M12 14 L14 19", "M12 14 L10 19", "M12 14 L14 19"],
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.path
                      d="M12 14 L10 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{
                        d: ["M12 14 L10 19", "M12 14 L14 19", "M12 14 L10 19"],
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </svg>
                </motion.div>
                
                {/* Speed lines behind runner */}
                <div className="absolute top-1/2 -translate-y-1/2 left-full ml-4 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-1 bg-blue-400/40 rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
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
