"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-2xl font-bold">
            Berkeley Model United Nations Blog
          </div>
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

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Intro Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">
                Berkeley Model United Nations
              </CardTitle>
              <CardDescription>
                Interactive vintage-style threat level indicators for crisis
                simulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Welcome to BMUN's Blog, a closer peek into the operations that
                make BMUN and its committees deliver each and every year! We
                hope you enjoy reading through the numerous blog posts written
                by our lovely secretariat over the years, talking about their
                committees, perspectives on MUN, education, and more!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 6 recent blog posts go here */}
        </div>
      </main>
    </div>
  );
}
