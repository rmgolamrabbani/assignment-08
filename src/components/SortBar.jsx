"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SortBar = ({ currentSort }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname(); // 🔥

  const handleSort = (type) => {
    const newParams = new URLSearchParams(params.toString());

    if (type) {
      newParams.set("sort", type);
    } else {
      newParams.delete("sort");
    }

    router.push(`${pathname}?${newParams.toString()}`); // 🔥 fix
  };

  return (
    <div className="flex gap-2 bg-slate-800 p-2 rounded-xl">
      <button
        onClick={() => handleSort("low")}
        className={`px-2 py-1  rounded ${
          currentSort === "low"
            ? "bg-emerald-600"
            : "bg-gray-700"
        }`}
      >
        Low → High
      </button>

      <button
        onClick={() => handleSort("high")}
        className={`px-2 py-1 rounded ${
          currentSort === "high"
            ? "bg-emerald-600"
            : "bg-gray-700"
        }`}
      >
        High → Low
      </button>
    </div>
  );
};

export default SortBar;