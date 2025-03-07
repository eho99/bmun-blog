"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VintageDial } from "@/components/custom/VintageDial";
import { IconCopier } from "@/components/custom/IconCopier";

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
                These interactive gauges are designed with vintage 1920-30s
                aesthetics to enhance the immersive experience of historical
                crisis committees. Adjust the threat levels and customize the
                icons to represent different aspects of your committee
                simulation.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dial Card */}
            <Card>
              <CardHeader>
                <CardTitle>Corruption Index</CardTitle>
                <CardDescription>
                  Track institutional corruption and government malfeasance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VintageDial
                  initialValue={3}
                  initialTitle="Corruption Level"
                  className="max-w-md mx-auto"
                />
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                Monitor how bribes, scandals, and systemic corruption affect
                your committee
              </CardFooter>
            </Card>
            {/* Example of another dial with different settings */}
            <Card>
              <CardHeader>
                <CardTitle>Economic Instability</CardTitle>
                <CardDescription>
                  Track economic conditions during your simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VintageDial
                  initialValue={2}
                  initialTitle="Economic Risk"
                  className="max-w-md mx-auto"
                />
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                Adjust economic risk levels to reflect committee decisions
              </CardFooter>
            </Card>
            {/* Four more placeholder cards to fill out the grid */}
            <Card>
              <CardHeader>
                <CardTitle>Political Tension</CardTitle>
                <CardDescription>
                  Monitor political stability in your committee
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VintageDial
                  initialValue={3}
                  initialTitle="Political Risk"
                  className="max-w-md mx-auto"
                />
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                Track changing political conditions
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treasury</CardTitle>
                <CardDescription>
                  Track available monetary resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IconCopier
                  initialCount={5}
                  maxCount={20}
                  title="Money"
                  iconSrc="/icons/gold_ingot_icon.png"
                  iconAlt="Gold bar icon"
                  iconSize={40}
                />
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                Adjust treasury reserves and available funds
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
