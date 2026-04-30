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

  useEffect(() => {
    fetch("/data/qurbani.json")
      .then((res) => res.json())
      .then((data) => {
        setTips(data.tips);
        setBreeds(data.breeds);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

      {/* 🐐 Qurbani Tips */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">
          Qurbani Tips 🐐
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl"
            >
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="font-semibold text-lg">{tip.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{tip.desc}</p>
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


