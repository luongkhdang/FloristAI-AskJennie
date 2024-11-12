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
          <p className="text-gray-700 font-medium">Hi {session.user?.name}!</p>
          <Button
            onClick={() => signOut()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md flex items-center gap-2"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => signIn("google")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md"
        >
          Log in
        </Button>
      )}
    </div>
  );
}
