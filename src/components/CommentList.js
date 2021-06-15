import React from 'react';
import Comment from './Comment';

export default function CommentList({ comments, articleId }) {
  if (comments) {
    return (
      <ul className='comments-list'>
        {comments.map((comment) => (
          <Comment comment={comment} articleId={articleId} />
        ))}
      </ul>
    );
  }
  return null;
}
