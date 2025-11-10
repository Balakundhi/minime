"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Linkedin, Github, Twitter, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send message");
      }
      alert("Thanks! Your message was sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Sorry, something went wrong. Please try again later.");
      console.error(err);
    }
  };

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
            Get in <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Let's connect and build something amazing together
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Email */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
                <Mail className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <a
                  href="mailto:balakundhi.sricharan@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  balakundhi.sricharan@gmail.com
                </a>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
                <MapPin className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p className="text-gray-400">Devon, PA</p>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/sbalakundhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/sbalakundhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  {/*
                  <a
                    href="tel:+16179353010"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                    title="+1-617-935-3010"
                  >
                    <span className="text-sm">📱</span>
                  </a>
                  */}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
