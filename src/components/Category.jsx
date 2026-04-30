"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const categories = ["Cow", "Goat", "Sheep"];

const Category = ({ currentCategory }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname(); // 🔥 important

  const handleCategory = (cat) => {
    const newParams = new URLSearchParams(params.toString());

    if (cat) {
      newParams.set("category", cat);
    } else {
      newParams.delete("category");
    }

    router.push(`${pathname}?${newParams.toString()}`); // 🔥 fix
  };

  return (
    <div className="flex gap-3 mt-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategory(cat)}
          className={`px-4 py-2 rounded ${
            currentCategory === cat
              ? "bg-emerald-600"
              : "bg-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Category;