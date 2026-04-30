"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

export default function QurbaniSectionsPro() {
  const [tips, setTips] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assignment-08-flame.vercel.app/qurbani.json")
      .then((res) => res.json())
      .then((data) => {
        setTips(data.tips || []);
        setBreeds(data.breeds || []);
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0f172a] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* 🐐 Qurbani Tips Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Qurbani Tips <span className="text-emerald-600">🐐</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              সঠিক পশু নির্বাচন এবং কুরবানির নিয়মাবলী সম্পর্কে জানুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {tip.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-emerald-400 mb-3">
                  {tip.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tip.desc}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-500 rounded-b-2xl group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🐄 Top Breeds Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Top Breeds <span className="text-emerald-600">🐄</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400">সেরা জাতের সুস্থ ও সবল পশুগুলো দেখে নিন</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {breeds.map((breed, i) => (
              <motion.div
                key={breed.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/animals?category=${breed.category}`}>
                  <div className="group relative h-72 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
                    <Image
                      src={breed.image}
                      alt={breed.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                      <h3 className="text-white font-bold text-xl mb-1 group-hover:text-emerald-400 transition-colors">
                        {breed.name}
                      </h3>
                      <div className="flex items-center justify-between">
                         <span className="bg-emerald-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                          {breed.badge}
                        </span>
                        <span className="text-yellow-400 text-sm font-bold flex items-center gap-1">
                          ⭐ {breed.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}