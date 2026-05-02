"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const profileRef = useRef();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState(user?.image);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/login"); 
                setProfileOpen(false);
                setIsOpen(false);
            },
        },
    });
  };

  const isActive = (path) => pathname === path;

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/90 backdrop-blur-md py-4 shadow-lg" : "bg-gray-900 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/*  Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image src="/logo.png" alt="Logo" width={50} height={50} className="h-auto w-auto " />
          </motion.div>
          <span className="text-xl font-bold text-white">
            Qurbani<span className="text-green-500">Hat</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`relative transition font-medium ${
              isActive("/") ? "text-green-500" : "text-gray-300 hover:text-green-500"
            }`}
          >
            Home
            {isActive("/") && (
              <motion.div layoutId="underline" className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-500" />
            )}
          </Link>

          <Link
            href="/all-animals"
            className={`relative transition font-medium ${
              isActive("/all-animals") ? "text-green-500" : "text-gray-300 hover:text-green-500"
            }`}
          >
            All Animals
            {isActive("/all-animals") && (
              <motion.div layoutId="underline" className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-500" />
            )}
          </Link>

          {/*  Notification (Only if user logged in) */}
          {user && (
            <div className="relative">
              <Bell className="text-gray-300 cursor-pointer w-5 h-5" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full"
              >
                1
              </motion.span>
            </div>
          )}

          {user ? (
            <div className="relative" ref={profileRef}>
              <div className="relative" ref={profileRef}>
 
  <div
    onClick={() => setProfileOpen(!profileOpen)}
    className="w-10 h-10 relative cursor-pointer"
  >
    {user?.image && user?.name?.charAt(0)?.toUpperCase()? (
      <Image
        src={user.image}
        alt="Profile"

        fill
        className="rounded-full border-2 border-green-500 object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg border-2 border-green-500">
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </div>
    )}
  </div>

 
  <AnimatePresence>
    {profileOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute right-0 mt-3 w-52 bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden z-50"
      >
        <div className="px-4 py-3 border-b border-gray-700">
          <p className="text-xs text-gray-400">Signed in as</p>
          <p className="text-sm font-medium text-white truncate">
            {user?.name}
          </p>
        </div>

        <Link
  href="/profile"
  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
  onClick={() => setProfileOpen(false)}
>
  Profile
</Link>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
        >
          Logout
        </button>
      </motion.div>
    )}
  </AnimatePresence>

  
</div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/*  Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 px-6 pb-6 shadow-lg border-t border-gray-800"
          >
            <div className="flex flex-col gap-4 mt-6 text-gray-300">
              <Link href="/" onClick={() => setIsOpen(false)} className={isActive("/") ? "text-green-500" : ""}>
                Home
              </Link>
              <Link href="/all-animals" onClick={() => setIsOpen(false)} className={isActive("/all-animals") ? "text-green-500" : ""}>
                All Animals
              </Link>

              <hr className="border-gray-800" />

              {user ? (
                <>
                  <Link href="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                  <button onClick={handleLogout} className="text-left text-red-400">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-2 border border-gray-600 rounded-lg">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)} className="text-center py-2 bg-green-500 text-white rounded-lg">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}



