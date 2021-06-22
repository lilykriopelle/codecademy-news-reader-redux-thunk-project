import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postCommentForArticleId,
  createCommentIsPending,
} from "../features/comments/commentsSlice";

export default function CommentForm({ articleId }) {
  const dispatch = useDispatch();
  const createPending = useSelector(createCommentIsPending);

  const handleSubmit = (comment) => {
    dispatch(
      postCommentForArticleId({ articleId: articleId, comment: comment })
    );
  };

  return (
    <CommentFormComponent
      handleSubmit={handleSubmit}
      createPending={createPending}
    />
  );
}

export const CommentFormComponent = ({ handleSubmit, createPending }) => {
  const [comment, setComment] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(comment);
        setComment("");
      }}
    >
      <label htmlFor="comment" className="label">
        Add Comment:
      </label>
      <div id="input-container">
        <input
          id="comment"
          value={comment}
          onChange={(e) => {
            setComment(e.currentTarget.value);
          }}
          type="text"
        />
        <button
          disabled={createPending || comment.length === 0}
          className="comment-button"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
