"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"; // Heroicons exit icon

export default function UserPanel() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      {session ? (
        <div className="flex items-center gap-4">
          <p className="text-green-700 font-semibold">🌟 Hi {session.user?.name}! 🌟</p>
          <Button
            onClick={() => signOut()}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all transform hover:scale-105"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
            <span>Say Bye-bye here! 👋</span>
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => signIn("google")}
          className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all transform hover:scale-105"
        >
          🌈 Log in & Let’s Bloom ! 🌼
        </Button>
      )}
    </div>
  );
}
