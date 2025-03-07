"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CommentForm() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For this static example, simply log the comment
    console.log("Submitted comment:", comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="flex flex-col">
        <Label htmlFor="comment" className="mb-1">
          Add a comment
        </Label>
        <Input
          id="comment"
          type="text"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Button type="submit">Submit Comment</Button>
    </form>
  );
}
