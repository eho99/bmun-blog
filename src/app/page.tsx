"use client";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Blog MVP Test Page
      </h1>
      <p className="text-xl mb-8">
        This page is a simple test to validate functionality, routing, and
        component integration.
      </p>
      <Button onClick={() => alert("Button works!")}>Test ShadCN Button</Button>
    </main>
  );
}
