import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsForArticleId } from "../comments/commentsSlice";
import CommentList from '../../components/CommentList'
import CommentForm from '../../components/CommentForm'

const Comments = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.currentArticle.article);
  const commentsByArticleId = useSelector((state) => state.comments.byArticleId[article.id]);
  const { isLoadingComments } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(loadCommentsForArticleId(article.id));
  }, [dispatch, article.id]);

  if (isLoadingComments) return <div>Loading Comments</div>;

  return (
    <div className="comments-container">
      <CommentForm articleId={article.id}/>
      <CommentList comments={commentsByArticleId}/>
    </div>
  );
};

export default Comments;
