"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "GlobeMediWatch",
    description: "Built a community health platform to manage and organize medical camp events. Features include event management, participant tracking, and health data analytics.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Azure", "Git"],
    github: "#",
    demo: "#",
    image: "🏥",
    date: "Apr 2024",
  },
  {
    title: "AutoNexus",
    description: "Design-pattern based Java system for managing rentals, purchases, and inventory. Implemented Factory, Strategy, Decorator, and Singleton patterns for scalable architecture.",
    tags: ["Java", "Design Patterns", "OOP"],
    github: "#",
    demo: "#",
    image: "🚗",
    date: "Apr 2025",
  },
  {
    title: "SkyNavigators",
    description: "Visualized flight path optimization using advanced graph algorithms including Dijkstra's, A*, Bellman-Ford, BFS, and DFS for efficient route planning.",
    tags: ["Java", "Graph Algorithms", "DSA"],
    github: "#",
    demo: "#",
    image: "✈️",
    date: "Dec 2024",
  },
  {
    title: "Husky Payroll Management",
    description: "Payroll system for managing salaries, employee records, and reports with comprehensive database design and SQL optimization.",
    tags: ["Oracle SQL", "PL/SQL", "Database Design"],
    github: "#",
    demo: "#",
    image: "💼",
    date: "Dec 2023",
  },
];

export default function ProjectsPage() {
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
            My <span className="text-red-600">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Things I've built and shipped
          </p>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-red-600 transition-all"
              >
                {/* Project Icon/Image */}
                <div className="text-6xl mb-4">{project.image}</div>

                {/* Title and Date */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.date}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-red-600/10 text-red-600 text-sm rounded-full border border-red-600/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add more projects CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400">
              More projects coming soon...
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
