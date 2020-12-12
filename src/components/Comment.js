import React from "react";

export default function Comment({ comment }) {
  const { id, text, upvotes, downvotes } = comment
  return (
    <div key={id} className="comment-container">
      <span>{text}</span>
    </div>
  );
}
