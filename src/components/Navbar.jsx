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
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
          ? "bg-white dark:bg-gray-900 shadow-md py-5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* 🔰 Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={45} height={45} />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Qurbani<span className="text-green-500">Hat</span>
          </span>
        </Link>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className={`transition font-medium ${
              isActive("/")
                ? "text-green-500"
                : "text-gray-700 dark:text-gray-300 hover:text-green-500"
            }`}
          >
            Home
          </Link>

          <Link
            href="/all-animals"
            className={`transition font-medium ${
              isActive("/all-animals")
                ? "text-green-500"
                : "text-gray-700 dark:text-gray-300 hover:text-green-500"
            }`}
          >
            All Animals
          </Link>

          {/* 🔔 Notification */}
          <div className="relative">
            <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
              1
            </span>
          </div>

          {/* 👤 Auth */}
          {user ? (
            <div className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 relative cursor-pointer"
              >
                <Image
                  src={user?.photoURL || "/logo.png"}
                  alt="Profile"
                  fill
                  className="rounded-full border-2 border-green-500"
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* 📱 Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 dark:text-white"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="md:hidden bg-white dark:bg-gray-900 px-6 pb-6 shadow-lg"
          >
            <div className="flex flex-col gap-4 mt-4">

              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>

              <Link href="/all-animals" onClick={() => setIsOpen(false)}>
                All Animals
              </Link>

              {user ? (
                <button
                  onClick={onLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

