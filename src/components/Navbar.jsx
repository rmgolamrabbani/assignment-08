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
      // এখানে শুরুতে bg-transparent থাকবে এবং স্ক্রল করলে bg-white হবে
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-900 shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* 🔰 Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className={`text-2xl font-bold ${scrolled ? "text-green-600" : "text-white"}`}>
            Qurbani<span className={scrolled ? "text-orange-600" : "text-orange-400"}>Hat</span>
          </span>
        </Link>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-medium transition ${
              isActive("/") 
                ? "text-green-500" 
                : scrolled ? "text-gray-700 hover:text-green-500" : "text-white/90 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/animals"
            className={`font-medium transition ${
              isActive("/animals") 
                ? "text-green-500" 
                : scrolled ? "text-gray-700 hover:text-green-500" : "text-white/90 hover:text-white"
            }`}
          >
            All Animals
          </Link>

          <div className="relative">
            <Bell className={`cursor-pointer ${scrolled ? "text-gray-600" : "text-white"}`} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">1</span>
          </div>

          {user ? (
            <div className="relative">
               <div onClick={() => setProfileOpen(!profileOpen)} className="w-10 h-10 relative cursor-pointer">
                  <Image src={user?.photoURL || "/logo.png"} alt="Profile" fill className="rounded-full border-2 border-green-500" />
               </div>
               {/* Profile Dropdown Logic remains same */}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" className={`px-5 py-2 rounded-lg border transition ${scrolled ? "border-gray-300 text-gray-700" : "border-white/30 text-white hover:bg-white/10"}`}>
                Login
              </Link>
              <Link href="/register" className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition shadow-lg">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* 📱 Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${scrolled ? "text-gray-800" : "text-white"}`}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile Menu Logic remains same */}
    </motion.nav>
  );
}

