"use client";
import React from "react";
import Image from "next/image";


export default function AnimalCards({ animals }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {animals.map((animal) => (
        <div
          key={animal.id}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
        >
          {/* Image */}
          <div className="relative w-full h-52 overflow-hidden">
            <Image
              src={animal.image}
              alt={animal.name}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
              {animal.name}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {animal.breed} • {animal.location}
            </p>

            {/* Info */}
            <div className="flex justify-between text-sm mt-3 text-gray-600 dark:text-gray-300">
              <span>⚖ {animal.weight}kg</span>
              <span>🎂 {animal.age} yr</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-green-600 font-bold text-lg">
                ৳ {animal.price.toLocaleString()}
              </p>

              <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg transition">
                View
              </button>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
