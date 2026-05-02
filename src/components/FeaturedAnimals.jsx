import React from "react";
import Link from "next/link";
import AnimalCards from "./AnimalCards";

const FeaturedAnimals = async () => {
  const res = await fetch(
    "https://assignment-08-flame.vercel.app/data.json",
    { cache: "no-store" } // always fresh data
  );

  const animals = await res.json();
  const topAnimals = animals.slice(0, 4);

  return (
    
    <section className="bg-white dark:bg-[#0f172a] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Featured <span className="text-emerald-600">Animals</span> 🐄
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
            কুরবানির জন্য সেরা এবং বাছাইকৃত সুস্থ-সবল পশুগুলো থেকে আপনার পছন্দেরটি বেছে নিন।
          </p>
          
          {/* Decorative Underline */}
          <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full opacity-80"></div>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
          <AnimalCards animals={topAnimals} />
        </div>

        {/* View All Button (Optional) */}
        <div className="mt-12 text-center">

          <Link href="/all-animals">
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95">
              সবগুলো পশু দেখুন
            </button>
          </Link>
            
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnimals;