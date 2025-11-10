"use client";

import { motion } from "framer-motion";
import { User, Code, Award, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";

const cards = [
  { icon: User, label: "Me", href: "/about", color: "from-blue-500 to-cyan-500" },
  { icon: Code, label: "Projects", href: "/projects", color: "from-purple-500 to-pink-500" },
  { icon: Award, label: "Skills", href: "/skills", color: "from-green-500 to-emerald-500" },
  { icon: MessageCircle, label: "Experience", href: "/experience", color: "from-indigo-500 to-blue-500" },
  { icon: Mail, label: "Contact", href: "/contact", color: "from-yellow-500 to-orange-500" },
];

export function NavigationCards() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Explore</h2>
          <p className="text-gray-400">Learn more about my journey</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={card.href}>
                <div className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all hover:scale-105 cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  <div className="relative flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-300 font-medium">{card.label}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
