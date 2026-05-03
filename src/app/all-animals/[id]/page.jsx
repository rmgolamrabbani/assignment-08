"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal + Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    fetch("https://assignment-08-flame.vercel.app/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundAnimal = data.find((a) => a.id === parseInt(id));
        setAnimal(foundAnimal);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone) {
      return toast.error("Please fill all required fields ⚠️");
    }

    setSubmitting(true);

    // Fake API delay
    setTimeout(() => {
      toast.success("Message Sent Successfully ✅");

      setFormData({ name: "", phone: "", message: "" });
      setSubmitting(false);
      setIsModalOpen(false);
    }, 1200);
  };

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
        <Link href="/" className="text-green-500 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Image */}
            <div className="relative w-full md:w-1/2 h-96 md:h-auto">
              <Image
                src={animal.image}
                alt={animal.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 md:w-1/2 flex flex-col">
              <Link href="/" className="text-green-500 mb-4">
                ← Back
              </Link>

              <h1 className="text-3xl font-bold mb-2">{animal.name}</h1>

              <p className="text-gray-500 mb-6">
                {animal.category} • {animal.type}
              </p>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  {animal.weight} kg
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  {animal.age} Years
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  {animal.breed}
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  {animal.location}
                </div>
              </div>

              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {animal.description}
              </p>

              {/* Price */}
              <div className="mt-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-green-600">
                  ৳ {animal.price?.toLocaleString()}
                </h2>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl w-full max-w-md shadow-xl border border-white/20"
            >
              <h2 className="text-xl font-bold mb-4">Contact Seller</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border dark:bg-gray-700"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border dark:bg-gray-700"
                />

                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border dark:bg-gray-700"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
                  >
                    {submitting && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}