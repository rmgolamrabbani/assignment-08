"use client";

import { Input } from "@heroui/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UpdateUserModal = ({ isOpen, onOpenChange, user, onUpdate }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!name) return;

    setLoading(true);
    try {
      await onUpdate({ name, image });
      onOpenChange(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-6 rounded-3xl bg-white/10 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-green-500/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>

            {/* Header */}
            <h3 className="text-xl font-bold text-white mb-5 relative z-10">
              ✏️ Update Profile
            </h3>

            {/* Form */}
            <div className="flex flex-col gap-4 relative z-10">
              <Input
                label="Name"
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-white"
              />

              <Input
                label="Image URL"
                variant="bordered"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="text-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6 relative z-10">
              <button
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-gray-600/70 hover:bg-gray-600 text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all shadow-lg shadow-green-500/20"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateUserModal;