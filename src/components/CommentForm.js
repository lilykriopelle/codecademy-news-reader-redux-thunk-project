import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCommentForArticleId } from '../features/comments/commentsSlice';

export default function CommentForm({articleId}) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const { createCommentIsPending } = useSelector((state) => state.comments);

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(postCommentForArticleId({articleId: articleId, comment: comment}))
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label for='comment'>New Comment</label>
      <input id='comment' value={comment} onChange={e => setComment(e.currentTarget.value)} type='text'/>
      <button disabled={createCommentIsPending}>Publish</button>
    </form>
  );
}
