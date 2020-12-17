import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCommentsForArticleId, selectComments } from '../comments/commentsSlice';
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList'
import CommentForm from '../../components/CommentForm'

const Comments = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);
  const comments = useSelector(selectComments)
  const commentsForArticleId = comments[article.id];
  const { isLoadingComments } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(loadCommentsForArticleId(article.id));
  }, [dispatch, article.id]);

  if (isLoadingComments) return <div>Loading Comments</div>;

  return (
    <div className='comments-container'>
      <CommentForm articleId={article.id}/>
      <CommentList comments={commentsForArticleId}/>
    </div>
  );
};

export default Comments;
