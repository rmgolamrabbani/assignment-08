"use client";
import React from "react";
import { FaCheckCircle, FaTruck, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    // mt-0 রাখা হয়েছে কারণ নেভবার ট্রান্সপারেন্ট থাকবে। 
    // h-screen ব্যবহার করলে পুরো স্ক্রিন জুড়ে থাকবে।
    <section className="relative w-full h-screen flex items-center overflow-hidden bg-gray-900">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero.png" 
          alt="Qurbani Animals"
          fill
          priority
          className="object-cover object-[75%] md:object-center" // মোবাইলে গরুর মুখ দেখানোর জন্য object-right/75%
        />
      </div>

      {/* Overlay: বাম দিকে ডার্কনেস বাড়ানো হয়েছে যাতে টেক্সট ক্লিয়ার হয় */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white pt-2 mt-2 mb-8">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight shadow-sm">
            Find Your Perfect <br />
            <span className="text-green-500">Qurbani</span> Animal
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed drop-shadow-md">
            Explore healthy cows and goats from trusted sellers. 
            Verified health records and hassle-free booking for a peaceful sacrifice.
          </p>

          <div className="mt-8 flex flex-row flex-wrap gap-4">
            <button className="bg-green-500 hover:bg-green-600 transition-all active:scale-95 px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-green-900/40">
              🐄 Browse Animals
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition">
              ▶ How It Works
            </button>
          </div>
        </motion.div>

        {/* Feature Cards: Glassmorphism effect */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl bg-black/30 backdrop-blur-md p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
               <FaCheckCircle className="text-green-400 text-2xl" />
            </div>
            <div>
              <h4 className="font-bold">Trusted Sellers</h4>
              <p className="text-xs text-gray-300">Verified & Reliable</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 md:pl-8">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
               <FaTruck className="text-green-400 text-2xl" />
            </div>
            <div>
              <h4 className="font-bold">Safe Delivery</h4>
              <p className="text-xs text-gray-300">On Time Every Time</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 md:pl-8">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
               <FaHeart className="text-green-400 text-2xl" />
            </div>
            <div>
              <h4 className="font-bold">Easy Pricing</h4>
              <p className="text-xs text-gray-300">No Hidden Charges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
