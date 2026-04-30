"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";



const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;

    try {
      setLoading(true);
      await addDoc(collection(db, "subscribers"), {
        email,
        createdAt: new Date(),
      });
      setSuccess("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error(error);
      setSuccess("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 pt-20 pb-10 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6">

        {/* 🔝 Top Section with animation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >

          {/* 🧾 Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="logo" width={45} height={45} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Qurbani<span className="text-green-500">Hat</span>
              </h2>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Find healthy and trusted Qurbani animals بسهولة.
              Verified sellers, transparent pricing, and safe delivery.
            </p>

            {/* 🌐 Social */}
            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="p-2 bg-gray-200 dark:bg-white/10 hover:bg-green-500 hover:text-white rounded-full transition cursor-pointer"
                  >
                    <Icon size={14} />
                  </div>
                )
              )}
            </div>
          </div>

          {/* 🔗 Links */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/animals">Animals</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* 📦 Services */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Buy Animals</li>
              <li>Sell Animals</li>
              <li>Home Delivery</li>
              <li>Health Check</li>
            </ul>
          </div>

          {/* 📩 Newsletter */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Subscribe to get latest updates and offers.
            </p>

            <div className="flex items-center rounded-xl overflow-hidden border border-gray-300 dark:border-white/10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 w-full bg-transparent outline-none text-sm"
              />
              <button
                onClick={handleSubscribe}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white text-sm transition"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </div>

            {success && (
              <p className="text-xs mt-2 text-green-500">{success}</p>
            )}
          </div>
        </motion.div>

        {/* 🔽 Bottom */}
        <div className="border-t border-gray-200 dark:border-white/10 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} QurbaniHat. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

