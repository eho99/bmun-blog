"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 p-8 bg-white border rounded shadow"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div className="space-y-1">
          <Label htmlFor="email" className="block text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your-email@example.com"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="block text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>

        <Button
          variant="secondary"
          type="button"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign In with Google
        </Button>
      </form>
    </div>
  );
}
