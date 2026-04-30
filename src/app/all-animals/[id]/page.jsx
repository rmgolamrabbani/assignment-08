"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API থেকে ডাটা ফেচ করা
    fetch("https://assignment-08-flame.vercel.app/data.json")
      .then((res) => res.json())
      .then((data) => {
        // ID অনুযায়ী সঠিক এনিমেলটি খুঁজে বের করা
        const foundAnimal = data.find((a) => a.id === parseInt(id));
        setAnimal(foundAnimal);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Animal not found!</h2>
        <Link href="/" className="text-green-500 underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Left: Image Section */}
          <div className="relative w-full md:w-1/2 h-96 md:h-auto bg-gray-200">
            <Image
              src={animal.image}
              alt={animal.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right: Content Section */}
          <div className="p-8 md:w-1/2 flex flex-col">
            <Link href="/" className="text-green-500 text-sm font-semibold mb-4 inline-block hover:text-green-600 transition">
              ← Back to Shop
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {animal.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">
              {animal.category} • {animal.type}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-green-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Weight</p>
                <p className="font-bold text-lg text-gray-800 dark:text-white">{animal.weight} kg</p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-blue-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Age</p>
                <p className="font-bold text-lg text-gray-800 dark:text-white">{animal.age} Years</p>
              </div>
              <div className="bg-orange-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-orange-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Breed</p>
                <p className="font-bold text-lg text-gray-800 dark:text-white">{animal.breed}</p>
              </div>
              <div className="bg-purple-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-purple-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Location</p>
                <p className="font-bold text-lg text-gray-800 dark:text-white">{animal.location}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2 text-lg">Detailed Description</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {animal.description || "No detailed description available for this animal."}
              </p>
            </div>

            {/* Price & Action */}
            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Asking Price</p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">
                  ৳ {animal.price?.toLocaleString()}
                </p>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg shadow-green-200 dark:shadow-none">
                Contact Seller
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}