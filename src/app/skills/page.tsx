"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const skillCategories = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "FastAPI", "Express", "REST APIs", "GraphQL"],
    color: "from-green-500 to-emerald-500",
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Supabase", "Redis", "Prisma"],
    color: "from-purple-500 to-pink-500",
  },
  {
    category: "DevOps & Tools",
    skills: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Linux"],
    color: "from-orange-500 to-red-500",
  },
  {
    category: "Other",
    skills: ["Machine Learning", "Data Analysis", "Agile", "Problem Solving"],
    color: "from-yellow-500 to-orange-500",
  },
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back button */}
      <div className="max-w-6xl mx-auto px-6 py-8">
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
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            My <span className="text-red-600">Skills</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Technologies and tools I work with
          </p>

          {/* Skills by Category */}
          <div className="space-y-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-8 bg-gradient-to-b ${category.color} rounded-full`} />
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className={`px-4 py-2 bg-gradient-to-r ${category.color} bg-opacity-10 text-white rounded-lg border border-gray-700 hover:border-gray-600 transition-all`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-gradient-to-br from-red-900/20 to-black border border-red-600/30 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">Currently Learning</h2>
            <p className="text-gray-300 mb-4">
              I'm always expanding my skill set. Currently focusing on:
            </p>
            <div className="flex flex-wrap gap-3">
              {["AI/ML", "Cloud Architecture", "System Design", "Rust"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-red-600/10 text-red-600 rounded-lg border border-red-600/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
