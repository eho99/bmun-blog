"use client";

import BlogPost from "@/components/blog/BlogPost";
import CommentList from "@/components/blog/CommentList";
import CommentForm from "@/components/blog/CommentForm";

export default function BlogPostPage() {
  // Static example blog post data
  const post = {
    title: "A Journey to Minimalist Design",
    author: "Jane Doe",
    date: "July 21, 2025",
    image: "/blog/minimalist.jpg", // place an image at public/blog/minimalist.jpg
    content: `
      <p>Minimalist design is all about simplicity and functionality. In this post, we explore the core principles of minimalist design, its benefits, and how to incorporate clean elements into your work.</p>
      <p>By removing clutter, focusing on typography, and using a limited color palette, you can create a sleek interface that both looks modern and is highly functional.</p>
    `,
    comments: [
      {
        id: 1,
        author: "Alice",
        content: "I love the clean aesthetic!",
        date: "July 22, 2025",
      },
      {
        id: 2,
        author: "Bob",
        content: "Inspiring read. Less is truly more.",
        date: "July 23, 2025",
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <BlogPost post={post} />
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <CommentList comments={post.comments} />
        <CommentForm />
      </div>
    </div>
  );
}
