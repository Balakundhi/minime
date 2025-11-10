"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, GraduationCap } from "lucide-react";

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
              <p className="text-gray-400">City, Country</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6"
            >
              <Briefcase className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Role</h3>
              <p className="text-gray-400">Software Engineer</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6"
            >
              <GraduationCap className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <p className="text-gray-400">University Name</p>
            </motion.div>
          </div>

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
                Hi, I'm Sri Charan! I'm an aspiring software engineer with a passion for building
                innovative solutions and solving complex problems.
              </p>
              <p>
                When I'm not coding, you'll find me training for marathons, exploring new places
                around the world, or experimenting with new recipes in the kitchen.
              </p>
              <p>
                I believe in continuous learning and pushing boundaries, both in my professional
                career and personal pursuits.
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
