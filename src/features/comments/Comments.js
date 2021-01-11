import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCommentsForArticleId, selectComments, isLoadingComments } from '../comments/commentsSlice';
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList'
import CommentForm from '../../components/CommentForm'

const Comments = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);

  if (!article) return <div>No article selected.</div>;

  return (
    <div className='comments-container'>
      <CommentForm articleId={article.id}/>
      <CommentList comments={[]} />
    </div>
  );
};

export default Comments;
