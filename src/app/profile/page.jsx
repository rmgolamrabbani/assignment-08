"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";
import { useState } from "react";
import UpdateUserModal from "@/components/UpdateUserModal";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="relative overflow-hidden p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">

            {/* Glow Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-4 relative z-10">
              <Avatar className="h-24 w-24 ring-4 ring-green-500/30 shadow-lg">
                <Avatar.Image src={user?.image || ""} />
                <Avatar.Fallback className="text-xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </Avatar.Fallback>
              </Avatar>

              {/* Name */}
              <h2 className="text-white text-xl font-bold tracking-wide">
                {user?.name}
              </h2>

              {/* Email */}
              <p className="text-gray-300 text-sm">
                {user?.email}
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-white/10"></div>

            {/* Action Button */}
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-green-500/20"
            >
              ✏️ Update Profile
            </button>
          </Card>
        </motion.div>
      </div>

      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        user={user}
        onUpdate={async (updatedUser) => {
          await authClient.updateUser(updatedUser);
        }}
      />
    </>
  );
};

export default ProfilePage;