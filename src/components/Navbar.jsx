"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-md border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* 🔰 Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" alt="Logo" width={64} height={64}  />
          <span className="text-2xl font-bold text-green-600">
            Qurbani<span className="text-orange-600">Hat</span>
          </span>
        </Link>

       
        <div className="hidden md:flex items-center gap-6">

          <Link
            href="/"
            className={
              isActive("/")
                ? "text-green-600 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-green-500 transition"
            }
          >
            Home
          </Link>

          <Link
            href="/animals"
            className={
              isActive("/animals")
                ? "text-green-600 font-semibold"
                : "text-gray-600 dark:text-gray-700 hover:text-green-500 transition"
            }
          >
            All Animals
          </Link>

          {/* 🔔 Notification */}
          <div className="relative">
            <Bell className="cursor-pointer text-gray-600 dark:text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1.5 rounded-full shadow">
              1
            </span>
          </div>

          {/* 👤 Auth */}
          {user ? (
            <div className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="relative w-9 h-9 cursor-pointer"
              >
                <Image
                  src={user?.photoURL || "/logo.png"}
                  alt="Profile"
                  fill
                  className="object-cover rounded-full border-2 border-green-500 shadow-sm"
                />
              </div>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border dark:border-gray-700"
                  >
                    <p className="text-sm mb-2 dark:text-white">
                      {user?.name || "User"}
                    </p>
                    <button
                      onClick={onLogout}
                      className="w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
                 )
          
          : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg shadow-sm transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* 📱 Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 dark:text-gray-800 focus:outline-none"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            // ব্যাকগ্রাউন্ড সাদা এবং বর্ডার হালকা গ্রে করা হয়েছে
            className="md:hidden bg-white/95 backdrop-blur-xl px-6 pb-6 border-t border-gray-100 shadow-xl overflow-hidden dark:bg-gray-900 dark:border-gray-800"
          >
            {/* লিংকগুলোতে টেক্সট কালার gray-700/800 করা হয়েছে */}
            <Link 
              href="/" 
              className="block py-4 text-gray-700 font-medium border-b border-gray-50 hover:text-green-600 transition-colors dark:text-gray-200 dark:border-gray-800"
            >
              Home
            </Link>
            <Link 
              href="/animals" 
              className="block py-4 text-gray-700 font-medium border-b border-gray-50 hover:text-green-600 transition-colors dark:text-gray-200 dark:border-gray-800"
            >
              All Animals
            </Link>

            {user ? (
              <div className="mt-4 p-4 bg-gray-50 rounded-2xl dark:bg-gray-800">
                <p className="text-gray-900 font-semibold dark:text-white">
                  {user.name}
                </p>
                <button 
                  onClick={onLogout} 
                  className="text-red-500 text-sm font-medium mt-2 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/login"
                  // বর্ডার gray-300 এবং টেক্সট gray-700
                  className="text-center py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-green-500 transition-all dark:text-white dark:border-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  // সবুজের ওপর সাদা লেখা সবসময় ভালো ফুটে ওঠে
                  className="text-center py-2.5 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 shadow-md transition-all active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

