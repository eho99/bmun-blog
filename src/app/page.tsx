"use client";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const setNewView = async () => {
    const { data, error } = await createClient()
      .from("views")
      .insert({ name: "test" });

    if (data) {
      console.log(data);
    }
    if (error) {
      console.error(error);
    }
  };

  setNewView();

  return <div> hello</div>;
}
