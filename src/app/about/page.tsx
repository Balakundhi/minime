"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Download } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="text-red-600">Me</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">Get to know me better</p>

          {/* Profile section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6"
            >
              <MapPin className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-400">Devon, PA</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6"
            >
              <Briefcase className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Role</h3>
              <p className="text-gray-400">Full Stack Engineer</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6"
            >
              <GraduationCap className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <p className="text-gray-400">Northeastern University</p>
              <p className="text-gray-500 text-sm mt-1">MS Computer Software Engineering</p>
            </motion.div>
          </div>

          {/* Resume Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-gradient-to-br from-red-900/20 to-black border border-red-600/30 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Download className="w-6 h-6 text-red-600" />
                  Download Resume
                </h3>
                <p className="text-gray-400">Get my resume in your preferred format</p>
              </div>
              <div className="flex gap-4">
                <a
                  href="/resume/Balakundhi_Resume.pdf"
                  download
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </a>
                {/* DOCX unavailable currently */}
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">My Story</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Hi, I'm Sri Charan Balakundhi! I'm a Software Engineer skilled in Java, Spring Boot, JavaScript, and React, 
                with hands-on experience building AI-driven applications and cloud-native solutions.
              </p>
              <p>
                I'm currently pursuing my Master's in Computer Software Engineering at Northeastern University (graduating May 2025) 
                with a GPA of 3.8/4.0. I'm proficient in AWS, Azure, and have deep experience with Generative AI, LLM integration, 
                RAG, and prompt engineering.
              </p>
              <p>
                I've worked as a Full Stack Engineer Co-op at Founderwayai, and previously spent over 3 years as a software engineer 
                at Infosys and Tech Mahindra, where I built scalable microservices, REST APIs, and cloud solutions.
              </p>
              <p>
                When I'm not coding, you'll find me training for marathons, exploring new places, or experimenting with new recipes. 
                I'm passionate about continuous learning and pushing boundaries in both my career and personal life.
              </p>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Beyond Work</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">🏃‍♂️ Marathon Running</h3>
                <p className="text-gray-400">
                  Training for endurance races and pushing physical limits.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">✈️ Travel</h3>
                <p className="text-gray-400">
                  Exploring new cultures and experiencing different perspectives.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">🍳 Cooking</h3>
                <p className="text-gray-400">
                  Experimenting with flavors and creating delicious meals.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">💻 Tech</h3>
                <p className="text-gray-400">
                  Staying updated with latest technologies and trends.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
