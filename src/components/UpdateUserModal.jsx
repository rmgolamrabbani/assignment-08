"use client";

import { Input } from "@heroui/react";
import { useState, useEffect } from "react";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">Update Profile</h3>

        <div className="flex flex-col gap-3">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            className="bg-gray-600 px-4 py-2 rounded"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="bg-green-500 px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;