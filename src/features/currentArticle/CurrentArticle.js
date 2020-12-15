import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsForArticleId } from "../comments/commentsSlice";
import FullArticle from "../../components/FullArticle"
import CommentList from "../../components/CommentList"
import CommentForm from "../../components/CommentForm"

const CurrentArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.currentArticle.article);
  const commentsByArticleId = useSelector((state) => state.comments.byArticleId[article.id]);
  const { isLoadingCurrentArticle } = useSelector((state) => state.currentArticle);
  const { isLoadingComments } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(loadCommentsForArticleId(article.id));
  }, [dispatch, article.id]);

  if (isLoadingCurrentArticle) {
    return <div>loading state</div>;
  }
  else if (!article.id) {
    return (
      <div className="current-article-container">
        <h1>No article selected.</h1>
      </div>
    );
  }

  const loadingMessage = text => <div>Loading {text}</div>;

  return (
    <div className="current-article-container">
      <FullArticle article={article} />
      <section>
        <h2>Comments</h2>
        <ul>
          {isLoadingComments ? loadingMessage("Comments") : <CommentList comments={commentsByArticleId} />}
        </ul>
        <CommentForm articleId={article.id}/>
      </section>
    </div>
  );
};

export default CurrentArticle;
