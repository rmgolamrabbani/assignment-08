"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 overflow-hidden relative px-4">

      {/* 🔥 Animated Gradient Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-100 h-[400px] bg-blue-600 opacity-20 blur-3xl rounded-full -bottom-25 right-[-100px] animate-pulse"></div>
      </div>

      {/* 🚀 Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-md w-full"
      >
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">

          {/* 🔢 404 Animated */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl font-extrabold text-white mb-4 tracking-tight"
          >
            404
          </motion.h1>

          {/* ✨ Floating Emoji */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl mb-3"
          >
            🚀
          </motion.div>

          {/* 🧠 Heading */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-gray-200 mb-2"
          >
            Page Not Found
          </motion.h2>

          {/* 📄 Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mb-6"
          >
            The page you’re looking for doesn’t exist or has been moved.
          </motion.p>

          {/* 🔘 Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="inline-block px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </div>

        {/* 💬 Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-500 text-sm mt-6"
        >
          Oops! You took a wrong turn.
        </motion.p>
      </motion.div>
    </div>
  );
}


