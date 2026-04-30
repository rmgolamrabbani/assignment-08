"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const profileRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👉 click outside close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gray-900 ${
        scrolled ? "shadow-md py-6" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* 🔰 Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image src="/logo.png" alt="Logo" width={45} height={45} />
          </motion.div>
          <span className="text-xl font-bold text-white">
            Qurbani<span className="text-green-500">Hat</span>
          </span>
        </Link>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className={`relative transition font-medium ${
              isActive("/")
                ? "text-green-500"
                : "text-gray-300 hover:text-green-500"
            }`}
          >
            Home
            {isActive("/") && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-500"
              />
            )}
          </Link>

          <Link
            href="/all-animals"
            className={`relative transition font-medium ${
              isActive("/all-animals")
                ? "text-green-500"
                : "text-gray-300 hover:text-green-500"
            }`}
          >
            All Animals
            {isActive("/all-animals") && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-500"
              />
            )}
          </Link>

          {/* 🔔 Notification */}
          <div className="relative">
            <Bell className="text-gray-300 cursor-pointer" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full"
            >
              1
            </motion.span>
          </div>

          {/* 👤 Auth */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 relative cursor-pointer"
              >
                <Image
                  src={user?.photoURL || "/logo.png"}
                  alt="Profile"
                  fill
                  className="rounded-full border-2 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                />
              </div>

              {/* 🔽 Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 bg-gray-800 rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition"
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
          className="md:hidden text-white"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 px-6 pb-6  shadow-lg"
          >
            <div className="flex flex-col gap-4 mt-4 text-gray-300">

              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>

              <Link href="/all-animals" onClick={() => setIsOpen(false)}>
                All Animals
              </Link>

              {user ? (
                <button
                  onClick={onLogout}
                  className="text-left text-red-400"
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