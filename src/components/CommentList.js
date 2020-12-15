import React from 'react'
import Comment from './Comment'

export default function CommentList({ comments }) {
  if (comments) {
    return (
      <ul>
        {comments.map(comment => <Comment comment={comment} />)}
      </ul>
    )
  }
  return null;
}
