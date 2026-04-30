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

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading Qurbani Data...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
 
     {/* 🐐 Qurbani Tips */}
      <section>
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
    Qurbani Tips 🐐
  </h2>

  <div className="grid md:grid-cols-3 gap-8">
    {tips.map((tip, i) => (
      <motion.div
        key={tip.id}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.15 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="relative p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition"
      >
        {/* Icon */}
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-2xl mb-4">
          {tip.icon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {tip.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          {tip.desc}
        </p>

        {/* Decorative Glow */}
        <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 hover:opacity-100 transition"></div>
      </motion.div>
    ))}
  </div>
</section>

      {/* 🐄 Top Breeds */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">
          Top Breeds 🐄
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {breeds.map((breed, i) => (
            <motion.div
              key={breed.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link href={`/animals?category=${breed.category}`}>
                <div className="relative h-56 rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">

                  <Image
                    src={breed.image}
                    alt={breed.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* Badge */}
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {breed.badge}
                  </span>

                  {/* Rating */}
                  <span className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded">
                    ⭐ {breed.rating}
                  </span>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                    <h3 className="text-white font-semibold text-lg">
                      {breed.name}
                    </h3>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

