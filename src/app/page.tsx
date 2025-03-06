"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-2xl font-bold">My Blog</div>
          <div className="flex items-center space-x-3">
            {session ? (
              <div className="flex items-center space-x-2">
                <Avatar>
                  {session.user?.image ? (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name || "User"}
                    />
                  ) : (
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="font-medium">{session.user?.name}</span>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <span className="font-medium">Guest</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signIn("google")}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4">
        <h1 className="mb-4 text-3xl font-bold">Welcome to the Blog</h1>
        <p>
          This is a simple blog home page using NextAuth for authentication and
          shadcn/ui for a unified design.
        </p>
      </main>
    </div>
  );
}
