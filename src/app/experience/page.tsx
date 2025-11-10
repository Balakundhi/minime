"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Company Name",
    period: "Jan 2024 - Present",
    description: "Working on full-stack development, building scalable web applications and APIs.",
    achievements: [
      "Led development of key features that improved user engagement by 40%",
      "Optimized database queries reducing load time by 60%",
      "Mentored junior developers and conducted code reviews",
    ],
    current: true,
  },
  {
    title: "Software Engineering Intern",
    company: "Previous Company",
    period: "Jun 2023 - Dec 2023",
    description: "Contributed to frontend development and worked on improving user experience.",
    achievements: [
      "Implemented new UI components using React and TypeScript",
      "Collaborated with design team to improve UX",
      "Fixed critical bugs and improved application performance",
    ],
    current: false,
  },
  {
    title: "Developer Intern",
    company: "Startup Name",
    period: "Jan 2023 - May 2023",
    description: "Gained hands-on experience with modern web technologies and agile development.",
    achievements: [
      "Built responsive web pages from design mockups",
      "Participated in daily standups and sprint planning",
      "Learned best practices for clean code and version control",
    ],
    current: false,
  },
];

export default function ExperiencePage() {
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
            Work <span className="text-red-600">Experience</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            My professional journey
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800" />

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-6 top-2 w-5 h-5 rounded-full border-4 ${exp.current ? 'bg-red-600 border-red-600' : 'bg-gray-800 border-gray-700'}`} />

                  {/* Content card */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                    {/* Current badge */}
                    {exp.current && (
                      <span className="inline-block px-3 py-1 bg-red-600/10 text-red-600 text-sm rounded-full border border-red-600/20 mb-4">
                        Current
                      </span>
                    )}

                    {/* Title and company */}
                    <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                    <div className="flex items-center gap-4 mb-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-red-600 mb-2">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400">
                            <span className="text-red-600 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
