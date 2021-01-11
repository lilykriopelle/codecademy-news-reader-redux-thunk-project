import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentIsPending } from '../features/comments/commentsSlice';

export default function CommentForm({articleId}) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const createPending = useSelector(createCommentIsPending);

  const handleSubmit = e => {
    e.preventDefault()
    // TO DO – dispatch asynchronous action to post new comment data here
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label for='comment'>New Comment</label>
      <input id='comment' value={comment} onChange={e => setComment(e.currentTarget.value)} type='text'/>
      <button disabled={createPending}>Publish</button>
    </form>
  );
}
