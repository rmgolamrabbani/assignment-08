import React from "react";
import AnimalCards from "./AnimalCards";

const FeaturedAnimals = async () => {
  const res = await fetch(
    "https://assignment-08-flame.vercel.app/data.json",
    { cache: "no-store" } // always fresh data
  );

  const animals = await res.json();
  const topAnimals = animals.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Featured Animals
        </h2>
        <p className="text-gray-500 mt-2">
          Choose your perfect Qurbani animal
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimalCards animals={topAnimals} />
      </div>
    </section>
  );
};

export default FeaturedAnimals;

