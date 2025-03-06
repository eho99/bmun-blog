import React from "react";
import Image from "next/image";

interface Post {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <div className="mb-4 text-sm text-gray-500">
        By {post.author} on {post.date}
      </div>
      {post.image && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="rounded object-cover"
          />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
