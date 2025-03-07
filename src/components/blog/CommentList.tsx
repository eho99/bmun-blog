import React from "react";

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments.length) {
    return <p className="text-gray-500">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 border rounded shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">{comment.author}</span>
            <span className="text-xs text-gray-400">{comment.date}</span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
