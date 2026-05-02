"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";
import { useState } from "react";
import { UpdateUserModal } from "@/components/UpdateUserModal";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  if (!user) {
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  }

  return (
    <div className="mt-20 md-20 max-w-md mx-auto bg-gray-800 p-6 rounded-xl text-center">

      <Card className="p-6 flex flex-col items-center gap-4">
        <Avatar className="h-20 w-20">
          <Avatar.Image src={user?.image || ""} />
          <Avatar.Fallback>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </Avatar.Fallback>
        </Avatar>

        <h2 className="text-white font-bold">{user?.name}</h2>
        <p className="text-gray-400">{user?.email}</p>

        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Update Profile
        </button>
      </Card>

     
      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onOpenChange={() => setIsUpdateModalOpen(false)}
        user={user}
        onUpdate={async (data) => {
          await authClient.updateUser({
            data,
          });
        }}
      />
    </div>
  );
};

export default ProfilePage;