import React from "react";
import { useDispatch } from "react-redux";
import { deleteCommentForArticleId } from "../features/comments/commentsSlice";

export default function Comment({ comment, articleId }) {
  const { id, text } = comment;
  const dispatch = useDispatch();

  return (
    <li key={id} className="comment-container">
      <span>{text}</span>
      <button
        className="button"
        onClick={() => {
          dispatch(deleteCommentForArticleId({ articleId, commentId: id }));
        }}
      >
        Delete
      </button>
    </li>
  );
}
